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
  const response = await fetch('https://dataseed.vercel.app/api/farmers/', {
    cache: 'no-cache'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};
