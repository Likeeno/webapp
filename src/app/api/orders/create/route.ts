import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { japService, AddOrderParams } from '@/lib/jap';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'غیر مجاز - لطفاً وارد شوید' }, { status: 401 });
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
      expiry,
    } = body;

    if (!japServiceId || !link || !price || price <= 0) {
      return NextResponse.json({ error: 'اطلاعات سفارش نامعتبر است' }, { status: 400 });
    }

    // Check user balance
    const userProfile = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { balance: true, name: true },
    });

    if (!userProfile) {
      return NextResponse.json({ error: 'خطا در دریافت اطلاعات کاربر' }, { status: 500 });
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
        {
          error:
            'خطا در ثبت سفارش در سیستم JAP: ' +
            (japError instanceof Error ? japError.message : 'خطای ناشناخته'),
        },
        { status: 500 }
      );
    }

    // Store extra parameters
    const extraData = {
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
      expiry,
    };

    // Create order in our database
    const order = await prisma.order.create({
      data: {
        issuerId: session.user.id,
        service: serviceName || `JAP Service ${japServiceId}`,
        price,
        japOrderId: japOrderResponse.order,
        link,
        quantity: quantity || null,
        japServiceId: japServiceId,
        extraData: JSON.stringify(extraData), // SQLite stores JSON as text
        status: 'pending',
      },
    });

    // Deduct amount from balance
    const newBalance = userProfile.balance - price;
    await prisma.user.update({
      where: { id: session.user.id },
      data: { balance: newBalance },
    });

    return NextResponse.json({
      success: true,
      message: 'سفارش با موفقیت ثبت شد',
      data: {
        order: {
          id: order.id,
          status: order.status,
          issuer_id: order.issuerId,
          price: order.price,
          service: order.service,
          jap_order_id: order.japOrderId,
          link: order.link,
          quantity: order.quantity,
          jap_service_id: order.japServiceId,
          extra_data: order.extraData
            ? (JSON.parse(order.extraData as string) as Record<string, unknown>)
            : null,
          created_at: order.createdAt.toISOString(),
          updated_at: order.updatedAt.toISOString(),
        },
        japOrderId: japOrderResponse.order,
        newBalance,
      },
    });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: 'خطا در پردازش سفارش' }, { status: 500 });
  }
}
