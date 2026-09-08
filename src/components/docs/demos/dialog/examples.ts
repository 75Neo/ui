import type { DemoExample } from "@/components/docs/demos/types";

export default [
  {
    id: "overview",
    title: "Overview",
    description:
      "A trigger, a backdrop and a positioned panel. The content is portalled to the body so it escapes any transformed or clipped ancestor.",
    client: "only",
  },
  {
    id: "sizes",
    title: "Sizes",
    description:
      "Five widths on the content, from sm through full. Size sits on the content rather than the root because the panel is portalled away from it.",
    client: "only",
  },
] satisfies DemoExample[];
