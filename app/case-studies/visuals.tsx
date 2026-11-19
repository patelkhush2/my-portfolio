import type { Diagram } from "./galleries";

import Image from "next/image";
import { Fragment } from "react";

type Slide = { src: string; label: string; caption?: string };

const sizes = "(max-width: 768px) calc(100vw - 96px), 624px";

// A single screen in the same fixed, top-pinned frame the slideshow uses.
export function Figure({ slide }: { slide: Slide }) {
  return (
    <div className="my-6">
      <div className="relative aspect-video w-full overflow-hidden rounded-large border border-border bg-white">
        <div className="absolute inset-[8%]">
          <Image src={slide.src} alt={slide.label} fill sizes={sizes} quality={85} className="object-contain object-top" />
        </div>
      </div>
      <div className="mt-2 text-gray-10 text-sm">{slide.caption ?? slide.label}</div>
    </div>
  );
}

// One large screen with a second screen overlapping its lower right corner.
export function Hero({ slides, label }: { slides: Slide[]; label: string }) {
  const [main, detail] = slides;
  if (!main) return null;
  return (
    <div className="my-6">
      <div className="relative pb-[14%]">
        <div className="relative aspect-video w-[86%] overflow-hidden rounded-large border border-border">
          <Image src={main.src} alt={main.label} fill sizes={sizes} quality={85} priority className="object-cover object-top" />
        </div>
        {detail ? (
          <div className="absolute right-0 bottom-0 aspect-video w-[52%] overflow-hidden rounded-large border border-border shadow-xl">
            <Image src={detail.src} alt={detail.label} fill sizes="(max-width: 768px) 50vw, 330px" quality={85} className="object-cover object-top" />
          </div>
        ) : null}
      </div>
      <div className="mt-2 text-gray-10 text-sm">{label}</div>
    </div>
  );
}

// Editorial step diagram: labelled steps joined by thin arrows, stacked on mobile.
export function Flow({ diagram }: { diagram: Diagram }) {
  return (
    <section className="my-6" aria-label={diagram.label}>
      <div className="flex flex-col gap-3 rounded-large border border-border p-5 sm:flex-row sm:items-start sm:gap-4">
        {diagram.steps.map((step, index) => (
          <Fragment key={step.label}>
            {index > 0 ? (
              <div aria-hidden="true" className={`shrink-0 text-gray-8 text-sm leading-none ${step.src ? "sm:mt-[11%]" : "sm:mt-6"}`}>
                <span className="sm:hidden">↓</span>
                <span className="hidden sm:inline">→</span>
              </div>
            ) : null}
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              {step.src ? (
                <div className="relative mb-2 aspect-video w-full overflow-hidden rounded-base border border-border">
                  <Image src={step.src} alt="" fill sizes="(max-width: 640px) calc(100vw - 96px), 200px" quality={80} className="object-cover object-top" />
                </div>
              ) : null}
              <div className="text-gray-10 text-small tabular-nums">{String(index + 1).padStart(2, "0")}</div>
              <div className="text-gray-12 text-sm">{step.label}</div>
              <div className="text-gray-10 text-sm">{step.note}</div>
            </div>
          </Fragment>
        ))}
      </div>
      <div className="mt-2 text-gray-10 text-sm">{diagram.caption}</div>
    </section>
  );
}
