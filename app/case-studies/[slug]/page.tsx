import type { Metadata } from "next";

import { notFound } from "next/navigation";

import CaseStudy from "../case-study";
import { studies } from "../content";

export function generateStaticParams() {
  return studies.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const study = studies.find(({ slug }) => slug === params.slug);
  return { title: study ? `${study.name} — Khush Patel` : "Case Study" };
}

export default function Page({ params }: { params: { slug: string } }) {
  const index = studies.findIndex(({ slug }) => slug === params.slug);
  if (index < 0) notFound();
  return <CaseStudy study={studies[index]} />;
}
