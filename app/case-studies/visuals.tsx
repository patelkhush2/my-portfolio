import Image from "next/image";

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
