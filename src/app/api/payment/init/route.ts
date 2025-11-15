import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { sizpayService } from '@/lib/sizpay';
import { tomanToRial } from '@/lib/currency';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'غیر مجاز - لطفاً وارد شوید' }, { status: 401 });
    }

    // Get request body
    const body = await request.json();
    const { amount } = body; // Amount in Toman

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'مبلغ نامعتبر است' }, { status: 400 });
    }

    // Convert Toman to Rials for payment gateway (1 Toman = 10 Rials)
    const amountInRials = tomanToRial(Number(amount));

    // Generate unique order ID
    const orderId = `WLT-${Date.now()}-${session.user.id.slice(0, 8)}`;
    const invoiceNo = orderId;

    // Get user profile for payment details
    const userProfile = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { name: true, email: true },
    });

    // Get client IP
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const clientIp = forwardedFor?.split(',')[0] || realIp || 'unknown';

    // Create payment record in database (BEFORE calling gateway)
    const paymentRecord = await prisma.payment.create({
      data: {
        userId: session.user.id,
        orderId: orderId,
        invoiceNo: invoiceNo,
        amountToman: Number(amount),
        amountRial: amountInRials,
        status: 'pending',
        ipAddress: clientIp,
      },
    });

    // Create payment token (amount in Rials)
    const tokenResponse = await sizpayService.getToken({
      amount: amountInRials,
      orderId,
      invoiceNo,
      payerName: userProfile?.name || session.user.email?.split('@')[0] || 'کاربر',
      payerEmail: userProfile?.email || session.user.email || '',
      description: `شارژ کیف پول - ${amount.toLocaleString()} تومان`,
      payerIp: clientIp,
    });

    // Check if token was generated successfully
    if (!sizpayService.isSuccessResponse(tokenResponse.ResCod)) {
      // Update payment status to failed
      await prisma.payment.update({
        where: { id: paymentRecord.id },
        data: {
          status: 'failed',
          gatewayResponse: JSON.stringify(tokenResponse),
        },
      });

      return NextResponse.json(
        {
          error: 'خطا در ایجاد درخواست پرداخت',
          message: tokenResponse.Message,
          code: tokenResponse.ResCod,
        },
        { status: 400 }
      );
    }

    if (!tokenResponse.Token) {
      // Update payment status to failed
      await prisma.payment.update({
        where: { id: paymentRecord.id },
        data: { status: 'failed' },
      });

      return NextResponse.json({ error: 'توکن پرداخت دریافت نشد' }, { status: 500 });
    }

    // Update payment record with token and set to processing
    await prisma.payment.update({
      where: { id: paymentRecord.id },
      data: {
        token: tokenResponse.Token,
        status: 'processing',
        gatewayResponse: JSON.stringify(tokenResponse),
      },
    });

    // Generate payment URL
    const paymentUrl = sizpayService.getPaymentUrl(tokenResponse.Token);

    return NextResponse.json({
      success: true,
      paymentUrl,
      token: tokenResponse.Token,
      orderId,
      amount, // Amount in Toman (for frontend display)
      amountInRials, // Amount in Rials (for verification)
    });
  } catch (error) {
    console.error('Payment init error:', error);
    const errorMessage = error instanceof Error ? error.message : 'خطا در پردازش درخواست پرداخت';
    return NextResponse.json(
      {
        error: errorMessage,
        details: error instanceof Error ? error.stack : String(error),
      },
      { status: 500 }
    );
  }
}
