import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const fetchFarmersData = async () => {
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
    return farmers;
  } catch (error) {
    console.error("Error fetching farmers' data:", error);
    throw new Error('Could not fetch farmers data');
  } finally {
    await prisma.$disconnect();
  }
};

export const fetchDetails = async () => {
  try {
    const farmers = await fetchFarmersData();

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
    console.log(farmers);

    return {
      totalFarmers,
      totalCultivatedLand,
      averageCapitalPerFarmer,
      averageYieldSoldPercentagePerFarmer
    };
  } catch (error) {
    console.error('Error fetching details:', error);
    throw new Error('Could not fetch details');
  }
};
