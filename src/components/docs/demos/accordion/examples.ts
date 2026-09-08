import type { DemoExample } from "@/components/docs/demos/types";

export default [
  {
    id: "overview",
    title: "Overview",
    description:
      "One panel open at a time. Setting collapsible lets the open one close again, which a plain accordion does not allow.",
  },
  {
    id: "multiple",
    title: "Multiple",
    description: "Set multiple to let several panels stay open together.",
  },
] satisfies DemoExample[];
