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
  hero: {
    label: "From Discovery To Itinerary",
    slides: [image("web - home/explore default", "Discovery Home"), image("chat 11 itinerary pop", "Itinerary Overview")],
  },
  opportunity: { label: "Creator Profile", slides: [image("creator profile", "Creator Profile: Recommendations As A Starting Point")] },
  discovery: {
    label: "Discovery",
    slides: [image("web - home/explore 5", "Save To A List"), image("list page 3", "Collected List"), image("hotel - booking", "Stay Details And Booking")],
  },
  planning: {
    label: "Conversational Planning",
    slides: [image("chat default", "Before: Planning Home"), image("chat attached state", "After: Context Attached")],
  },
  itinerary: {
    label: "From Conversation To Itinerary",
    slides: [
      image("chat 8", "Trip Options"),
      image("chat 11 itinerary pop", "Itinerary Overview"),
      image("chat accommodation prompts", "Accommodation Refinements"),
      image("chat 11 itinerary schedule", "Day Schedule"),
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
  activities: {
    label: "Three Activities",
    caption: "Three activities, with context carried from one to the next.",
    steps: [
      { label: "Discover", note: "Where is worth going?", src: image("web - home/explore default", "").src },
      { label: "Plan", note: "What should this trip look like?", src: image("chat default", "").src },
      { label: "Organize", note: "What happens on each day?", src: image("chat 11 itinerary schedule", "").src },
    ],
  },
};
