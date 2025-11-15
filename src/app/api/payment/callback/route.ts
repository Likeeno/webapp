import { NextRequest, NextResponse } from 'next/server';

/**
 * Handle payment gateway callback (POST)
 * SizPay sends POST request with payment result
 */
export async function POST(request: NextRequest) {
  try {
    // Get form data or JSON from payment gateway
    const contentType = request.headers.get('content-type');
    let body: Record<string, unknown>;

    if (contentType?.includes('application/json')) {
      body = (await request.json()) as Record<string, unknown>;
    } else {
      // Handle form data
      const formData = await request.formData();
      body = Object.fromEntries(formData) as Record<string, unknown>;
    }

    // Extract payment parameters
    const Token = String(body.Token || '');
    const ResCod = body.ResCod;
    const Message = String(body.Message || '');
    const MerchantID = String(body.MerchantID || '');
    const TerminalID = String(body.TerminalID || '');
    const Amount = body.Amount;
    const OrderID = String(body.OrderID || '');

    // Build redirect URL with parameters
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const host = request.headers.get('host') || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;
    const redirectUrl = new URL('/payment/callback', baseUrl);

    // Add all parameters to URL
    if (Token) redirectUrl.searchParams.set('Token', Token);
    if (ResCod !== undefined) redirectUrl.searchParams.set('ResCod', String(ResCod));
    if (Message) redirectUrl.searchParams.set('Message', Message);
    if (MerchantID) redirectUrl.searchParams.set('MerchantID', MerchantID);
    if (TerminalID) redirectUrl.searchParams.set('TerminalID', TerminalID);
    if (Amount) redirectUrl.searchParams.set('Amount', String(Amount));
    if (OrderID) redirectUrl.searchParams.set('OrderID', OrderID);

    // Redirect to callback page
    return NextResponse.redirect(redirectUrl.toString());
  } catch (error) {
    console.error('Payment callback route error:', error);

    // Redirect to callback page with error
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const host = request.headers.get('host') || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;
    const redirectUrl = new URL('/payment/callback', baseUrl);
    redirectUrl.searchParams.set('error', 'خطا در دریافت اطلاعات پرداخت');

    return NextResponse.redirect(redirectUrl.toString());
  }
}

/**
 * Handle payment gateway callback (GET)
 * Some gateways use GET redirect
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Build redirect URL preserving all parameters
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const host = request.headers.get('host') || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;
    const redirectUrl = new URL('/payment/callback', baseUrl);

    // Copy all search parameters
    searchParams.forEach((value, key) => {
      redirectUrl.searchParams.set(key, value);
    });

    return NextResponse.redirect(redirectUrl.toString());
  } catch (error) {
    console.error('Payment callback GET error:', error);
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const host = request.headers.get('host') || 'localhost:3000';
    return NextResponse.redirect(`${protocol}://${host}/dashboard`);
  }
}
