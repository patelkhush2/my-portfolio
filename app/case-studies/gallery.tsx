"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useReducedMotion } from "framer-motion";
import Image, { getImageProps } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Slide = { src: string; label: string; caption?: string; canvas?: boolean };

function optimizedImage(slide: Slide) {
  return getImageProps({ src: slide.src, alt: slide.label, width: 1920, height: 1080, quality: 85, sizes: "(max-width: 768px) calc(100vw - 96px), 624px" })
    .props;
}

// Every slide shares one fixed frame. Screens are pinned to the top so the nav bar never shifts between slides.
function frameStyle(slide: Slide) {
  const fill = slide.canvas === false;
  return {
    inset: fill ? "0" : "8%",
    width: fill ? "100%" : "84%",
    height: fill ? "100%" : "84%",
    objectPosition: slide.canvas === true ? "center" : "top",
  };
}

export default function Gallery({ slides, label }: { slides: Slide[]; label: string }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const container = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const touchStart = useRef<number | null>(null);
  const layers = useRef<[HTMLImageElement | null, HTMLImageElement | null]>([null, null]);
  const frontLayer = useRef(0);
  const transitioning = useRef(false);
  const move = useCallback(
    async (step: number) => {
      if (transitioning.current || slides.length < 2) return;
      const next = (active + step + slides.length) % slides.length;
      const back = 1 - frontLayer.current;
      const image = layers.current[back];
      const previous = layers.current[frontLayer.current];
      if (!image || !previous) return;
      transitioning.current = true;
      try {
        const optimized = optimizedImage(slides[next]);
        image.loading = "eager";
        image.sizes = optimized.sizes || "";
        image.srcset = optimized.srcSet || "";
        image.src = optimized.src;
        image.alt = slides[next].label;
        Object.assign(image.style, frameStyle(slides[next]));
        await image.decode();
        image.style.zIndex = "2";
        image.style.willChange = "opacity";
        if (!reducedMotion) {
          await image.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 200,
            easing: "linear",
          }).finished;
        }
        previous.style.zIndex = "0";
        image.style.zIndex = "1";
        frontLayer.current = back;
        setActive(next);
      } catch {
        image.style.zIndex = "0";
      } finally {
        image.style.willChange = "auto";
        transitioning.current = false;
      }
    },
    [active, reducedMotion, slides],
  );
  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  // Warm every slide (both sizes) once the gallery is on screen, so swiping never waits on a download.
  useEffect(() => {
    if (!visible) return;
    const warm = slides.map((item) => {
      const image = new window.Image();
      const optimized = optimizedImage(item);
      image.sizes = optimized.sizes || "";
      image.srcset = optimized.srcSet || "";
      image.src = optimized.src;
      image.decoding = "async";
      void image.decode().catch(() => {});
      return image;
    });
    return () => {
      warm.length = 0;
    };
  }, [slides, visible]);
  const slide = slides[active];
  if (!slide) return null;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <section ref={container} className="my-6" aria-roledescription="carousel" aria-label={label}>
        <div
          className="relative aspect-video w-full overflow-hidden rounded-large border border-border bg-white"
          style={{ touchAction: "pan-y", contain: "layout paint", isolation: "isolate" }}
          onTouchStart={(event) => {
            touchStart.current = event.touches[0].clientX;
          }}
          onTouchEnd={(event) => {
            if (touchStart.current === null) return;
            const distance = event.changedTouches[0].clientX - touchStart.current;
            if (Math.abs(distance) > 40) move(distance < 0 ? 1 : -1);
            touchStart.current = null;
          }}
          onTouchCancel={() => {
            touchStart.current = null;
          }}
        >
          <Dialog.Trigger asChild>
            <button
              type="button"
              aria-label={`Enlarge ${slide.label}`}
              className="absolute inset-0 block h-full w-full cursor-zoom-in focus-visible:outline focus-visible:outline-2"
            >
              {[0, 1].map((layer) => (
                <img
                  {...optimizedImage(slides[0])}
                  alt={slides[0].label}
                  key={layer}
                  ref={(element) => {
                    layers.current[layer] = element;
                  }}
                  aria-hidden="true"
                  draggable={false}
                  className="absolute block object-contain"
                  style={{
                    zIndex: layer === 0 ? 1 : 0,
                    ...frameStyle(slides[0]),
                  }}
                />
              ))}
            </button>
          </Dialog.Trigger>
        </div>
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="min-w-0 truncate text-gray-10 text-sm" aria-live="polite" aria-atomic="true">
            <span className="tabular-nums">
              {active + 1}/{slides.length}
            </span>
            <span className="ml-3">{slide.caption ?? slide.label}</span>
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label={`Previous image in ${label}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-gray-3 focus-visible:outline focus-visible:outline-2"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label={`Next image in ${label}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-gray-3 focus-visible:outline focus-visible:outline-2"
            >
              →
            </button>
          </div>
        </div>
      </section>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity" />
        <Dialog.Content aria-describedby={undefined} className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 z-50 w-max focus:outline-none">
          <Dialog.Title className="sr-only">{slide.label}</Dialog.Title>
          <Dialog.Close asChild>
            <button
              type="button"
              className="-right-12 absolute top-0 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground transition-colors hover:bg-background"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </Dialog.Close>
          <div className="relative">
            <Image
              alt={slide.label}
              src={slide.src}
              width={0}
              height={0}
              sizes="min(98vw, 2048px)"
              quality={85}
              className="block object-contain"
              style={{ width: "min(calc(90vw - 7rem), 1840px, calc(88vh * 16 / 9))", height: "auto", aspectRatio: "16 / 9", objectFit: "contain" }}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
