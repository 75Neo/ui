import type { DemoExample } from "@/components/docs/demos/types";

export default [
  {
    id: "overview",
    title: "Overview",
    description:
      "A toaster created once outside the component, then rendered wherever you want the stack. Anything with a reference to it can raise a toast.",
    client: "only",
  },
] satisfies DemoExample[];
