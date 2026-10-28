import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProject, projects } from '../data/projects'
import ProjectDetails from '../components/ProjectDetails'
import NotFound from './NotFound'

export default function ProjectPage() {
  const { slug = '' } = useParams()
  const project = getProject(slug)

  useEffect(() => {
    if (project) document.title = `${project.name} case study | Asumanii`
    return () => {
      document.title = 'Asumanii | Athman Rajab Suba, Software Developer in Kenya'
    }
  }, [project])

  if (!project) return <NotFound />
  const next = projects[(projects.indexOf(project) + 1) % projects.length]
  return <ProjectDetails project={project} next={next} />
}
