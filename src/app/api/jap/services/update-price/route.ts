import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * PATCH - Update service price (rate)
 * Body: { japServiceId: number, rate: number }
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { japServiceId, rate } = body;

    if (!japServiceId || rate === undefined) {
      return NextResponse.json(
        { error: 'japServiceId and rate are required' },
        { status: 400 }
      );
    }

    if (rate < 0) {
      return NextResponse.json(
        { error: 'Rate must be a positive number' },
        { status: 400 }
      );
    }

    const service = await prisma.jAPService.update({
      where: { japServiceId: Number(japServiceId) },
      data: { rate: Number(rate) },
    });

    return NextResponse.json({
      success: true,
      message: 'Service price updated successfully',
      data: {
        id: service.id,
        jap_service_id: service.japServiceId,
        name: service.name,
        rate: service.rate,
        min_quantity: service.minQuantity,
        max_quantity: service.maxQuantity,
      },
    });

  } catch (error) {
    console.error('Update service price error:', error);
    
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update service price' },
      { status: 500 }
    );
  }
}

