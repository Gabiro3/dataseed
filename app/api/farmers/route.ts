import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    // Execute the Prisma query every time
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
    return new Response(
      JSON.stringify({
        farmers
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          // Prevent caching
          'Cache-Control':
            'no-store, no-cache, must-revalidate, proxy-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
          'Surrogate-Control': 'no-store'
        }
      }
    );
  } catch (error) {
    console.error('Error fetching farmers data:', error);
    return new Response(
      JSON.stringify({ error: 'Could not fetch farmers data' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
