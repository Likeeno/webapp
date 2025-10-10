import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { telegramService } from '@/lib/telegram';
import { japService, AddOrderParams } from '@/lib/jap';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'غیر مجاز - لطفاً وارد شوید' },
        { status: 401 }
      );
    }

    // Get request body
    const body = await request.json();
    const { 
      japServiceId,
      link,
      quantity,
      price,
      serviceName,
      // Optional JAP parameters
      runs,
      interval,
      keywords,
      comments,
      usernames,
      hashtags,
      username,
      media,
      answer_number,
      groups,
      country,
      device,
      type_of_traffic,
      google_keyword,
      referring_url,
      hashtag,
      min,
      max,
      posts,
      old_posts,
      delay,
      expiry
    } = body;

    if (!japServiceId || !link || !price || price <= 0) {
      return NextResponse.json(
        { error: 'اطلاعات سفارش نامعتبر است' },
        { status: 400 }
      );
    }

    // Check user balance
    const { data: userProfile, error: userError } = await supabase
      .from('users')
      .select('balance, name')
      .eq('id', user.id)
      .single();

    if (userError) {
      return NextResponse.json(
        { error: 'خطا در دریافت اطلاعات کاربر' },
        { status: 500 }
      );
    }

    if (userProfile.balance < price) {
      return NextResponse.json(
        { error: 'موجودی کافی نیست. لطفاً کیف پول خود را شارژ کنید' },
        { status: 400 }
      );
    }

    // Create order in JAP first
    const japOrderParams: Record<string, string | number | boolean> = {
      service: japServiceId,
      link,
    };

    // Add quantity if provided (not required for packages)
    if (quantity) japOrderParams.quantity = quantity;

    // Add optional parameters
    if (runs) japOrderParams.runs = runs;
    if (interval) japOrderParams.interval = interval;
    if (keywords) japOrderParams.keywords = keywords;
    if (comments) japOrderParams.comments = comments;
    if (usernames) japOrderParams.usernames = usernames;
    if (hashtags) japOrderParams.hashtags = hashtags;
    if (username) japOrderParams.username = username;
    if (media) japOrderParams.media = media;
    if (answer_number) japOrderParams.answer_number = answer_number;
    if (groups) japOrderParams.groups = groups;
    if (country) japOrderParams.country = country;
    if (device) japOrderParams.device = device;
    if (type_of_traffic) japOrderParams.type_of_traffic = type_of_traffic;
    if (google_keyword) japOrderParams.google_keyword = google_keyword;
    if (referring_url) japOrderParams.referring_url = referring_url;
    if (hashtag) japOrderParams.hashtag = hashtag;
    if (min) japOrderParams.min = min;
    if (max) japOrderParams.max = max;
    if (posts) japOrderParams.posts = posts;
    if (old_posts) japOrderParams.old_posts = old_posts;
    if (delay) japOrderParams.delay = delay;
    if (expiry) japOrderParams.expiry = expiry;

    let japOrderResponse;
    try {
      japOrderResponse = await japService.addOrder(japOrderParams as unknown as AddOrderParams);
    } catch (japError) {
      return NextResponse.json(
        { error: 'خطا در ثبت سفارش در سیستم JAP: ' + (japError instanceof Error ? japError.message : 'خطای ناشناخته') },
        { status: 500 }
      );
    }

    // Store extra parameters
    const extraData = {
      runs, interval, keywords, comments, usernames, hashtags,
      username, media, answer_number, groups, country, device,
      type_of_traffic, google_keyword, referring_url, hashtag,
      min, max, posts, old_posts, delay, expiry
    };

    // Create order in our database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        issuer_id: user.id,
        service: serviceName || `JAP Service ${japServiceId}`,
        price,
        jap_order_id: japOrderResponse.order,
        link,
        quantity: quantity || null,
        jap_service_id: japServiceId,
        extra_data: extraData,
        status: 'pending'
      })
      .select()
      .single();

    if (orderError) {
      return NextResponse.json(
        { error: 'خطا در ثبت سفارش در دیتابیس' },
        { status: 500 }
      );
    }

    // Deduct amount from balance
    const newBalance = userProfile.balance - price;
    const { error: balanceError } = await supabase
      .from('users')
      .update({ balance: newBalance })
      .eq('id', user.id);

    if (balanceError) {
      // Rollback - delete the order
      await supabase.from('orders').delete().eq('id', order.id);
      
      return NextResponse.json(
        { error: 'خطا در به‌روزرسانی موجودی' },
        { status: 500 }
      );
    }

    // Send Telegram notification (non-blocking)
    telegramService.notifyNewOrder({
      userName: userProfile.name || user.email?.split('@')[0] || 'کاربر',
      userEmail: user.email || '',
      service: serviceName || `JAP Service ${japServiceId}`,
      price,
      orderId: order.id,
    }).catch(err => console.error('Telegram notification error:', err));

    return NextResponse.json({
      success: true,
      message: 'سفارش با موفقیت ثبت شد',
      data: {
        order,
        japOrderId: japOrderResponse.order,
        newBalance,
      },
    });

  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: 'خطا در پردازش سفارش' },
      { status: 500 }
    );
  }
}

