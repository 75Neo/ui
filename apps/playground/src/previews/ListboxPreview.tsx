import type { ReactNode } from "react";
import { Listbox } from "@75neo/react/listbox";
import { listboxSchema } from "@75neo/themes";

const sizes = listboxSchema.size.values;
const colors = listboxSchema.color.values;

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte", disabled: true },
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

export default function ListboxPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <Listbox size={size} items={items} label="Framework" defaultValue={["react"]} />
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="colors">
          <div className="flex flex-col gap-2">
            {colors.map((color) => (
              <Listbox key={color} color={color} items={items} defaultValue={["react"]} />
            ))}
          </div>
        </Row>

        <Row label="multiple">
          <Listbox items={items} selectionMode="multiple" defaultValue={["react", "vue"]} />
        </Row>

        <Row label="empty">
          <Listbox items={[]} />
        </Row>
      </div>
    </div>
  );
}
