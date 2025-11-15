import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { sizpayService } from '@/lib/sizpay';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'غیر مجاز - لطفاً وارد شوید' }, { status: 401 });
    }

    // Get payment callback data
    const body = await request.json();
    const { Token, ResCod, Message, MerchantID, TerminalID, OrderID } = body;

    // Check if payment was successful
    if (!sizpayService.isSuccessResponse(ResCod)) {
      // Update payment status to failed
      await prisma.payment.updateMany({
        where: { token: Token },
        data: {
          status: 'failed',
          gatewayResponse: JSON.stringify(body),
        },
      });

      return NextResponse.json(
        {
          success: false,
          error: 'پرداخت ناموفق بود',
          message: Message,
          resCod: ResCod,
        },
        { status: 400 }
      );
    }

    // Get payment record from database
    const paymentRecord = await prisma.payment.findUnique({
      where: { token: Token || '' },
    });

    if (!paymentRecord) {
      return NextResponse.json(
        {
          success: false,
          error: 'اطلاعات پرداخت یافت نشد',
        },
        { status: 404 }
      );
    }

    // PREVENT DOUBLE SPENDING: Check if payment already completed
    if (paymentRecord.status === 'completed') {
      return NextResponse.json(
        {
          success: false,
          error: 'این پرداخت قبلاً تایید شده است',
          alreadyProcessed: true,
        },
        { status: 400 }
      );
    }

    // Verify user owns this payment
    if (paymentRecord.userId !== session.user.id) {
      return NextResponse.json(
        {
          success: false,
          error: 'عدم دسترسی به این پرداخت',
        },
        { status: 403 }
      );
    }

    // Update payment status to verifying
    await prisma.payment.update({
      where: { id: paymentRecord.id },
      data: {
        status: 'verifying',
        merchantId: MerchantID,
        terminalId: TerminalID,
      },
    });

    // Confirm transaction with payment gateway
    const confirmResponse = await sizpayService.confirm(Token);

    if (!sizpayService.isSuccessResponse(confirmResponse.ResCod)) {
      // Update payment status to failed
      await prisma.payment.update({
        where: { id: paymentRecord.id },
        data: {
          status: 'failed',
          gatewayResponse: JSON.stringify(confirmResponse),
        },
      });

      return NextResponse.json(
        {
          success: false,
          error: 'خطا در تایید تراکنش',
          message: confirmResponse.Message,
        },
        { status: 400 }
      );
    }

    // Use the amount from payment record (more reliable)
    const amountInToman = paymentRecord.amountToman;

    // Get current user data
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { balance: true, name: true },
    });

    if (!currentUser) {
      throw new Error('خطا در دریافت اطلاعات کاربر');
    }

    const newBalance = (currentUser.balance || 0) + amountInToman;

    // Update balance
    await prisma.user.update({
      where: { id: session.user.id },
      data: { balance: newBalance },
    });

    // Update payment record to completed
    await prisma.payment.update({
      where: { id: paymentRecord.id },
      data: {
        status: 'completed',
        refNo: confirmResponse.RefNo || null,
        gatewayResponse: JSON.stringify(confirmResponse),
        completedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'پرداخت با موفقیت انجام شد',
      data: {
        orderId: confirmResponse.OrderID || OrderID,
        refNo: confirmResponse.RefNo,
        amount: amountInToman, // Return amount in Toman
        amountInRials: paymentRecord.amountRial, // Original amount in Rials
        newBalance, // Balance is stored in Toman
      },
    });
  } catch (error) {
    console.error('Payment verify error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'خطا در پردازش پرداخت',
      },
      { status: 500 }
    );
  }
}
