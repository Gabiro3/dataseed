import { PrismaClient } from '@prisma/client';
import { getFarmers } from '@/lib/db';
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

// Define the Farmer interface
interface Farmer {
  totalFarmArea: number;
  capitalRequired: number;
  yieldSoldPercentage: number;
}

export const fetchDetails = async () => {
  try {
    // Fetch farmers data from the database
    const response = await fetch('/api/farmers');

    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Parse the response JSON
    const data = await response.json();
    const farmers: Farmer[] = data.farmers; // Access the farmers data from the response

    // Perform calculations
    const totalFarmers = farmers.length;
    const totalCultivatedLand = farmers.reduce<number>(
      (acc, farmer) => acc + farmer.totalFarmArea,
      0
    );
    const totalCapital = farmers.reduce<number>(
      (acc, farmer) => acc + farmer.capitalRequired,
      0
    );
    const totalYieldSoldPercentage = farmers.reduce<number>(
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

    // Return the calculated details
    return {
      totalFarmers,
      roundedCultivatedLand,
      roundedAverageCapital,
      roundedAverageYield
    };
  } catch (error) {
    console.error('Error fetching details:', error);
    return null; // or handle the error as needed
  }
};
