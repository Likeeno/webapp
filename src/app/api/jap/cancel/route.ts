import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { japService } from '@/lib/jap';

/**
 * POST - Cancel order(s)
 */
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

    const body = await request.json();
    const { orderIds } = body; // Array of our database order IDs

    if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
      return NextResponse.json(
        { error: 'شناسه سفارش نامعتبر است' },
        { status: 400 }
      );
    }

    // Get orders from database
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .in('id', orderIds)
      .eq('issuer_id', user.id);

    if (ordersError || !orders) {
      return NextResponse.json(
        { error: 'خطا در دریافت اطلاعات سفارش' },
        { status: 500 }
      );
    }

    // Get JAP order IDs
    const japOrderIds = orders
      .filter(o => o.jap_order_id)
      .map(o => o.jap_order_id!);

    if (japOrderIds.length === 0) {
      return NextResponse.json(
        { error: 'هیچ سفارش JAP یافت نشد' },
        { status: 404 }
      );
    }

    // Cancel orders in JAP
    const cancelResponse = await japService.cancelOrders(japOrderIds);

    // Update orders in database
    const { error: updateError } = await supabase
      .from('orders')
      .update({ status: 'cancelled' })
      .in('id', orderIds);

    if (updateError) {
      return NextResponse.json(
        { error: 'خطا در به‌روزرسانی وضعیت سفارش' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'سفارش(ها) با موفقیت لغو شد',
      data: cancelResponse,
    });

  } catch (error) {
    console.error('JAP cancel error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to cancel orders',
      },
      { status: 500 }
    );
  }
}

