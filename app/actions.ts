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
    return {
      totalCapital,
      averageCapitalPerFarmer: roundedAverageCapital,
      averageYieldSoldPercentagePerFarmer: roundedAverageYield,
      totalFarmers,
      totalCultivatedLand: roundedCultivatedLand
    };
  } catch (error) {
    console.error("Error fetching farmers' data:", error);
    throw new Error('Could not fetch farmers data');
  } finally {
    await prisma.$disconnect();
  }
};
