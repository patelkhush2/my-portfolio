import type { Study } from "./content";

import * as FadeIn from "@/components/motion/staggers/fade";

import fs from "node:fs";
import path from "node:path";

import { MDXRemote } from "next-mdx-remote/rsc";

import { Media } from "./components";
import Gallery from "./gallery";
import { parseCaseStudy } from "./structure";
import { Figure, Hero } from "./visuals";

export default function CaseStudy({ study }: { study: Study }) {
  const source = fs.readFileSync(path.join(process.cwd(), "content/case-studies", `${study.slug}.mdx`), "utf8");
  const sections = parseCaseStudy(source);
  const components = {
    Gallery: ({ name }: { name: string }) => {
      const gallery = study.galleries[name];
      if (!gallery) throw new Error(`Unknown gallery ${name} in ${study.slug}.`);
      return <Gallery slides={gallery.slides} label={gallery.label} />;
    },
    Hero: ({ name }: { name: string }) => {
      const gallery = study.galleries[name];
      if (!gallery) throw new Error(`Unknown hero ${name} in ${study.slug}.`);
      return <Hero slides={gallery.slides} label={gallery.label} />;
    },
    Figure: ({ name }: { name: string }) => {
      const slide = study.galleries[name]?.slides[0];
      if (!slide) throw new Error(`Unknown figure ${name} in ${study.slug}.`);
      return <Figure slide={slide} />;
    },
    Media: ({ name }: { name: string }) => {
      const asset = study.media[name];
      if (!asset) throw new Error(`Unknown media ${name} in ${study.slug}.`);
      return <Media asset={asset} />;
    },
    strong: ({ children }: { children?: React.ReactNode }) => <strong className="font-normal">{children}</strong>,
  };
  return (
    <FadeIn.Container className="mx-auto max-w-3xl space-y-6 p-6">
      <FadeIn.Item>
        <a href="/case-studies" className="block text-gray-500 text-sm hover:underline">
          ← Back
        </a>
      </FadeIn.Item>
      <FadeIn.Item>
        <Media asset={study.cover} banner />
      </FadeIn.Item>
      <FadeIn.Item>
        <h1 className="text-lg">{study.name}</h1>
      </FadeIn.Item>
      <FadeIn.Item>
        <article className="prose max-w-none space-y-6">
          {sections.map((section) => (
            <section id={section.id} key={section.id}>
              <h2>
                {section.number} / {section.title}
              </h2>
              <MDXRemote source={section.body} components={components} />
            </section>
          ))}
          <p>
            <a href="/case-studies">← All Case Studies</a>
          </p>
        </article>
      </FadeIn.Item>
    </FadeIn.Container>
  );
}
