import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { japService } from '@/lib/jap';

/**
 * POST - Create refill for order(s)
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

    // Create refills in JAP
    const refillResponse = japOrderIds.length === 1
      ? await japService.createRefill(japOrderIds[0])
      : await japService.createMultipleRefills(japOrderIds);

    return NextResponse.json({
      success: true,
      message: 'درخواست بازپرسازی با موفقیت ثبت شد',
      data: refillResponse,
    });

  } catch (error) {
    console.error('JAP refill error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create refill',
      },
      { status: 500 }
    );
  }
}

