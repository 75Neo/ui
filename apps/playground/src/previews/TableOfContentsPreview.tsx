import type { ReactNode } from "react";
import { TableOfContents } from "@75neo/react/table-of-contents";
import { tableOfContentsSchema, type TableOfContentsEntry } from "@75neo/themes";

const sizes = tableOfContentsSchema.size.values;
const colors = tableOfContentsSchema.color.values;

const headings: TableOfContentsEntry[] = [
  { value: "install", depth: 2, label: "Install" },
  { value: "options", depth: 3, label: "Options" },
  { value: "usage", depth: 2, label: "Usage" },
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

export default function TableOfContentsPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <TableOfContents size={size} items={headings} />
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="colors">
          <div className="flex flex-col gap-2">
            {colors.map((color) => (
              <TableOfContents key={color} color={color} items={headings} />
            ))}
          </div>
        </Row>

        <Row label="no title">
          <TableOfContents items={headings} title="" />
        </Row>
      </div>
    </div>
  );
}
