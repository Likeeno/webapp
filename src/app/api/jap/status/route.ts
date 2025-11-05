import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { japService } from '@/lib/jap';

/**
 * POST - Check status of one or multiple orders
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

    // Fetch statuses from JAP
    const japStatuses = await japService.getMultipleOrderStatus(japOrderIds);

    // Update orders in database
    const updatedOrders = [];
    for (const order of orders) {
      if (order.jap_order_id && japStatuses[order.jap_order_id]) {
        const japStatus = japStatuses[order.jap_order_id];
        const mappedStatus = japService.mapJAPStatus(japStatus.status);

        // Update order in database
        const { data: updatedOrder } = await supabase
          .from('orders')
          .update({
            status: mappedStatus,
            start_count: parseInt(japStatus.start_count) || null,
            remains: parseInt(japStatus.remains) || null,
          })
          .eq('id', order.id)
          .select()
          .single();

        updatedOrders.push({
          ...updatedOrder,
          jap_status: japStatus,
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: updatedOrders,
    });

  } catch (error) {
    console.error('JAP status error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch order status',
      },
      { status: 500 }
    );
  }
}


