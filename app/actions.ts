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

// Define the Farmer interface
interface Farmer {
  totalFarmArea: number;
  capitalRequired: number;
  yieldSoldPercentage: number;
}

export const fetchDetails = async () => {
  try {
    // Fetch farmers data from the API
    const response = await fetch(
      `${process.env.API_URL}/farmers?ts=${Date.now()}`
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Parse the response JSON
    const data = await response.json();

    // Access the farmers data from the response
    const totalFarmers = data['Total farmers'];
    const roundedCultivatedLand = parseFloat(
      data['Total farm area'].toFixed(2)
    );
    const roundedAverageCapital = parseFloat(data['Avg Capital'].toFixed(2));
    const roundedAverageYield = parseFloat(data['Avg Yield'].toFixed(2));

    // Return the calculated details
    return {
      totalFarmers,
      roundedCultivatedLand,
      roundedAverageCapital,
      roundedAverageYield
    };
  } catch (error) {
    console.error('Error fetching details:', error);
    return null; // Handle the error as needed
  }
};
