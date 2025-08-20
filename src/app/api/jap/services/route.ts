import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()

    // Get JAP services from our database
    const { data: services, error } = await supabase
      .from('jap_services')
      .select('*')
      .eq('is_active', true)
      .order('category', { ascending: true })
      .order('name', { ascending: true })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch services from database' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: services
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()

    // Call the Edge Function to sync services from JAP
    const { data, error } = await supabase.functions.invoke('orders', {
      body: { action: 'sync-services' }
    })

    if (error) {
      console.error('Edge function error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to sync services' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Services synced successfully',
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
