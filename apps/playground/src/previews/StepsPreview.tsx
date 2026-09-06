import type { ReactNode } from "react";
import { Steps } from "@75neo/react/steps";
import { stepsSchema } from "@75neo/themes";

const sizes = stepsSchema.size.values;
const colors = stepsSchema.color.values;

const items = [
  { title: "Contact", description: "Name and email" },
  { title: "Date", description: "Pick a day" },
  { title: "Rooms", description: "Choose a room" },
];

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

export default function StepsPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <Steps size={size} items={items} defaultStep={1} />
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="colors">
          {colors.map((color) => (
            <Steps key={color} color={color} items={items} defaultStep={2} />
          ))}
        </Row>

        <Row label="linear">
          <Steps items={items} linear completedContent="Done — thank you!" />
        </Row>

        <Row label="vertical">
          <Steps items={items} orientation="vertical" />
        </Row>
      </div>
    </div>
  );
}
