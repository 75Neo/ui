import type { DemoExample } from "@/components/docs/demos/types";

export default [
  {
    id: "overview",
    title: "Overview",
    description: "A row of toggles that share a value. Single select by default.",
  },
  { id: "multiple", title: "Multiple", description: "Set multiple to let more than one stay on." },
  { id: "colors", title: "Colors", description: "The on state takes a tint of the color." },
] satisfies DemoExample[];
