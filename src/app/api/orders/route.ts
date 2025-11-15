import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getOrders } from '@/lib/orders';

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'غیر مجاز - لطفاً وارد شوید' }, { status: 401 });
    }

    const orders = await getOrders(session.user.id);

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json({ error: 'خطا در دریافت سفارشات' }, { status: 500 });
  }
}
