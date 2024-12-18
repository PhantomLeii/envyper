import { describe, it, expect, beforeAll, afterAll } from 'bun:test'
import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'

import {
getProjects,
getProjectById,
createProject,
updateProject,
deleteProject,
} from '../projects'

const prisma = new PrismaClient()

describe('Projects', () => {
  let testUserId: bigint

  
  beforeAll(async () => {
    execSync('bunx prisma migrate reset --schema src/prisma/schema.prisma --force')
    await prisma.$connect()

    // create test user
    const testUser = await prisma.user.create({
      data: {
        userId: 'test-user'
      }
    })

    testUserId = testUser.id
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should create a project', async () => {
    const project = await createProject({
      name: 'Test Project',
      description: 'Test Description',
      creatorId: testUserId,
    })

    const newProject = await prisma.project.findUnique({
      where: {
        id: 1
      }
    })

    expect(newProject).toBeDefined()
  })

  it('should get a project by id', async () => {
    const foundProject = await getProjectById(BigInt(1))
    expect(foundProject).toBeDefined()
  })

  it('should get all projects', async () => {
    const projects = await getProjects(testUserId)
    expect(projects).toBeDefined()
  })

  it('should update a project', async () => {
    const updatedProject = await updateProject(BigInt(1), {
      name: 'Updated Project',
      description: 'Updated Description',
    })

    const updatedRecord = await prisma.project.findUnique({
      where: {
        id: 1
      }
    })

    expect(updatedProject?.name).toBe(updatedRecord?.name as string)
  })

  it('should delete a project', async () => {
    await deleteProject(BigInt(1))

    const record = await prisma.project.findUnique({
      where: {
        id: 1
      }
    })

    expect(record).toBeNull()
  })
  
})