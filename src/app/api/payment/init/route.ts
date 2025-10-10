import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { sizpayService } from '@/lib/sizpay';
import { tomanToRial } from '@/lib/currency';

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

    // Get request body
    const body = await request.json();
    const { amount } = body; // Amount in Toman

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'مبلغ نامعتبر است' },
        { status: 400 }
      );
    }

    // Convert Toman to Rials for payment gateway (1 Toman = 10 Rials)
    const amountInRials = tomanToRial(Number(amount));

    // Generate unique order ID
    const orderId = `WLT-${Date.now()}-${user.id.slice(0, 8)}`;
    const invoiceNo = orderId;

    // Get user profile for payment details
    const { data: userProfile } = await supabase
      .from('users')
      .select('name')
      .eq('id', user.id)
      .single();

    // Get client IP
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const clientIp = forwardedFor?.split(',')[0] || realIp || 'unknown';

    // Create payment record in database (BEFORE calling gateway)
    const { data: paymentRecord, error: paymentInsertError } = await supabase
      .from('payments')
      .insert({
        user_id: user.id,
        order_id: orderId,
        invoice_no: invoiceNo,
        amount_toman: Number(amount),
        amount_rial: amountInRials,
        status: 'pending',
        ip_address: clientIp,
      })
      .select()
      .single();

    if (paymentInsertError) {
      return NextResponse.json(
        { error: 'خطا در ثبت درخواست پرداخت' },
        { status: 500 }
      );
    }

    // Create payment token (amount in Rials)
    const tokenResponse = await sizpayService.getToken({
      amount: amountInRials,
      orderId,
      invoiceNo,
      payerName: userProfile?.name || user.email?.split('@')[0] || 'کاربر',
      payerEmail: user.email || '',
      description: `شارژ کیف پول - ${amount.toLocaleString()} تومان`,
      payerIp: clientIp,
    });

    // Check if token was generated successfully
    if (!sizpayService.isSuccessResponse(tokenResponse.ResCod)) {
      // Update payment status to failed
      await supabase
        .from('payments')
        .update({ 
          status: 'failed',
          gateway_response: tokenResponse as unknown as Record<string, unknown>
        })
        .eq('id', paymentRecord.id);

      return NextResponse.json(
        { 
          error: 'خطا در ایجاد درخواست پرداخت',
          message: tokenResponse.Message,
          code: tokenResponse.ResCod
        },
        { status: 400 }
      );
    }

    if (!tokenResponse.Token) {
      // Update payment status to failed
      await supabase
        .from('payments')
        .update({ status: 'failed' })
        .eq('id', paymentRecord.id);

      return NextResponse.json(
        { error: 'توکن پرداخت دریافت نشد' },
        { status: 500 }
      );
    }

    // Update payment record with token and set to processing
    await supabase
      .from('payments')
      .update({ 
        token: tokenResponse.Token,
        status: 'processing',
        gateway_response: tokenResponse as unknown as Record<string, unknown>
      })
      .eq('id', paymentRecord.id);

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
        details: error instanceof Error ? error.stack : String(error)
      },
      { status: 500 }
    );
  }
}

