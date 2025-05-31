import Home from '@/components/screens/home'
import { getAllProjects } from '@/lib/getProjects'

export default function Page() {
  const projects = getAllProjects()
  return <Home projects={projects} />
}