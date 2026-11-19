import { Footer } from "@/components/footer";
import Link from "@/components/link";
import * as FadeIn from "@/components/motion/staggers/fade";

import NextLink from "next/link";

import ImagesGrid from "./image-grid";
import LiveStatus from "./live-status";

const Spacer = () => <div style={{ marginTop: "24px" }} />;

type Project = {
  slug: string;
  title: string;
  image: string;
  description: string;
};

export default function Home({ projects }: { projects: Project[] }) {
  return (
    <FadeIn.Container>
      <FadeIn.Item>
        <div className="flex items-stretch justify-between gap-3">
          <div className="shrink-0">
            <h1 className="whitespace-nowrap">Khush Patel</h1>
            <h2>Designer</h2>
          </div>
          <div className="flex min-h-0 min-w-0 flex-1 flex-col self-stretch md:w-auto md:flex-none md:self-start">
            <LiveStatus />
          </div>
        </div>
      </FadeIn.Item>
      <Spacer />
      <FadeIn.Item>
        <p>I’m a designer working across web and product. I like taking early ideas and making them into clear, distinct and real experiences.</p>
      </FadeIn.Item>
      <FadeIn.Item>
        <div className="mt-6">
          <Link
            href="https://cal.com/khush-patel/30min"
            text="Book a Call"
            className="inline-flex items-center justify-center rounded-[30px] bg-[#000] px-[15px] py-[10px] text-[12px] text-[#fff] leading-[150%] hover:opacity-100"
          />
        </div>
      </FadeIn.Item>
      <FadeIn.Item>
        <ImagesGrid projects={projects} /> {/* 👈 Pass it down */}
      </FadeIn.Item>
      <FadeIn.Item>
        <div className="border-border border-t pb-10">
          <NextLink href="/case-studies" className="flex items-center justify-between gap-6 border-border border-b py-3">
            <span>Case Studies</span>
          </NextLink>
        </div>
      </FadeIn.Item>

      <Spacer />
      <FadeIn.Item>
        <Footer />
      </FadeIn.Item>
    </FadeIn.Container>
  );
}
