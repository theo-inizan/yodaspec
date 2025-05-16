import { createProject } from '@/actions/project-actions'
import CreateProjectDialog from '@/components/dialogs/create_project_dialog'
import { ProjectsListSkeleton } from '@/skeletons/project-card-skeleton'

function Loading (): React.ReactNode {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center'>
        <CreateProjectDialog createProject={createProject} />
        <ProjectsListSkeleton />
      </main>
    </div>
  )
}

export default Loading
