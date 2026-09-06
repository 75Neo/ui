import { TreeView } from "@75neo/react/tree-view";

const items = [
  {
    value: "src",
    label: "src",
    children: [{ value: "src-button", label: "button.tsx" }],
  },
  { value: "readme", label: "README.md" },
];

export function TreeViewPreview() {
  return (
    <div className="max-w-xs">
      <TreeView items={items} label="Files" defaultExpandedValue={["src"]} />
    </div>
  );
}
