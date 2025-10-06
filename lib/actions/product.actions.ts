"use server";

import { prisma } from "@/db/prisma";
import { convertToPlainObject, formatError } from "@/lib/utils";
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from "@/lib/constants";
import { revalidatePath } from "next/cache";
import z from "zod";
import { insertProductSchema, updateProductSchema } from "../validators";
import { Prisma } from "@prisma/client";

// Get Latest products
export async function getLatestProducts() {
  try {
    const data = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: LATEST_PRODUCTS_LIMIT,
    });
    return await convertToPlainObject(data);
  } catch (error) {
    console.error("Error fetching latest products:", error);
    return [];
  }
}

// Get single Product by it's slug
export async function getProductBySlug(slug: string) {
  try {
    const data = await prisma.product.findFirst({
      where: { slug },
    });
    return await convertToPlainObject(data);
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    return null;
  }
}

// Get single Product by it's id
export async function getProductById(productId: string) {
  try {
    const data = await prisma.product.findFirst({
      where: { id: productId },
    });
    return convertToPlainObject(data);
  } catch (error) {
    console.error(`Error fetching product with id ${productId}:`, error);
  }
}

// Get all products
export async function getAllProducts({
  query,
  limit = PAGE_SIZE,
  page,
  category,
  price,
  rating,
  sort,
}: {
  query: string;
  limit?: number;
  page: number;
  category?: string;
  price?: string;
  rating?: string;
  sort?: string;
}) {
  // Query filter
  const queryFilter: Prisma.ProductWhereInput =
    query && query !== "all"
      ? {
          name: {
            contains: query,
            mode: "insensitive",
          } as Prisma.StringFilter,
        }
      : {};

  // Category Filter
  const categoryFilter = category && category !== "all" ? { category } : {};

  const priceFilter: Prisma.ProductWhereInput =
    price && price !== "all"
      ? {
          price: {
            gte: Number(price.split("-")[0]),
            lte: Number(price.split("-")[1]),
          },
        }
      : {};

  // Rating filter
  const ratingFilter =
    rating && rating !== "all"
      ? {
          rating: {
            gte: Number(rating),
          },
        }
      : {};

  const data = await prisma.product.findMany({
    where: {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    },
    orderBy:
      sort === "lowest"
        ? { price: "asc" }
        : sort == "highest"
        ? { price: "desc" }
        : sort === "rating"
        ? { rating: "desc" }
        : { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
  });

  const dataCount = await prisma.product.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}

// Delete a product
export async function deleteProduct(id: string) {
  try {
    const productExists = await prisma.product.findFirst({
      where: { id },
    });

    if (!productExists) throw new Error("Product not found");

    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// Create a new product
export async function createProduct(data: z.infer<typeof insertProductSchema>) {
  try {
    const product = insertProductSchema.parse(data);
    await prisma.product.create({ data: product });
    revalidatePath("/admin/products");
    return {
      success: true,
      message: "Product created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// Update an existing product
export async function updateProduct(data: z.infer<typeof updateProductSchema>) {
  try {
    const product = updateProductSchema.parse(data);
    const productExists = await prisma.product.findFirst({
      where: { id: product.id },
    });

    if (!productExists) throw new Error("Product not found");
    await prisma.product.update({
      where: { id: product.id },
      data: product,
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// Get all categories
export async function getAllCategories() {
  const data = await prisma.product.groupBy({
    by: ["category"],
    _count: true,
  });

  return data;
}

// Get featured products
export async function getFeaturedProducts() {
  const data = await prisma.product.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });
  return convertToPlainObject(data);
}
