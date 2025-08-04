import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Get inventory statistics
    const [totalProducts, totalVariants, lowStockVariants, outOfStockVariants] = await Promise.all([
      prisma.product.count({ where: { isActive: true } }),
      prisma.productVariant.count(),
      prisma.productVariant.count({
        where: {
          stock: {
            lte: prisma.productVariant.fields.minStock,
          },
        },
      }),
      prisma.productVariant.count({
        where: { stock: 0 },
      }),
    ]);

    // Calculate in stock (not low stock and not out of stock)
    const inStock = totalVariants - lowStockVariants;

    return {
      success: true,
      data: {
        totalProducts,
        inStock,
        lowStock: lowStockVariants - outOfStockVariants,
        outOfStock: outOfStockVariants,
      },
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch inventory stats",
      data: { error: error instanceof Error ? error.message : "Unknown error" },
    });
  }
});
