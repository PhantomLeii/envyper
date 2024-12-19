import { execSync } from "child_process";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  console.log("Setting up test env...\n");
  runMigration();
  await createTestUser();
};

const runMigration = () => {
  execSync("npm run migrate -w @envyper/orm");
  console.log("Migration ran successfully");
};

const createTestUser = async () => {
  await prisma.$connect();
  console.log("Database connected...");

  await prisma.user.create({
    data: {
      userId: "test-user",
    },
  });

  console.log("Test user created...\n");
};

const startTestServer = () => {
  execSync("bun dev");
  console.log("Test server started...");
};

main();
