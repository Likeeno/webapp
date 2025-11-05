import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { japService } from '@/lib/jap';

/**
 * POST - Cancel order(s)
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

    // Cancel orders in JAP
    const cancelResponse = await japService.cancelOrders(japOrderIds);

    // Update orders in database
    await prisma.order.updateMany({
      where: {
        id: { in: orderIds },
        issuerId: session.user.id,
      },
      data: { status: 'cancelled' },
    });

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
