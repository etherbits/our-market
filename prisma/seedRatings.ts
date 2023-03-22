import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const maxRatingsPerProduct = 8;

const seedRatings = async () => {
  try {
    const products = await prisma.product.findMany();

    for (let i = 0; i < products.length; i++) {
      const productId = products[i]?.id;
      for (let j = 0; j < getRandomNumber(0, maxRatingsPerProduct); j++) {
        await prisma.rating.create({
          data: {
            rating: faker.datatype.float({ max: 10 }),
            title: faker.lorem.sentence(),
            message: faker.lorem.paragraphs(1 + getRandomNumber(0, 3)),
            product: {
              connect: {
                id: productId,
              },
            },
            user: {
              connectOrCreate: {
                where: {
                  email: faker.internet.email(),
                },
                create: {
                  name: faker.name.fullName(),
                  image: faker.image.avatar(),
                  number: faker.phone.number(),
                },
              },
            },
          },
        });
      }
    }
  } catch (err) {
    throw err;
  }
};

export default seedRatings;
