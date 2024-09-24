import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'; // Import the types for Next.js API routes

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
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

      return res.status(200).json({
        totalFarmers,
        totalCultivatedLand,
        averageCapitalPerFarmer,
        averageYieldSoldPercentagePerFarmer
      });
    } catch (error) {
      console.error('Error fetching farmers data:', error);
      return res.status(500).json({ error: 'Could not fetch farmers data' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
