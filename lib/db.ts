import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Create a Prisma Client instance
export const db = globalThis.prisma || new PrismaClient();

// Ensure Prisma is not re-initialized during hot reloading in development
if (process.env.ENVNODE_ !== 'production') globalThis.prisma = db;

// Function to fetch farmers from the database
export const getFarmers = async () => {
  // Fetch farmers using Prisma's findMany method with selected fields
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

  return farmers;
};
