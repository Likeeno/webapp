import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { japService } from '@/lib/jap';

/**
 * GET - Fetch JAP services (returns cached from DB if available, otherwise fetches from JAP)
 */
export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();

    // First, try to get cached services from database
    const { data: dbServices, error: dbError } = await supabase
      .from('jap_services')
      .select('*')
      .eq('is_active', true)
      .order('category')
      .order('name');

    // If we have cached services, return them immediately
    if (!dbError && dbServices && dbServices.length > 0) {
      return NextResponse.json({
        success: true,
        message: 'Services loaded from cache',
        data: dbServices,
        cached: true,
      });
    }

    // No cached services, fetch from JAP API
    const services = await japService.getServices();

    if (!services || services.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No services available from JAP. Please check JAP_API_KEY configuration.',
      },
      { status: 500 });
    }

    // Sync services with database (batch insert/update would be better, but this works)
    const servicesToInsert = services.map(service => ({
      jap_service_id: service.service,
      name: service.name,
      type: service.type || null,
      category: service.category || 'Other',
      rate: parseFloat(service.rate),
      min_quantity: parseInt(service.min),
      max_quantity: parseInt(service.max),
      refill_available: service.refill || false,
      cancel_available: service.cancel || false,
    }));

    // Use upsert to insert or update in one operation
    const { error: upsertError } = await supabase
      .from('jap_services')
      .upsert(servicesToInsert, {
        onConflict: 'jap_service_id',
        ignoreDuplicates: false
      });

    if (upsertError) {
      console.error('Database sync error:', upsertError);
      // Return services from JAP even if DB sync fails
      return NextResponse.json({
        success: true,
        message: 'Services loaded from JAP (database sync failed)',
        data: servicesToInsert,
        cached: false,
      });
    }

    // Return synced services from database
    const { data: syncedServices } = await supabase
      .from('jap_services')
      .select('*')
      .eq('is_active', true)
      .order('category')
      .order('name');

    return NextResponse.json({
      success: true,
      message: 'Services synced successfully',
      data: syncedServices || servicesToInsert,
      totalSynced: services.length,
      cached: false,
    });

  } catch (error) {
    console.error('JAP services error:', error);
    
    // Provide more helpful error messages
    let errorMessage = 'Failed to fetch services';
    if (error instanceof Error) {
      if (error.message.includes('JAP_API_KEY')) {
        errorMessage = 'JAP API is not configured. Please set JAP_API_KEY in environment variables.';
      } else {
        errorMessage = error.message;
      }
    }
    
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

