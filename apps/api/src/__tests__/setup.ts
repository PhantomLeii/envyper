import { beforeAll, afterAll } from "bun:test";
import { execSync } from "child_process";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  console.log("Running migrations:", Bun.env.DATABASE_URL);
  runMigration();
};

afterAll(async () => {
  await prisma.$disconnect();
});

const runMigration = () => {
  execSync("npm run migrate:reset -w @envyper/orm", {
    stdio: "inherit",
  });
};

main();
