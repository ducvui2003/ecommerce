import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedProducts() {
  for (let i = 1; i <= 10; i++) {
    await prisma.product.create({
      data: {
        name: `Product ${i}`,
        description: `Description for product ${i}`,
        basePrice: 10000 * i,
        salePrice: 8000 * i,
        category: {
          connectOrCreate: {
            where: { id: i},
            create: { id: i, name: `Category ${i}` },
          },
        },
        supplier: {
          connectOrCreate: {
            where: { id: i },
            create: {
              id: i,
              name: `Supplier ${i}`,
              email: `supplier${i}@example.com`,
              phone: `012345678${i}`,
              country: 'Vietnam',
              website: `https://supplier${i}.com`,
              addressId: i, // giả sử cũng trùng i luôn cho nhanh
            },
          },
        },
      },
    });
  }
}

seedProducts()
  .then(() => {
    console.log('Seeding completed.');
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error(error);
    prisma.$disconnect();
    process.exit(1);
  });
