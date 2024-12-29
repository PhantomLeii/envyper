import { afterAll } from "bun:test";
import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";

const prisma = new PrismaClient();

export const main = async (): Promise<void> => {
  console.log("Setting up test environment...");
  await createTestUser();

  afterAll(async () => {
    await prisma.$disconnect();
  });
};

export const createTestUser = async () => {
  execSync(
    "bunx prisma migrate reset --schema src/prisma/schema.prisma --force",
  );

  // create test user
  await prisma.user.create({
    data: {
      clerkUserId: "test-user",
      email: "test@orm.com",
    },
  });
};

main();
