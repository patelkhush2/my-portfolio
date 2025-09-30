import Home from '@/components/screens/home'
import { getAllProjects } from '@/lib/getProjects'

export default async function Page() {
  const projects = await getAllProjects()
  return <Home projects={projects} />
}