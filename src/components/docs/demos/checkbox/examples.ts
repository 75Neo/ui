import type { DemoExample } from "@/components/docs/demos/types";

export default [
  {
    id: "states",
    title: "States",
    description:
      "Unchecked, checked, indeterminate and disabled. The indicator is yours to fill, so the tick and the dash are whichever icons you pass.",
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "Three sizes, set on the root and picked up by the control and the label.",
  },
  {
    id: "colors",
    title: "Colours",
    description: "The checked control takes the intent colour and its matching foreground.",
  },
] satisfies DemoExample[];
