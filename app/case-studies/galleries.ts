export type DiagramStep = { label: string; note: string; src?: string };
export type Diagram = { label: string; caption: string; steps: DiagramStep[] };

const image = (name: string, caption: string) => ({ src: `/images/spots/${encodeURIComponent(name)}.png`, label: name, caption });

const spotsSystems = [
  { src: "/images/spots/systems/systems-0.png", label: "System Overview", caption: "Working File", canvas: true },
  { src: "/images/spots/systems/systems-1.png", label: "System Detail 1", caption: "Context Widgets", canvas: false },
  { src: "/images/spots/systems/systems-2.png", label: "System Detail 2", caption: "Trip Bar And Filters", canvas: false },
  { src: "/images/spots/systems/systems-3.png", label: "System Detail 3", caption: "Chat Input States", canvas: false },
  { src: "/images/spots/systems/systems-4.png", label: "System Detail 4", caption: "Booking Cards", canvas: false },
  { src: "/images/spots/systems/systems-5.png", label: "System Detail 5", caption: "Guest And Flight Details", canvas: false },
];

export const spotsGalleries = {
  discovery: {
    label: "Discovery",
    slides: [image("web - home/explore default", "Explore Feed"), image("web - home/explore 5", "Save To A List"), image("list page 3", "List Page")],
  },
  planning: {
    label: "Conversational Planning",
    slides: [image("chat default", "Planning Home"), image("chat attached state", "Contextual Input"), image("hotel - booking", "Stay Details And Booking")],
  },
  itinerary: {
    label: "From Conversation To Itinerary",
    slides: [
      image("chat 8", "Trip Options"),
      image("chat 11 itinerary pop", "Itinerary Overview"),
      image("chat accommodation prompts", "Accommodation Refinements"),
      image("chat 11 itinerary schedule", "Day Schedule"),
      image("chat 11 itinerary full trip view 2", "Full Trip View"),
    ],
  },
  system: { label: "Designing The System", slides: spotsSystems },
};

export const spotsDiagrams: Record<string, Diagram> = {
  hypothesis: {
    label: "Product Hypothesis",
    caption: "The product hypothesis. A bet to test, not a research finding.",
    steps: [
      { label: "Discover", note: "Find inspiration" },
      { label: "Save", note: "Keep context" },
      { label: "Plan", note: "Make it actionable" },
    ],
  },
};
