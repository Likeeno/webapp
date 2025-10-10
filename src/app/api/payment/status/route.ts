import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if SizPay configuration is complete
    const isConfigured = !!(
      process.env.SIZPAY_BASE_URL &&
      process.env.SIZPAY_USERNAME &&
      process.env.SIZPAY_PASSWORD &&
      process.env.SIZPAY_MERCHANT_ID &&
      process.env.SIZPAY_TERMINAL_ID &&
      process.env.SIZPAY_RETURN_URL
    );

    const missing: string[] = [];
    if (!process.env.SIZPAY_BASE_URL) missing.push('SIZPAY_BASE_URL');
    if (!process.env.SIZPAY_USERNAME) missing.push('SIZPAY_USERNAME');
    if (!process.env.SIZPAY_PASSWORD) missing.push('SIZPAY_PASSWORD');
    if (!process.env.SIZPAY_MERCHANT_ID) missing.push('SIZPAY_MERCHANT_ID');
    if (!process.env.SIZPAY_TERMINAL_ID) missing.push('SIZPAY_TERMINAL_ID');
    if (!process.env.SIZPAY_RETURN_URL) missing.push('SIZPAY_RETURN_URL');

    return NextResponse.json({
      configured: isConfigured,
      missing: missing,
      message: isConfigured 
        ? 'درگاه پرداخت فعال است' 
        : `لطفاً متغیرهای زیر را در .env.local تنظیم کنید: ${missing.join(', ')}`
    });

  } catch (error) {
    console.error('Payment status check error:', error);
    return NextResponse.json(
      { 
        configured: false,
        error: 'خطا در بررسی وضعیت درگاه پرداخت' 
      },
      { status: 500 }
    );
  }
}

