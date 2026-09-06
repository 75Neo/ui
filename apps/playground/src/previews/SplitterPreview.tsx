import type { ReactNode } from "react";
import { Splitter } from "@75neo/react/splitter";
import { splitterSchema } from "@75neo/themes";

const sizes = splitterSchema.size.values;

const pair = [
  { id: "left", content: "Left", minSize: 20 },
  { id: "right", content: "Right", minSize: 20 },
];

const trio = [
  { id: "a", content: "A", minSize: 15 },
  { id: "b", content: "B", minSize: 15 },
  { id: "c", content: "C", minSize: 15 },
];

const frame =
  "h-28 rounded-lg ring ring-default ring-inset [&_[data-slot=splitter-panel]]:grid [&_[data-slot=splitter-panel]]:place-items-center";

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "min-w-0 max-w-md";
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

export default function SplitterPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <Splitter size={size} panels={pair} className={frame} />
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="three">
          <Splitter panels={trio} className={frame} />
        </Row>

        <Row label="vertical">
          <Splitter orientation="vertical" panels={pair} className={`${frame} h-40`} />
        </Row>

        <Row label="disabled">
          <Splitter panels={[pair[0], { ...pair[1], disabled: true }]} className={frame} />
        </Row>
      </div>
    </div>
  );
}
