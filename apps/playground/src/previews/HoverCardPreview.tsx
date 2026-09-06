import type { ReactNode } from "react";
import { HoverCard } from "@75neo/react/hover-card";
import { hoverCardSchema } from "@75neo/themes";

const sizes = hoverCardSchema.size.values;

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "flex min-w-0 flex-wrap items-center gap-2";
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

export default function HoverCardPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <HoverCard
              size={size}
              title="@handle"
              description="Joined in 2021 · 4.2k followers"
              body="Hover the name to see who is behind it."
            >
              <button type="button">Hover {size}</button>
            </HoverCard>
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="arrow">
          <HoverCard title="@handle" body="The triangle aims at the trigger." arrow>
            <button type="button">Aimed</button>
          </HoverCard>
        </Row>
      </div>
    </div>
  );
}
