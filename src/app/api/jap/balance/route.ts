import { NextResponse } from 'next/server';
import { japService } from '@/lib/jap';

/**
 * GET - Fetch JAP account balance
 */
export async function GET() {
  try {
    const balance = await japService.getBalance();

    return NextResponse.json({
      success: true,
      data: {
        balance: balance.balance,
        currency: balance.currency,
      },
    });

  } catch (error) {
    console.error('JAP balance error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch balance',
      },
      { status: 500 }
    );
  }
}

