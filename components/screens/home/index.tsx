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
        I’m an independent designer working across web, product, and identity.

I’m drawn to ideas that are still taking shape - figuring out what they should become, how they should feel, and how people should experience them.

My work moves between concept, systems, interaction, and visual direction to make those ideas clear, distinct, and real.
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
