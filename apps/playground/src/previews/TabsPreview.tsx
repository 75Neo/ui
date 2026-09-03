import { CreditCard, KeyRound, User } from "lucide-react";
import { tabs, variantValues } from "@75neo/themes";
import { Tabs } from "@75neo/react";

const variants = variantValues(tabs, "variant");
const sizes = variantValues(tabs, "size");
const colors = variantValues(tabs, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-start @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const items = [
  {
    value: "account",
    label: "Account",
    content: "Your name, your handle, your avatar.",
    icon: <User />,
  },
  { value: "password", label: "Password", content: "A new one, twice.", icon: <KeyRound /> },
  {
    value: "billing",
    label: "Billing",
    content: "Card on file and last twelve invoices.",
    icon: <CreditCard />,
  },
  { value: "closed", label: "Closed", content: "Nothing here.", disabled: true },
];

export default function TabsPreview() {
  return (
    <div className="@container flex flex-col gap-6">
      {variants.map((variant) => (
        <div key={variant} className={row}>
          <p className={rowLabel} data-identifier>
            {variant}
          </p>
          <Tabs variant={variant} items={items} defaultValue="account" />
        </div>
      ))}

      <hr className="border-muted" />

      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <Tabs size={size} items={items} defaultValue="account" />
        </div>
      ))}

      <hr className="border-muted" />

      {/* A pill is a raised surface, so the color goes on the selected label; a link has
          no surface, so the color is the line. */}
      {colors.map((color) => (
        <div key={color} className={row}>
          <p className={rowLabel} data-identifier>
            {color}
          </p>
          <div className="flex flex-col gap-3">
            <Tabs color={color} items={items} defaultValue="account" />
            <Tabs variant="link" color={color} items={items} defaultValue="password" />
          </div>
        </div>
      ))}

      <hr className="border-muted" />

      <div className={row}>
        <p className={rowLabel} data-identifier>
          vertical
        </p>
        <Tabs orientation="vertical" items={items} defaultValue="account" />
      </div>

      <div className={row}>
        <p className={rowLabel} data-identifier>
          markup
        </p>
        <Tabs
          variant="link"
          items={items}
          defaultValue="billing"
          renderContent={(item) => (
            <p className="text-muted">
              <span className="font-medium text-highlighted">{item.label}</span> — rendered by the
              call site rather than read off the item.
            </p>
          )}
        />
      </div>
    </div>
  );
}
