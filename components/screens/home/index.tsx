import { Footer } from "@/components/footer";
import * as FadeIn from "@/components/motion/staggers/fade";

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
        <p>
          I’m a designer with a background in computer science, curious about how systems shape human experience. I design across brand, product, and
          web-bridging together with development. I enjoy immersing in design that solves problems in intuitive ways focusing on clarity and interaction.
        </p>
      </FadeIn.Item>
      <FadeIn.Item>
        <ImagesGrid projects={projects} /> {/* 👈 Pass it down */}
      </FadeIn.Item>

      <Spacer />
      <FadeIn.Item>
        <Footer />
      </FadeIn.Item>
    </FadeIn.Container>
  );
}
