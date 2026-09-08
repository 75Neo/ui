import type { DemoExample } from "@/components/docs/demos/types";

export default [
  {
    id: "sizes",
    title: "Sizes",
    description: "Five sizes from xs to xl, set on the root.",
    client: "none",
  },
  {
    id: "fallback",
    title: "Fallback",
    description:
      "When the image is missing or fails to load the fallback shows instead, so initials never flash over a loaded photo.",
    client: "none",
  },
] satisfies DemoExample[];
