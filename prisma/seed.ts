import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.stockMovement.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.user.deleteMany();

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Shirts",
        description: "All types of shirts and tops",
      },
    }),
    prisma.category.create({
      data: {
        name: "Pants",
        description: "Jeans, trousers, and casual pants",
      },
    }),
    prisma.category.create({
      data: {
        name: "Dresses",
        description: "Casual and formal dresses",
      },
    }),
    prisma.category.create({
      data: {
        name: "Accessories",
        description: "Belts, bags, and other accessories",
      },
    }),
    prisma.category.create({
      data: {
        name: "Outerwear",
        description: "Jackets, coats, and hoodies",
      },
    }),
  ]);

  console.log("✅ Categories created");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@klova.com",
      username: "admin",
      password: hashedPassword,
      firstName: "Admin",
      lastName: "User",
      role: "ADMIN",
    },
  });

  console.log("✅ Admin user created");

  // Create sample customers
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+1-555-0101",
        address: "123 Main St",
        city: "New York",
      },
    }),
    prisma.customer.create({
      data: {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phone: "+1-555-0102",
        address: "456 Oak Ave",
        city: "Los Angeles",
      },
    }),
    prisma.customer.create({
      data: {
        firstName: "Mike",
        lastName: "Johnson",
        email: "mike.j@example.com",
        phone: "+1-555-0103",
        address: "789 Pine St",
        city: "Chicago",
      },
    }),
  ]);

  console.log("✅ Customers created");

  // Create sample products with variants
  const products = [];

  // T-Shirt
  const tshirt = await prisma.product.create({
    data: {
      sku: "TSH-001",
      name: "Classic Cotton T-Shirt",
      description: "Comfortable everyday cotton t-shirt",
      categoryId: categories[0].id,
      basePrice: 25.99,
      costPrice: 12.5,
      images: JSON.stringify(["/images/tshirt-1.jpg", "/images/tshirt-2.jpg"]),
      variants: {
        create: [
          { sku: "TSH-001-S-RED", size: "S", color: "Red", stock: 20, minStock: 5 },
          { sku: "TSH-001-M-RED", size: "M", color: "Red", stock: 25, minStock: 5 },
          { sku: "TSH-001-L-RED", size: "L", color: "Red", stock: 15, minStock: 5 },
          { sku: "TSH-001-S-BLUE", size: "S", color: "Blue", stock: 18, minStock: 5 },
          { sku: "TSH-001-M-BLUE", size: "M", color: "Blue", stock: 22, minStock: 5 },
          { sku: "TSH-001-L-BLUE", size: "L", color: "Blue", stock: 12, minStock: 5 },
        ],
      },
    },
  });
  products.push(tshirt);

  // Jeans
  const jeans = await prisma.product.create({
    data: {
      sku: "JEA-001",
      name: "Classic Denim Jeans",
      description: "Premium quality denim jeans",
      categoryId: categories[1].id,
      basePrice: 79.99,
      costPrice: 40.0,
      images: JSON.stringify(["/images/jeans-1.jpg"]),
      variants: {
        create: [
          { sku: "JEA-001-30-BLUE", size: "30", color: "Blue Denim", stock: 8, minStock: 3 },
          { sku: "JEA-001-32-BLUE", size: "32", color: "Blue Denim", stock: 12, minStock: 3 },
          { sku: "JEA-001-34-BLUE", size: "34", color: "Blue Denim", stock: 6, minStock: 3 },
          { sku: "JEA-001-36-BLUE", size: "36", color: "Blue Denim", stock: 4, minStock: 3 },
        ],
      },
    },
  });
  products.push(jeans);

  // Summer Dress
  const dress = await prisma.product.create({
    data: {
      sku: "DRS-001",
      name: "Floral Summer Dress",
      description: "Light and breezy summer dress",
      categoryId: categories[2].id,
      basePrice: 65.99,
      costPrice: 32.0,
      images: JSON.stringify(["/images/dress-1.jpg"]),
      variants: {
        create: [
          { sku: "DRS-001-S-FLORAL", size: "S", color: "Floral", stock: 0, minStock: 2 },
          { sku: "DRS-001-M-FLORAL", size: "M", color: "Floral", stock: 3, minStock: 2 },
          { sku: "DRS-001-L-FLORAL", size: "L", color: "Floral", stock: 5, minStock: 2 },
        ],
      },
    },
  });
  products.push(dress);

  // Leather Belt
  const belt = await prisma.product.create({
    data: {
      sku: "BLT-001",
      name: "Genuine Leather Belt",
      description: "Premium leather belt with metal buckle",
      categoryId: categories[3].id,
      basePrice: 45.99,
      costPrice: 22.5,
      variants: {
        create: [
          { sku: "BLT-001-S-BLACK", size: "S", color: "Black", stock: 15, minStock: 3 },
          { sku: "BLT-001-M-BLACK", size: "M", color: "Black", stock: 20, minStock: 3 },
          { sku: "BLT-001-L-BLACK", size: "L", color: "Black", stock: 12, minStock: 3 },
          { sku: "BLT-001-S-BROWN", size: "S", color: "Brown", stock: 10, minStock: 3 },
          { sku: "BLT-001-M-BROWN", size: "M", color: "Brown", stock: 18, minStock: 3 },
          { sku: "BLT-001-L-BROWN", size: "L", color: "Brown", stock: 8, minStock: 3 },
        ],
      },
    },
  });
  products.push(belt);

  console.log("✅ Products and variants created");

  // Create some sample orders
  const order1 = await prisma.order.create({
    data: {
      orderNumber: "ORD-2024-001",
      customerId: customers[0].id,
      userId: adminUser.id,
      status: "COMPLETED",
      orderType: "RETAIL",
      subtotal: 105.98,
      discount: 5,
      discountType: "PERCENTAGE",
      tax: 8.5,
      total: 109.18,
      items: {
        create: [
          {
            productId: tshirt.id,
            productVariantId: (
              await prisma.productVariant.findFirst({
                where: { productId: tshirt.id, size: "M", color: "Red" },
              })
            )?.id,
            quantity: 2,
            unitPrice: 25.99,
            totalPrice: 51.98,
          },
          {
            productId: jeans.id,
            productVariantId: (
              await prisma.productVariant.findFirst({
                where: { productId: jeans.id, size: "32" },
              })
            )?.id,
            quantity: 1,
            unitPrice: 79.99,
            totalPrice: 79.99,
          },
        ],
      },
    },
  });

  // Update customer totals
  await prisma.customer.update({
    where: { id: customers[0].id },
    data: {
      totalOrders: 1,
      totalSpent: 109.18,
    },
  });

  console.log("✅ Sample orders created");

  // Create system settings
  await Promise.all([
    prisma.setting.upsert({
      where: { key: "store_name" },
      update: { value: "Klova Store" },
      create: {
        key: "store_name",
        value: "Klova Store",
        type: "string",
      },
    }),
    prisma.setting.upsert({
      where: { key: "default_tax_rate" },
      update: { value: "8.5" },
      create: {
        key: "default_tax_rate",
        value: "8.5",
        type: "number",
      },
    }),
    prisma.setting.upsert({
      where: { key: "whatsapp_enabled" },
      update: { value: "true" },
      create: {
        key: "whatsapp_enabled",
        value: "true",
        type: "boolean",
      },
    }),
  ]);

  console.log("✅ Settings created");
  console.log("🎉 Database seeded successfully!");
  console.log("\n📊 Summary:");
  console.log(`- Categories: ${categories.length}`);
  console.log(`- Products: ${products.length}`);
  console.log(`- Customers: ${customers.length}`);
  console.log(`- Users: 1 (admin)`);
  console.log("\n🔐 Admin credentials:");
  console.log("Email: admin@klova.com");
  console.log("Password: admin123");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
