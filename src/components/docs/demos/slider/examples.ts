import type { DemoExample } from "@/components/docs/demos/types";

export default [
  {
    id: "single",
    title: "Single and range",
    description:
      "One thumb reads a value, two read a range. Every thumb carries its own hidden input so the control submits with a form.",
  },
  {
    id: "colors",
    title: "Colors",
    description: "The filled range and the thumb ring both take the color.",
  },
] satisfies DemoExample[];
