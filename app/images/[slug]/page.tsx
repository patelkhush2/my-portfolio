import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { useMDXComponents } from '@/mdx-components'
import Image from 'next/image'
import * as FadeIn from '@/components/motion/staggers/fade'

export async function generateStaticParams() {
  const files = fs.readdirSync('content/projects')
  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, ''),
  }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'content/projects', `${params.slug}.mdx`)
  if (!fs.existsSync(filePath)) notFound()

  const raw = fs.readFileSync(filePath, 'utf8')
  const { content, data } = matter(raw)

  const components = useMDXComponents({})

  return (
    <FadeIn.Container className="p-6 space-y-6 max-w-3xl mx-auto">
      <FadeIn.Item>
        <a href="/" className="text-sm text-gray-500 hover:underline block">
          ← Back
        </a>
      </FadeIn.Item>

      <FadeIn.Item>
        <h1 className="text-4xl font-bold">{data.title}</h1>
      </FadeIn.Item>

      {data.image && (
        <FadeIn.Item>
          <Image
            src={data.image}
            alt={data.title}
            width={800}
            height={500}
            className="rounded-xl border border-border "
          />
        </FadeIn.Item>
      )}

      {data.description && (
        <FadeIn.Item>
          <p className="text-lg text-gray-600">{data.description}</p>
        </FadeIn.Item>
      )}

      <FadeIn.Item>
        <article className="prose max-w-none">
          <MDXRemote source={content} components={components} />
        </article>
      </FadeIn.Item>
    </FadeIn.Container>
  )
}