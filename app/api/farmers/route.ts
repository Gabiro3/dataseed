// Reuse PrismaClient
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
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

    const totalFarmers = farmers.length;
    const totalCultivatedLand = farmers.reduce(
      (acc, farmer) => acc + farmer.totalFarmArea,
      0
    );
    const totalCapital = farmers.reduce(
      (acc, farmer) => acc + farmer.capitalRequired,
      0
    );
    const totalYieldSoldPercentage = farmers.reduce(
      (acc, farmer) => acc + farmer.yieldSoldPercentage,
      0
    );

    const averageCapitalPerFarmer =
      totalFarmers > 0 ? totalCapital / totalFarmers : 0;
    const averageYieldSoldPercentagePerFarmer =
      totalFarmers > 0 ? totalYieldSoldPercentage / totalFarmers : 0;

    // Round off to two decimal places
    const roundedAverageCapital = parseFloat(
      averageCapitalPerFarmer.toFixed(2)
    );
    const roundedAverageYield = parseFloat(
      averageYieldSoldPercentagePerFarmer.toFixed(2)
    );
    const roundedCultivatedLand = parseFloat(totalCultivatedLand.toFixed(2));

    return new Response(
      JSON.stringify({
        totalFarmers,
        totalCultivatedLand: roundedCultivatedLand,
        averageCapitalPerFarmer: roundedAverageCapital,
        averageYieldSoldPercentagePerFarmer: roundedAverageYield
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
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
