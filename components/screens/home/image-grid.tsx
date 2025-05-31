"use client";

import Image from "next/image";
import Link from "next/link";

type Project = {
  slug: string;
  title: string;
  image: string;
  description: string;
};

export default function ImagesGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 py-10 sm:grid-cols-2 lg:grid-cols-2">
      {projects.map((project) => (
        <Link href={`/images/${project.slug}`} key={project.slug}>
          <div className="group relative cursor-pointer overflow-hidden rounded-xl border border-border">
            <Image src={project.image} alt={project.title} width={800} height={600} className="h-full w-full rounded-2xl object-cover" />
          </div>
        </Link>
      ))}
    </div>
  );
}
