"use client";

import React from "react";

interface MDXVideoProps {
  src: string;
  poster?: string;
  alt?: string;
  caption?: string;
}

export default function MDXVideo({ src, poster, caption }: MDXVideoProps) {
  return (
    <div className="my-6 flex flex-col justify-end gap-2">
      <div className="relative h-full w-full overflow-hidden rounded-large border border-border">
        <video
          src={src}
          poster={poster}
          playsInline
          loop
          muted
          autoPlay
          className="h-auto w-full object-contain"
          style={{ objectFit: "contain" }}
        >
          <track kind="captions" />
        </video>
      </div>
      {caption && <sub className="pt-2 text-center">{caption}</sub>}
    </div>
  );
}
