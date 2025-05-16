import Project from '@/db/models/Projects'
import { IProject } from '@/types/interface'
import { connect, disconnect } from '@/lib/db'
import { revalidatePath } from 'next/cache'

const createProject = async (project: IProject): Promise<void> => {
  'use server'
  await connect()
  const _project = new Project(project)
  await _project.save()
  revalidatePath('/')
  await disconnect()
}

export {
  createProject
}
