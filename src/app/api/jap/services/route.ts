import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { japService } from '@/lib/jap';
import { usdToToman } from '@/lib/currency';

/**
 * GET - Fetch JAP services (returns cached from DB if available, otherwise fetches from JAP)
 */
export async function GET() {
  try {
    // First, try to get cached services from database
    const dbServices = await prisma.jAPService.findMany({
      where: { isActive: true },
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    });

    // If we have cached services, return them immediately
    if (dbServices && dbServices.length > 0) {
      return NextResponse.json({
        success: true,
        message: 'Services loaded from cache',
        data: dbServices.map((s) => ({
          id: s.id,
          jap_service_id: s.japServiceId,
          name: s.name,
          type: s.type,
          category: s.category,
          rate: s.rate,
          min_quantity: s.minQuantity,
          max_quantity: s.maxQuantity,
          refill_available: s.refillAvailable,
          cancel_available: s.cancelAvailable,
          is_active: s.isActive,
          created_at: s.createdAt.toISOString(),
          updated_at: s.updatedAt.toISOString(),
        })),
        cached: true,
      });
    }

    // No cached services, fetch from JAP API
    const services = await japService.getServices();

    if (!services || services.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No services available from JAP. Please check JAP_API_KEY configuration.',
        },
        { status: 500 }
      );
    }

    // Sync services with database
    for (const service of services) {
      // Convert JAP rate (USD) to Toman
      const rateInUsd = parseFloat(service.rate);
      const rateInToman = usdToToman(rateInUsd);

      await prisma.jAPService.upsert({
        where: { japServiceId: service.service },
        update: {
          name: service.name,
          type: service.type || null,
          category: service.category || 'Other',
          rate: rateInToman,
          minQuantity: parseInt(service.min),
          maxQuantity: parseInt(service.max),
          refillAvailable: service.refill || false,
          cancelAvailable: service.cancel || false,
          isActive: true,
        },
        create: {
          japServiceId: service.service,
          name: service.name,
          type: service.type || null,
          category: service.category || 'Other',
          rate: rateInToman,
          minQuantity: parseInt(service.min),
          maxQuantity: parseInt(service.max),
          refillAvailable: service.refill || false,
          cancelAvailable: service.cancel || false,
          isActive: true,
        },
      });
    }

    // Return synced services from database
    const syncedServices = await prisma.jAPService.findMany({
      where: { isActive: true },
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    });

    return NextResponse.json({
      success: true,
      message: 'Services synced successfully',
      data: syncedServices.map((s) => ({
        id: s.id,
        jap_service_id: s.japServiceId,
        name: s.name,
        type: s.type,
        category: s.category,
        rate: s.rate,
        min_quantity: s.minQuantity,
        max_quantity: s.maxQuantity,
        refill_available: s.refillAvailable,
        cancel_available: s.cancelAvailable,
        is_active: s.isActive,
        created_at: s.createdAt.toISOString(),
        updated_at: s.updatedAt.toISOString(),
      })),
      totalSynced: services.length,
      cached: false,
    });
  } catch (error) {
    console.error('JAP services error:', error);

    // Provide more helpful error messages
    let errorMessage = 'Failed to fetch services';
    if (error instanceof Error) {
      if (error.message.includes('JAP_API_KEY')) {
        errorMessage =
          'JAP API is not configured. Please set JAP_API_KEY in environment variables.';
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
