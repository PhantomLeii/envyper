import type {
Project,
CreateProject,
} from "@envyper/zod";

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getProjects = async (userId: bigint): Promise<Project[]|void> => {}

export const getProjectById = async (projectId: bigint): Promise<Project|void> => {}

export const createProject = async (data: CreateProject, userId: bigint): Promise<Project|void> => {}

export const updateProject = async (projectId: bigint, data: Partial<Project>): Promise<Project|void> => {}

export const deleteProject = async (projectId: bigint): Promise<void> => {}