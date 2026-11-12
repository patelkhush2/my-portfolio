import nextMDX from "@next/mdx";
// Optional but recommended for linkable headings like Raphael's
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/webp"] },
  pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
  },
});

export default withMDX(nextConfig);
