"use server";

import { PrismaClient } from "@prisma/client";
import { convertToPlainObject } from "@/lib/utils";
import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants";

// Get Latest products
export async function getLatestProducts() {
  const prisma = new PrismaClient();
  try {
    const data = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: LATEST_PRODUCTS_LIMIT,
    });
    return convertToPlainObject(data);
  } catch (error) {
    console.error("Error fetching latest products:", error);
    throw error;
  }
}
