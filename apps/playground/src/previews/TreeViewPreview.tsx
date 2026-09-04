import type { ReactNode } from "react";
import { treeView, variantValues, type TreeViewItem } from "@75neo/themes";
import { TreeView } from "@75neo/react";
import { FileText, Folder, FolderOpen } from "lucide-react";

const sizes = variantValues(treeView, "size");

const row = "grid gap-2 @sm:grid-cols-[6rem_minmax(0,1fr)] @sm:items-start @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const items: TreeViewItem<ReactNode>[] = [
  {
    value: "src",
    label: "src",
    icon: <Folder />,
    children: [
      { value: "src/app.tsx", label: "app.tsx", icon: <FileText /> },
      { value: "src/index.ts", label: "index.ts", icon: <FileText /> },
      {
        value: "src/components",
        label: "components",
        icon: <FolderOpen />,
        children: [
          { value: "src/components/button.tsx", label: "button.tsx", icon: <FileText /> },
          { value: "src/components/tour.tsx", label: "tour.tsx", icon: <FileText /> },
        ],
      },
    ],
  },
  { value: "package.json", label: "package.json", icon: <FileText /> },
  { value: "readme.md", label: "readme.md", icon: <FileText /> },
];

export default function TreeViewPreview() {
  return (
    <div className="@container flex flex-col gap-6">
      <div className={row}>
        <p className={rowLabel} data-identifier>
          single
        </p>
        <TreeView
          label="Project files"
          items={items}
          defaultExpandedValue={["src"]}
          defaultSelectedValue={["src/index.ts"]}
        />
      </div>

      <div className={row}>
        <p className={rowLabel} data-identifier>
          multiple
        </p>
        <TreeView
          label="Project files"
          items={items}
          selectionMode="multiple"
          defaultExpandedValue={["src", "src/components"]}
          defaultSelectedValue={["src/app.tsx", "package.json"]}
        />
      </div>

      <hr className="border-muted" />

      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <TreeView
            items={items}
            size={size}
            defaultExpandedValue={["src"]}
            aria-label={`${size} files`}
          />
        </div>
      ))}

      <div className={row}>
        <p className={rowLabel} data-identifier>
          no guide
        </p>
        <TreeView items={items} indentGuide={false} defaultExpandedValue={["src"]} />
      </div>
    </div>
  );
}
