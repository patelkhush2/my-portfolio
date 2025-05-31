import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const projectsPath = path.join(process.cwd(), 'content/projects')

export function getAllProjects() {
  const files = fs.readdirSync(projectsPath)

  return files.map((filename) => {
    const fullPath = path.join(projectsPath, filename)
    const raw = fs.readFileSync(fullPath, 'utf-8')
    const { data } = matter(raw)
    return {
      slug: filename.replace(/\.mdx$/, ''),
      ...data,
    }
  })
}