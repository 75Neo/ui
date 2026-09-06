import type { ReactNode } from "react";
import { RatingGroup } from "@75neo/react/rating-group";
import { ratingGroupSchema } from "@75neo/themes";

const sizes = ratingGroupSchema.size.values;
const colors = ratingGroupSchema.color.values;

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

export default function RatingGroupPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <RatingGroup size={size} label="Quality" defaultValue={3} />
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="colors">
          <div className="flex flex-col gap-2">
            {colors.map((color) => (
              <RatingGroup key={color} color={color} defaultValue={3} />
            ))}
          </div>
        </Row>

        <Row label="halves">
          <RatingGroup allowHalf defaultValue={2.5} label="Quality" />
        </Row>

        <Row label="disabled">
          <RatingGroup defaultValue={3} disabled />
        </Row>
      </div>
    </div>
  );
}
