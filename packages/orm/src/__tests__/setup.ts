import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'

const prisma = new PrismaClient()

export const main = async (): Promise<void> => {
  console.log('Setting up test environment...')
  console.log(`Using Test Database: ${Bun.env.DATABASE_URL}`)
  await createTestUser();
}

export const createTestUser = async () => {
  execSync('bunx prisma migrate reset --schema src/prisma/schema.prisma --force')

  // create test user
  await prisma.user.create({
    data: {
      userId: 'test-user'
    }
  })
}

main();