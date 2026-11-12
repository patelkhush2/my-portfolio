"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useReducedMotion } from "framer-motion";
import Image, { getImageProps } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Slide = { src: string; label: string; canvas?: boolean };

function optimizedImage(slide: Slide) {
  return getImageProps({ src: slide.src, alt: slide.label, width: 1920, height: 1080, quality: 85, sizes: "(max-width: 768px) calc(100vw - 96px), 624px" })
    .props;
}

export default function Gallery({ slides, label }: { slides: Slide[]; label: string }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
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
        image.style.inset = slides[next].canvas === false ? "0" : "8%";
        image.style.width = slides[next].canvas === false ? "100%" : "84%";
        image.style.height = slides[next].canvas === false ? "100%" : "84%";
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
  useEffect(() => {
    if (!visible || !playing || hovered || focused || open || reducedMotion || slides.length < 2) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) void move(1);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [visible, playing, hovered, focused, open, reducedMotion, slides.length, move]);
  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => {
      const neighbor = slides[(active + 1) % slides.length];
      if (neighbor) {
        const image = new window.Image();
        const optimized = optimizedImage(neighbor);
        image.sizes = optimized.sizes || "";
        image.srcset = optimized.srcSet || "";
        image.src = optimized.src;
        image.decoding = "async";
        void image.decode().catch(() => {});
      }
    }, 150);
    return () => window.clearTimeout(timer);
  }, [active, slides, visible]);
  const slide = slides[active];
  if (!slide) return null;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <section
        ref={container}
        className="my-6"
        aria-roledescription="carousel"
        aria-label={label}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
        }}
      >
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
                    inset: slides[0].canvas === false ? "0" : "8%",
                    width: slides[0].canvas === false ? "100%" : "84%",
                    height: slides[0].canvas === false ? "100%" : "84%",
                  }}
                />
              ))}
            </button>
          </Dialog.Trigger>
        </div>
        <div className="mt-2 flex items-center justify-end gap-3">
          <span className="sr-only" aria-live={playing && !hovered && !focused && !open ? "off" : "polite"} aria-atomic="true">
            {active + 1} / {slides.length} · {slide.label}
          </span>
          <div className="flex shrink-0 gap-2">
            {!reducedMotion && (
              <button
                type="button"
                onClick={() => setPlaying((current) => !current)}
                aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                aria-pressed={!playing}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-gray-3 focus-visible:outline focus-visible:outline-2"
              >
                {playing ? "Ⅱ" : "▶"}
              </button>
            )}
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
        <Dialog.Content
          aria-describedby={undefined}
          className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 z-50 max-h-[90vh] w-[90vw] max-w-7xl rounded-lg bg-background p-4 focus:outline-none"
        >
          <Dialog.Title className="sr-only">{slide.label}</Dialog.Title>
          <Dialog.Close
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground"
            aria-label="Close enlarged image"
          >
            ×
          </Dialog.Close>
          <Image
            src={slide.src}
            alt={slide.label}
            width={1920}
            height={1080}
            sizes="(max-width: 1422px) 90vw, 1280px"
            quality={85}
            className="mx-auto block max-h-[85vh] w-auto max-w-full object-contain"
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
