import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { japService } from '@/lib/jap';

/**
 * GET - Fetch JAP services and sync with database
 */
export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();

    // Fetch services from JAP API
    const services = await japService.getServices();

    // Sync services with database
    for (const service of services) {
      const { data: existingService } = await supabase
        .from('jap_services')
        .select('id')
        .eq('jap_service_id', service.service)
        .single();

      if (existingService) {
        // Update existing service
        await supabase
          .from('jap_services')
          .update({
            name: service.name,
            type: service.type,
            category: service.category,
            rate: parseFloat(service.rate),
            min_quantity: parseInt(service.min),
            max_quantity: parseInt(service.max),
            refill_available: service.refill,
            cancel_available: service.cancel,
          })
          .eq('jap_service_id', service.service);
      } else {
        // Insert new service
        await supabase
          .from('jap_services')
          .insert({
            jap_service_id: service.service,
            name: service.name,
            type: service.type,
            category: service.category,
            rate: parseFloat(service.rate),
            min_quantity: parseInt(service.min),
            max_quantity: parseInt(service.max),
            refill_available: service.refill,
            cancel_available: service.cancel,
          });
      }
    }

    // Return synced services from database
    const { data: dbServices, error } = await supabase
      .from('jap_services')
      .select('*')
      .eq('is_active', true)
      .order('category')
      .order('name');

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: 'Services synced successfully',
      data: dbServices,
      totalSynced: services.length,
    });

  } catch (error) {
    console.error('JAP services error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch services',
      },
      { status: 500 }
    );
  }
}

