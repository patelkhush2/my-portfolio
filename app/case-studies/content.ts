import { spotsGalleries } from "./galleries";

export type Asset = { id: string; title: string; instruction: string; format: string; src?: string; video?: boolean };
export type Study = {
  slug: string;
  name: string;
  year: number;
  headline: string;
  summary: string;
  cover: Asset;
  galleries: Record<string, { label: string; slides: { src: string; label: string; caption?: string; canvas?: boolean }[] }>;
  media: Record<string, Asset>;
  hidden?: boolean;
};

export const studies: Study[] = [
  {
    slug: "spots",
    name: "Spots",
    year: 2026,
    headline: "From inspiration to itinerary.",
    summary: "Sole Product Designer · NYC Startup · Ongoing Product Work",
    cover: {
      id: "spots-overview",
      title: "Spots Cover",
      src: "/images/spots/spots-cover.png",
      format: "PNG · 1920 × 1080 supported",
      instruction: "Uses public/images/spots/spots-cover.png. Replace this file to update the cover.",
    },
    galleries: spotsGalleries,
    media: {},
  },
  {
    slug: "forma",
    name: "Forma",
    hidden: true,
    year: 2026,
    headline: "AI assistance. A deliberate edit.",
    summary: "AI Interaction · Scope, Preview, Apply",
    cover: {
      id: "forma-overview",
      title: "Forma Cover",
      src: "/images/forma/FORMA_Cover.png",
      format: "Existing PNG",
      instruction: "Uses public/images/forma/FORMA_Cover.png.",
    },
    galleries: {},
    media: {
      scope: {
        id: "forma-variations",
        title: "Selected Text Versus Full Note",
        format: "PNG or WebP · 1920 × 1080 supported",
        instruction:
          "Export two actual prototype states of the same note: selected text and full-note scope. Annotate the active scope and action trigger. Mark an undesigned state as proposed.",
      },
      preview: {
        id: "forma-interaction",
        title: "Preview Before Applying",
        format: "PNG or WebP · 1920 × 1080 supported",
        instruction:
          "Show the original note and preview together. Annotate the proposed change, Apply, and Dismiss. Include loading or error states only if designed.",
      },
      before: {
        id: "forma-before",
        title: "Original Note",
        format: "WebP · matched viewport",
        instruction: "Export the note before accepting a suggestion. Show the selection and surrounding text; label sample writing as illustrative.",
      },
      after: {
        id: "forma-after",
        title: "Accepted Change",
        format: "WebP · same viewport",
        instruction: "Export the same note after Apply. Identify the affected passage and unchanged surrounding text.",
      },
      walkthrough: {
        id: "forma-flow",
        title: "The Current Prototype",
        src: "/images/forma/Forma_Demo1.mp4",
        video: true,
        format: "Existing MP4",
        instruction:
          "Existing recording. For the final cut, demonstrate selected-text and full-note actions, preview, Apply, and Dismiss. Add captions and disclose missing prototype behavior.",
      },
    },
  },
];

export const visibleStudies = studies.filter((study) => !study.hidden);
