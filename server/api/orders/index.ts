import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method === "GET") {
    try {
      const orders = await prisma.order.findMany({
        include: {
          customer: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          items: {
            include: {
              product: true,
              productVariant: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      // Format orders with additional computed fields
      const formattedOrders = orders.map((order: any) => ({
        ...order,
        customerName: order.customer
          ? `${order.customer.firstName} ${order.customer.lastName}`
          : "Walk-in Customer",
        staffName: `${order.user.firstName} ${order.user.lastName}`,
        itemCount: order.items.length,
        totalItems: order.items.reduce((sum: number, item: any) => sum + item.quantity, 0),
      }));

      return {
        success: true,
        data: formattedOrders,
      };
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to fetch orders",
        data: { error: error instanceof Error ? error.message : "Unknown error" },
      });
    }
  }

  if (method === "POST") {
    try {
      const body = await readBody(event);
      const {
        customerId,
        items,
        subtotal,
        discount = 0,
        discountType = "PERCENTAGE",
        tax = 0,
        total,
        notes,
        userId = "default-user-id", // In a real app, get from auth
      } = body;

      // Validate required fields
      if (!items || items.length === 0 || !total) {
        throw createError({
          statusCode: 400,
          statusMessage: "Missing required fields: items and total",
        });
      }

      // Generate order number
      const orderCount = await prisma.order.count();
      const orderNumber = `ORD-${Date.now()}-${orderCount + 1}`;

      // Create order with items
      const order = await prisma.order.create({
        data: {
          orderNumber,
          customerId: customerId || null,
          userId,
          subtotal: parseFloat(subtotal),
          discount: parseFloat(discount),
          discountType,
          tax: parseFloat(tax),
          total: parseFloat(total),
          notes: notes || null,
          items: {
            create: items.map((item: any) => ({
              productId: item.productId,
              productVariantId: item.productVariantId || null,
              quantity: parseInt(item.quantity),
              unitPrice: parseFloat(item.unitPrice),
              totalPrice: parseFloat(item.totalPrice),
            })),
          },
        },
        include: {
          customer: true,
          items: {
            include: {
              product: true,
              productVariant: true,
            },
          },
        },
      });

      // Update stock quantities
      for (const item of items) {
        if (item.productVariantId) {
          await prisma.productVariant.update({
            where: { id: item.productVariantId },
            data: {
              stock: {
                decrement: parseInt(item.quantity),
              },
            },
          });

          // Log stock movement
          const variant = await prisma.productVariant.findUnique({
            where: { id: item.productVariantId },
          });

          if (variant) {
            await prisma.stockMovement.create({
              data: {
                productVariantId: item.productVariantId,
                type: "OUT",
                quantity: parseInt(item.quantity),
                previousStock: variant.stock + parseInt(item.quantity),
                newStock: variant.stock,
                reason: "Sale",
                reference: order.id,
              },
            });
          }
        }
      }

      // Update customer stats if customer exists
      if (customerId) {
        await prisma.customer.update({
          where: { id: customerId },
          data: {
            totalOrders: { increment: 1 },
            totalSpent: { increment: parseFloat(total) },
          },
        });
      }

      return {
        success: true,
        data: order,
      };
    } catch (error: any) {
      if (error.statusCode) throw error;

      throw createError({
        statusCode: 500,
        statusMessage: "Failed to create order",
        data: { error: error instanceof Error ? error.message : "Unknown error" },
      });
    }
  }

  throw createError({
    statusCode: 405,
    statusMessage: "Method not allowed",
  });
});
