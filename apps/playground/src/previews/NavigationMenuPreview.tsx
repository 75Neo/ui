import type { ReactNode } from "react";
import { NavigationMenu } from "@75neo/react/navigation-menu";
import { navigationMenuSchema } from "@75neo/themes";

const sizes = navigationMenuSchema.size.values;
const colors = navigationMenuSchema.color.values;

const items = [
  {
    value: "components",
    label: "Components",
    links: [
      { href: "#button", title: "Button", description: "The one every page has" },
      {
        href: "#select",
        title: "Select",
        description: "A list that opens on demand",
        current: true,
      },
      { href: "#dialog", title: "Dialog", description: "A panel over the page" },
    ],
  },
  {
    value: "guides",
    label: "Guides",
    links: [
      { href: "#install", title: "Installation" },
      { href: "#theming", title: "Theming" },
    ],
  },
  { value: "docs", label: "Docs", href: "#docs" },
  { value: "changelog", label: "Changelog", href: "#changelog", disabled: true },
];

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "min-w-0";
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

export default function NavigationMenuPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <NavigationMenu size={size} items={items} />
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        {colors.map((color) => (
          <Row key={color} label={color}>
            <NavigationMenu color={color} items={items} />
          </Row>
        ))}

        <Row label="vertical">
          <div className="max-w-48">
            <NavigationMenu orientation="vertical" items={items} />
          </div>
        </Row>
      </div>
    </div>
  );
}
