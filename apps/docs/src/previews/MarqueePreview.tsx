import { Marquee } from "@75neo/react/marquee";

const items = [
  { id: "react", content: "React" },
  { id: "vue", content: "Vue" },
  { id: "svelte", content: "Svelte" },
  { id: "solid", content: "Solid" },
  { id: "angular", content: "Angular" },
];

export function MarqueePreview() {
  return <Marquee items={items} edge autoFill />;
}
