import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";

async function main() {
  const prisma = new PrismaClient();
  try {
    await prisma.product.deleteMany(); // Clear existing products
    await prisma.product.createMany({
      data: sampleData.products,
    });
    console.log("Sample data seeded successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

main();
