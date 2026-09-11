import { JsonTreeView, JsonTreeViewTree } from "@/components/react";

const item = {
  name: "button",
  type: "registry:ui",
  title: "Button",
  registryDependencies: ["@75neo/theme"],
  dependencies: ["@ark-ui/react", "cn", "tailwind-variants"],
  files: [{ path: "registry/react/ui/button/Button.tsx", type: "registry:ui" }],
  deprecated: false,
};

export default function JsonTreeViewOverview() {
  return (
    <JsonTreeView data={item} defaultExpandedDepth={2}>
      <JsonTreeViewTree />
    </JsonTreeView>
  );
}
