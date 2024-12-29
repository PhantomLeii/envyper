import { execSync } from "child_process";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  runMigration();
  await createTestUser("test-user");
};

const runMigration = () => {
  execSync("npm run migrate:reset -w @envyper/orm", {
    stdio: "inherit",
  });
};

const createTestUser = async (userId: string) => {
  await prisma.user.create({
    data: {
      clerkUserId: userId,
      email: "testuser@email.com",
    },
  });

  console.log(`User: ${userId} created successfully`);
};

await main();
