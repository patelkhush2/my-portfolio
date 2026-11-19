import * as FadeIn from "@/components/motion/staggers/fade";

import { CaseStudyList } from "./case-study-list";

export default function Page() {
  return (
    <FadeIn.Container className="mx-auto max-w-3xl space-y-6 p-6">
      <FadeIn.Item>
        <a href="/" className="block text-gray-500 text-sm hover:underline">
          ← Back
        </a>
      </FadeIn.Item>
      <FadeIn.Item>
        <h1>Case Studies</h1>
      </FadeIn.Item>
      <FadeIn.Item>
        <CaseStudyList />
      </FadeIn.Item>
    </FadeIn.Container>
  );
}
