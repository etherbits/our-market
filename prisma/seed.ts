import seedProducts from "./seedProducts";
import seedRatings from "./seedRatings";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  await prisma.rating.deleteMany();
  await prisma.category.deleteMany();
  await prisma.product.deleteMany();

  await seedProducts().catch((err) => {
    throw err;
  });

  await seedRatings().catch((err) => {
    throw err;
  });
};

seed().catch((err) => {
  console.log(err);
});
