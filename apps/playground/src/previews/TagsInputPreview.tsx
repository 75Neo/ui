import type { ReactNode } from "react";
import { TagsInput } from "@75neo/react/tags-input";
import { tagsInputSchema } from "@75neo/themes";

const sizes = tagsInputSchema.size.values;
const colors = tagsInputSchema.color.values;

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

export default function TagsInputPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <TagsInput size={size} label="Tags" defaultValue={["react", "vue"]} />
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="colors">
          <div className="flex flex-col gap-2">
            {colors.map((color) => (
              <TagsInput key={color} color={color} defaultValue={["react"]} />
            ))}
          </div>
        </Row>

        <Row label="empty">
          <TagsInput label="Tags" placeholder="Add a tag" />
        </Row>

        <Row label="disabled">
          <TagsInput defaultValue={["react"]} disabled />
        </Row>
      </div>
    </div>
  );
}
