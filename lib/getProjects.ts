import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type Project = {
  slug: string
  title: string
  description: string
  image: string
}

export function getAllProjects(): Project[] {
  const dir = path.join(process.cwd(), 'content/projects')
  const files = fs.readdirSync(dir)

  return files.map((file) => {
    const slug = file.replace(/\.mdx$/, '')
    const filePath = path.join(dir, file)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)

    return {
      slug,
      title: data.title,
      description: data.description,
      image: data.image,
    }
  })
}