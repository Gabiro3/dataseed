import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function GET(req: NextRequest) {
  const prisma = new PrismaClient(); // Create a new instance of PrismaClient for each request
  try {
    // Fetch farmers data from the database
    const farmers = await prisma.farmer.findMany({
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
  } finally {
    await prisma.$disconnect(); // Ensure that the database connection is closed after the request
  }
}
