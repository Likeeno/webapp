import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { japService } from '@/lib/jap';

/**
 * POST - Check status of one or multiple orders
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
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
    const orders = await prisma.order.findMany({
      where: {
        id: { in: orderIds },
        issuerId: session.user.id,
      },
    });

    if (!orders || orders.length === 0) {
      return NextResponse.json(
        { error: 'خطا در دریافت اطلاعات سفارش' },
        { status: 500 }
      );
    }

    // Get JAP order IDs
    const japOrderIds = orders
      .filter(o => o.japOrderId)
      .map(o => o.japOrderId!);

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
      if (order.japOrderId && japStatuses[order.japOrderId]) {
        const japStatus = japStatuses[order.japOrderId];
        const mappedStatus = japService.mapJAPStatus(japStatus.status);

        // Update order in database
        const updatedOrder = await prisma.order.update({
          where: { id: order.id },
          data: {
            status: mappedStatus,
            startCount: parseInt(japStatus.start_count) || null,
            remains: parseInt(japStatus.remains) || null,
          },
        });

        updatedOrders.push({
          id: updatedOrder.id,
          status: updatedOrder.status,
          issuer_id: updatedOrder.issuerId,
          price: updatedOrder.price,
          service: updatedOrder.service,
          jap_order_id: updatedOrder.japOrderId,
          link: updatedOrder.link,
          quantity: updatedOrder.quantity,
          start_count: updatedOrder.startCount,
          remains: updatedOrder.remains,
          jap_service_id: updatedOrder.japServiceId,
          extra_data: updatedOrder.extraData ? JSON.parse(updatedOrder.extraData) : null,
          created_at: updatedOrder.createdAt.toISOString(),
          updated_at: updatedOrder.updatedAt.toISOString(),
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
