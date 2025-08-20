import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()

    // Call the Edge Function to get JAP balance
    const { data, error } = await supabase.functions.invoke('orders', {
      body: { action: 'get-balance' }
    })

    if (error) {
      console.error('Edge function error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch balance' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
