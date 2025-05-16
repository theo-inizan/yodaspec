'use client'
import { Textarea } from '../ui/textarea'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IProject } from '@/types/interface'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'

function CreateProjectDialog ({
  createProject
}: Readonly<{
  createProject: (project: IProject) => Promise<void>
}>): React.ReactNode {
  const [projectData, setProjectData] = useState<IProject>({
    title: '',
    description: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await createProject(projectData)
      toast.success('Projet créé avec succès')
    } catch (error) {
      toast.error(`Une erreur est survenue lors de la création du projet: ${String(error)}`)
    }
    setIsLoading(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Créer un projet</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Créer un projet</DialogTitle>
          <DialogDescription>
            Remplissez les champs ci-dessous pour créer un nouveau projet.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => { void handleSubmit(e) }}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Titre
              </Label>
              <Input
                id='name'
                value={projectData.title}
                onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='username' className='text-right'>
                Description
              </Label>
              <Textarea
                id='username'
                value={projectData.description}
                onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                className='col-span-3'
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type='submit'
              className='cursor-pointer'
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className='w-4 h-4 mr-2 animate-spin' /> : null}
              Créer le projet
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateProjectDialog
