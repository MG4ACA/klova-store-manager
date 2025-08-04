import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method === "GET") {
    try {
      // Get all products with categories and variants
      const products = await prisma.product.findMany({
        include: {
          category: true,
          variants: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      // Calculate total stock for each product
      const productsWithStock = products.map((product) => {
        const totalStock = product.variants.reduce((sum, variant) => sum + variant.stock, 0);
        const lowStockThreshold = Math.min(...product.variants.map((v) => v.minStock));

        return {
          ...product,
          stockQuantity: totalStock,
          lowStockThreshold,
          price: product.basePrice,
          image: product.images ? JSON.parse(product.images)[0] : null,
        };
      });

      return {
        success: true,
        data: productsWithStock,
      };
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to fetch products",
        data: { error: error.message },
      });
    }
  }

  if (method === "POST") {
    try {
      const body = await readBody(event);
      const {
        name,
        sku,
        description,
        categoryId,
        price,
        costPrice,
        variants = [],
        images = [],
      } = body;

      // Validate required fields
      if (!name || !sku || !price || !categoryId) {
        throw createError({
          statusCode: 400,
          statusMessage: "Missing required fields",
        });
      }

      // Check if SKU already exists
      const existingProduct = await prisma.product.findUnique({
        where: { sku },
      });

      if (existingProduct) {
        throw createError({
          statusCode: 409,
          statusMessage: "Product with this SKU already exists",
        });
      }

      // Create product with variants
      const product = await prisma.product.create({
        data: {
          name,
          sku,
          description: description || null,
          categoryId,
          basePrice: parseFloat(price),
          costPrice: costPrice ? parseFloat(costPrice) : null,
          images: images.length > 0 ? JSON.stringify(images) : null,
          variants: {
            create:
              variants.length > 0
                ? variants.map((variant, index) => ({
                    sku: `${sku}-${index + 1}`,
                    size: variant.size || null,
                    color: variant.color || null,
                    style: variant.style || null,
                    stock: parseInt(variant.stock) || 0,
                    minStock: 5,
                  }))
                : [
                    {
                      sku: `${sku}-1`,
                      stock: parseInt(body.stockQuantity) || 0,
                      minStock: parseInt(body.lowStockThreshold) || 5,
                    },
                  ],
          },
        },
        include: {
          category: true,
          variants: true,
        },
      });

      return {
        success: true,
        data: product,
      };
    } catch (error) {
      if (error.statusCode) throw error;

      throw createError({
        statusCode: 500,
        statusMessage: "Failed to create product",
        data: { error: error.message },
      });
    }
  }

  throw createError({
    statusCode: 405,
    statusMessage: "Method not allowed",
  });
});
