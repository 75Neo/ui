import type { ReactNode } from "react";
import { Tabs } from "@75neo/react/tabs";
import { tabsSchema } from "@75neo/themes";

const variants = tabsSchema.variant.values;
const colors = tabsSchema.color.values;
const sizes = tabsSchema.size.values;

const items = [
  { value: "account", label: "Account", content: "Make changes to your account here." },
  { value: "password", label: "Password", content: "Change your password here." },
];

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

export default function TabsPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {variants.map((variant) => (
          <Row key={variant} label={variant}>
            <Tabs variant={variant} items={items} defaultValue="account" />
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="colors">
          <div className="flex flex-col gap-2">
            {colors.map((color) => (
              <Tabs key={color} color={color} items={items} defaultValue="account" />
            ))}
          </div>
        </Row>

        {sizes.map((size) => (
          <Row key={size} label={size}>
            <Tabs size={size} items={items} defaultValue="account" />
          </Row>
        ))}

        <Row label="vertical">
          <Tabs items={items} orientation="vertical" defaultValue="account" />
        </Row>
      </div>
    </div>
  );
}
