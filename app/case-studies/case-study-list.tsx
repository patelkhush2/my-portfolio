import Link from "next/link";

import { visibleStudies } from "./content";

// The shared list of visible case studies: name on the left, year on the right, thin dividers.
export function CaseStudyList({ className = "" }: { className?: string }) {
  return (
    <div className={`border-border border-t ${className}`.trim()}>
      {visibleStudies.map((study) => (
        <Link href={`/case-studies/${study.slug}`} key={study.slug} className="flex items-center justify-between gap-6 border-border border-b py-3">
          <span>{study.name}</span>
          <span className="text-gray-10">{study.year}</span>
        </Link>
      ))}
    </div>
  );
}
