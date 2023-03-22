import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { getPlaiceholder } from "plaiceholder";
const prisma = new PrismaClient();

const productCount = 50;

const seedProducts = async () => {
  try {
    for (let i = 0; i < productCount; i++) {
      const productTitle = faker.commerce.productName();
      const categoryName = faker.commerce.product();
      const image = faker.image.abstract(1160, 870, true);
      const smallImage: string = await getPlaiceholder(image).then(
        ({ base64 }) => base64
      );
      await prisma.product.upsert({
        where: {
          title: productTitle,
        },
        create: {
          title: productTitle,
          description:
            faker.commerce.productDescription() +
            "\n\n" +
            faker.lorem.paragraphs(4, "\n\n"),
          price: faker.commerce.price(),
          quantity: faker.datatype.number({ min: 0, max: 100 }),
          image: image,
          smallImage: smallImage,
          createdAt: faker.datatype.datetime({ min: 1577836800000 }),
          category: {
            connectOrCreate: {
              where: {
                name: categoryName,
              },
              create: {
                name: categoryName,
                createdAt: faker.datatype.datetime({ min: 1577836800000 }),
              },
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
        update: {},
      });
    }
  } catch (err) {
    throw err;
  }
};

export default seedProducts;
