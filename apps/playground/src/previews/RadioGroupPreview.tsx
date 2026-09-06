import type { ReactNode } from "react";
import { RadioGroup } from "@75neo/react/radio-group";
import { radioGroupSchema } from "@75neo/themes";

const sizes = radioGroupSchema.size.values;
const colors = radioGroupSchema.color.values;

const items = [
  { value: "email", label: "Email", description: "Mention me by mail." },
  { value: "sms", label: "SMS", description: "Mention me by text." },
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

export default function RadioGroupPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <RadioGroup size={size} items={items} legend="Notify me" defaultValue="email" />
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="colors">
          <div className="flex flex-col gap-2">
            {colors.map((color) => (
              <RadioGroup key={color} color={color} items={items} defaultValue="email" />
            ))}
          </div>
        </Row>

        <Row label="horizontal">
          <RadioGroup items={items} orientation="horizontal" defaultValue="email" />
        </Row>

        <Row label="disabled">
          <RadioGroup items={items} disabled />
        </Row>
      </div>
    </div>
  );
}
