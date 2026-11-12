import type { Asset } from "./content";

import MDXImage from "@/components/image";
import MDXVideo from "@/components/video";

import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

export function Media({ asset, banner = false }: { asset: Asset; banner?: boolean }) {
  const extension = asset.video ? "mp4" : "webp";
  const replacement = `/images/case-studies/${asset.id}.${extension}`;
  const src = fs.existsSync(path.join(process.cwd(), "public", replacement)) ? replacement : asset.src;
  if (banner && src && !asset.video) {
    return (
      <div className="my-6 flex flex-col justify-end gap-2">
        <div className="relative h-full w-full overflow-hidden rounded-large border border-border">
          <Image
            src={src}
            alt={asset.title}
            width={1920}
            height={1080}
            sizes="(max-width: 768px) calc(100vw - 96px), 624px"
            quality={85}
            priority
            className="block h-auto w-full"
          />
        </div>
      </div>
    );
  }
  return (
    <div>
      {src ? (
        asset.video ? (
          <MDXVideo src={src} caption={asset.title} />
        ) : (
          <MDXImage src={src} alt={asset.title} width={1000} height={1000} />
        )
      ) : (
        <div className="my-6 flex flex-col justify-end gap-2">
          <div className="relative h-full w-full overflow-hidden rounded-large border border-border">
            <p>
              {asset.video ? "Video placeholder" : "Image placeholder"} — {asset.title}
            </p>
            <p>{asset.format}</p>
          </div>
        </div>
      )}
    </div>
  );
}
