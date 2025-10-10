import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { sizpayService } from '@/lib/sizpay';
import { telegramService } from '@/lib/telegram';

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

    // Get payment callback data
    const body = await request.json();
    const { 
      Token,
      ResCod, 
      Message,
      MerchantID,
      TerminalID,
      OrderID 
    } = body;

    // Check if payment was successful
    if (!sizpayService.isSuccessResponse(ResCod)) {
      // Update payment status to failed
      await supabase
        .from('payments')
        .update({ 
          status: 'failed',
          gateway_response: body as Record<string, unknown>
        })
        .eq('token', Token);

      return NextResponse.json(
        { 
          success: false,
          error: 'پرداخت ناموفق بود',
          message: Message,
          resCod: ResCod
        },
        { status: 400 }
      );
    }

    // Get payment record from database
    const { data: paymentRecord, error: paymentFetchError } = await supabase
      .from('payments')
      .select('*')
      .eq('token', Token)
      .single();

    if (paymentFetchError || !paymentRecord) {
      return NextResponse.json(
        { 
          success: false,
          error: 'اطلاعات پرداخت یافت نشد' 
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
          alreadyProcessed: true
        },
        { status: 400 }
      );
    }

    // Verify user owns this payment
    if (paymentRecord.user_id !== user.id) {
      return NextResponse.json(
        { 
          success: false,
          error: 'عدم دسترسی به این پرداخت' 
        },
        { status: 403 }
      );
    }

    // Update payment status to verifying
    await supabase
      .from('payments')
      .update({ 
        status: 'verifying',
        merchant_id: MerchantID,
        terminal_id: TerminalID
      })
      .eq('id', paymentRecord.id);

    // Confirm transaction with payment gateway
    const confirmResponse = await sizpayService.confirm(Token);

    if (!sizpayService.isSuccessResponse(confirmResponse.ResCod)) {
      // Update payment status to failed
      await supabase
        .from('payments')
        .update({ 
          status: 'failed',
          gateway_response: confirmResponse as unknown as Record<string, unknown>
        })
        .eq('id', paymentRecord.id);

      return NextResponse.json(
        { 
          success: false,
          error: 'خطا در تایید تراکنش',
          message: confirmResponse.Message 
        },
        { status: 400 }
      );
    }

    // Use the amount from payment record (more reliable)
    const amountInToman = paymentRecord.amount_toman;
    
    // Get current user data
    const { data: currentUser, error: fetchError } = await supabase
      .from('users')
      .select('balance, name')
      .eq('id', user.id)
      .single();

    if (fetchError) {
      throw new Error('خطا در دریافت اطلاعات کاربر');
    }

    const newBalance = (currentUser.balance || 0) + amountInToman;

    // Update balance
    const { error: updateError } = await supabase
      .from('users')
      .update({ balance: newBalance })
      .eq('id', user.id);

    if (updateError) {
      // If balance update fails, mark payment as failed
      await supabase
        .from('payments')
        .update({ 
          status: 'failed',
          gateway_response: { ...confirmResponse, balanceUpdateError: updateError.message } as unknown as Record<string, unknown>
        })
        .eq('id', paymentRecord.id);

      throw new Error('خطا در به‌روزرسانی موجودی');
    }

    // Update payment record to completed
    await supabase
      .from('payments')
      .update({ 
        status: 'completed',
        ref_no: confirmResponse.RefNo || null,
        gateway_response: confirmResponse as unknown as Record<string, unknown>
      })
      .eq('id', paymentRecord.id);

    // Send Telegram notification (non-blocking)
    telegramService.notifyPayment({
      userName: currentUser.name || user.email?.split('@')[0] || 'کاربر',
      userEmail: user.email || '',
      amount: amountInToman,
      refNo: confirmResponse.RefNo,
      orderId: confirmResponse.OrderID || OrderID,
    }).catch(err => console.error('Telegram notification error:', err));

    return NextResponse.json({
      success: true,
      message: 'پرداخت با موفقیت انجام شد',
      data: {
        orderId: confirmResponse.OrderID || OrderID,
        refNo: confirmResponse.RefNo,
        amount: amountInToman, // Return amount in Toman
        amountInRials: paymentRecord.amount_rial, // Original amount in Rials
        newBalance, // Balance is stored in Toman
      },
    });

  } catch (error) {
    console.error('Payment verify error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'خطا در پردازش پرداخت' 
      },
      { status: 500 }
    );
  }
}

