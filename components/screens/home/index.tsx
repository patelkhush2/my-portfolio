import { Footer } from "@/components/footer";
import * as FadeIn from "@/components/motion/staggers/fade";

import ImagesGrid from "./image-grid";

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
        <div className="flex justify-between">
          <div>
            <h1>Khush Patel</h1>
            <h2>Product Design</h2>
          </div>
        </div>
      </FadeIn.Item>
      <Spacer />
      <FadeIn.Item>
        <p>
          Based from Toronto, holds a passion for blending design & development. Specializing in Brand, Product, Web whilst focusing on Human-Computer
          Interaction to generate innovative experiences.
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
