import type { DemoExample } from "@/components/docs/demos/types";

export default [
  {
    id: "states",
    title: "States",
    description:
      "Label, helper text and error text all hang off one root, so required and invalid flow to every part without wiring.",
  },
  {
    id: "sizes",
    title: "Sizes",
    description:
      "Three control heights, set on the field root and inherited by input, textarea and select.",
  },
  {
    id: "controls",
    title: "Controls",
    description: "The same recipe styles an input, a textarea and a native select.",
  },
] satisfies DemoExample[];
