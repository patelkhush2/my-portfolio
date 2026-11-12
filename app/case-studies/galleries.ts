const image = (name: string) => ({ src: `/images/spots/${encodeURIComponent(name)}.png`, label: name });

export const spotsDecisions = [
  [image("web - home/explore default"), image("web - home/explore 5")],
  [image("chat default"), image("chat attached state"), image("chat selected+attached state")],
  [image("chat 8"), image("chat 11 itinerary pop"), image("chat 11 itinerary schedule"), image("chat 11 itinerary full trip view 2")],
];

export const spotsSystems = [
  { src: "/images/spots/systems/systems-0.png", label: "System Overview", canvas: true },
  { src: "/images/spots/systems/systems-1.png", label: "System Detail 1", canvas: false },
  { src: "/images/spots/systems/systems-2.png", label: "System Detail 2", canvas: false },
  { src: "/images/spots/systems/systems-3.png", label: "System Detail 3", canvas: false },
  { src: "/images/spots/systems/systems-4.png", label: "System Detail 4", canvas: false },
  { src: "/images/spots/systems/systems-5.png", label: "System Detail 5", canvas: false },
];
