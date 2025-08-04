import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method === "GET") {
    try {
      const customers = await prisma.customer.findMany({
        where: { isActive: true },
        include: {
          orders: {
            orderBy: { createdAt: "desc" },
            take: 5,
          },
        },
        orderBy: { createdAt: "desc" },
      });

      // Format customers with additional computed fields
      const formattedCustomers = customers.map((customer: any) => ({
        ...customer,
        fullName: `${customer.firstName} ${customer.lastName}`,
        lastOrderDate: customer.orders[0]?.createdAt || null,
        status: customer.orders.length > 0 ? "Active" : "New",
      }));

      return {
        success: true,
        data: formattedCustomers,
      };
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to fetch customers",
        data: { error: error instanceof Error ? error.message : "Unknown error" },
      });
    }
  }

  if (method === "POST") {
    try {
      const body = await readBody(event);
      const { firstName, lastName, email, phone, address, city } = body;

      // Validate required fields
      if (!firstName || !lastName || !phone) {
        throw createError({
          statusCode: 400,
          statusMessage: "Missing required fields: firstName, lastName, phone",
        });
      }

      // Check if customer with same email or phone exists
      if (email || phone) {
        const existingCustomer = await prisma.customer.findFirst({
          where: {
            OR: [email ? { email } : {}, phone ? { phone } : {}].filter(
              (condition) => Object.keys(condition).length > 0
            ),
          },
        });

        if (existingCustomer) {
          throw createError({
            statusCode: 409,
            statusMessage: "Customer with this email or phone already exists",
          });
        }
      }

      const customer = await prisma.customer.create({
        data: {
          firstName,
          lastName,
          email: email || null,
          phone: phone || null,
          address: address || null,
          city: city || null,
        },
      });

      return {
        success: true,
        data: {
          ...customer,
          fullName: `${customer.firstName} ${customer.lastName}`,
          status: "New",
        },
      };
    } catch (error: any) {
      if (error.statusCode) throw error;

      throw createError({
        statusCode: 500,
        statusMessage: "Failed to create customer",
        data: { error: error instanceof Error ? error.message : "Unknown error" },
      });
    }
  }

  throw createError({
    statusCode: 405,
    statusMessage: "Method not allowed",
  });
});
