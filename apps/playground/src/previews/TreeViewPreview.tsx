import type { ReactNode } from "react";
import { TreeView } from "@75neo/react/tree-view";
import { treeViewSchema } from "@75neo/themes";

const sizes = treeViewSchema.size.values;
const colors = treeViewSchema.color.values;

const items = [
  {
    value: "src",
    label: "src",
    children: [
      { value: "src-button", label: "button.tsx" },
      { value: "src-index", label: "index.ts" },
    ],
  },
  { value: "readme", label: "README.md" },
];

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "min-w-0 max-w-xs";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={row}>
      <p className={rowLabel} data-identifier>
        {label}
      </p>
      <div className={rowItems}>{children}</div>
    </div>
  );
}

export default function TreeViewPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <TreeView size={size} items={items} label="Files" defaultExpandedValue={["src"]} />
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="colors">
          <div className="flex flex-col gap-2">
            {colors.map((color) => (
              <TreeView
                key={color}
                color={color}
                items={items}
                defaultExpandedValue={["src"]}
                defaultSelectedValue={["src-button"]}
              />
            ))}
          </div>
        </Row>

        <Row label="multiple">
          <TreeView
            items={items}
            selectionMode="multiple"
            defaultExpandedValue={["src"]}
            defaultSelectedValue={["src-button", "readme"]}
          />
        </Row>
      </div>
    </div>
  );
}
