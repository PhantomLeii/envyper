import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  await createTestUser();
};

const createTestUser = async () => {
  await prisma.user.create({
    data: {
      userId: "test-user",
    },
  });
};

main();
