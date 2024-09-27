import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { useSession } from 'next-auth/react';

export async function GET(req: Request) {
  try {
    // Optional: Use authentication if needed

    // Fetch farmers data using db.farmer.get() method
    const farmers = await db.farmer.findMany({
      select: {
        id: true,
        phoneNumber: true,
        nationalID: true,
        totalFarmArea: true,
        capitalRequired: true,
        pestTreatmentSource: true,
        sellingMarkets: true,
        farmLocation: true,
        yieldSoldPercentage: true,
        createdAt: true,
        updatedAt: true
      }
    });

    // Create a response and disable caching
    return NextResponse.json(farmers, {
      status: 200,
      headers: {
        'Cache-Control':
          'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
        'Surrogate-Control': 'no-store'
      }
    });
  } catch (error) {
    console.error('Error fetching farmers data:', error);
    return new NextResponse('Could not fetch farmers data', { status: 500 });
  }
}
