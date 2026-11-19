"use client";

import type { ImageProps } from "next/image";

import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

interface MDXImageProps extends ImageProps {
  alt: string;
  caption?: string;
}

export default function MDXImage({ caption, alt, ...props }: MDXImageProps) {
  const [isImageLoading, setImageLoading] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const href = props.src.toString();

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <motion.div className="my-6 flex cursor-pointer flex-col justify-end gap-2" whileHover={{ scale: 0.975, opacity: 0.9 }}>
          <div className="relative h-full w-full overflow-hidden rounded-large border border-border">
            <Image
              alt={alt}
              width={1000}
              height={1000}
              sizes="(max-width: 768px) calc(100vw - 96px), 624px"
              quality={85}
              draggable={false}
              style={{
                objectFit: "contain",
                width: "100%",
                height: "auto",
                objectPosition: "center",
                WebkitFilter: isImageLoading ? "blur(8px)" : "none",
                transition: "all 0.5s ease",
              }}
              onLoad={() => setImageLoading(false)}
              {...props}
            />
          </div>
          {caption && <sub className="pt-2 text-center">{caption}</sub>}
        </motion.div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity" />
        <Dialog.Content aria-describedby={undefined} className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 z-50 w-max focus:outline-none">
          <Dialog.Title className="sr-only">{alt}</Dialog.Title>
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
              alt={alt}
              src={href}
              width={0}
              height={0}
              sizes="min(98vw, 2048px)"
              quality={85}
              className="block object-contain"
              style={{ width: "min(calc(90vw - 7rem), 1840px, calc(88vh * 16 / 9))", height: "auto", aspectRatio: "16 / 9", objectFit: "contain" }}
            />
          </div>
          {caption && <div className="mt-4 text-center text-muted text-sm">{caption}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
