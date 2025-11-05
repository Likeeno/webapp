import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getUserPayments } from '@/lib/payments';

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'غیر مجاز - لطفاً وارد شوید' },
        { status: 401 }
      );
    }

    const payments = await getUserPayments(session.user.id);

    return NextResponse.json({
      success: true,
      payments,
    });

  } catch (error) {
    console.error('Get payments error:', error);
    return NextResponse.json(
      { error: 'خطا در دریافت پرداخت‌ها' },
      { status: 500 }
    );
  }
}

