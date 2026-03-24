// app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { projects } from '@/lib/projects'
import { ProjectDetail } from '@/components/project-detail'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  // Safe to map because it's a standard JS array
  return projects.map((project) => ({
    slug: project.id,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const project = projects.find((p) => p.id === slug)
  
  if (!project) {
    return { title: 'Project Not Found' }
  }

  return {
    title: `${project.name} | Abiola Onasanya`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = projects.find((p) => p.id === slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetail project={project} />
}