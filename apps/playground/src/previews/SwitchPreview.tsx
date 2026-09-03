import { useState } from "react";
import { Check, Moon, Sun, X } from "lucide-react";
import { switch as switchRecipe, variantValues } from "@75neo/themes";
import { Switch } from "@75neo/react";

const sizes = variantValues(switchRecipe, "size");
const colors = variantValues(switchRecipe, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

export default function SwitchPreview() {
  const [dark, setDark] = useState(false);

  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <Switch size={size} label={`Ship it (${size})`} defaultChecked />
        </div>
      ))}

      <hr className="border-muted" />

      {colors.map((color) => (
        <div key={color} className={row}>
          <p className={rowLabel} data-identifier>
            {color}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Switch color={color} label="On" defaultChecked />
            <Switch color={color} label="Off" />
            <Switch color={color} label="Loading" loading defaultChecked />
          </div>
        </div>
      ))}

      <hr className="border-muted" />

      <div className="flex flex-col gap-4">
        <Switch
          label="Weekly digest"
          description="One email on Monday with everything that changed. Unsubscribe any time."
          defaultChecked
        />
        <Switch label="Disabled and on" defaultChecked disabled />
        <Switch label="Invalid" color="error" invalid />
        {/* Both icons ride the thumb; the recipe shows whichever the state calls for. */}
        <Switch label="With icons" checkedIcon={<Check />} uncheckedIcon={<X />} defaultChecked />
      </div>

      <hr className="border-muted" />

      {/* Controlled, so the label can answer for the state rather than repeat it. */}
      <div className="flex items-center gap-3">
        <Switch
          color="secondary"
          label={dark ? "Dark" : "Light"}
          checked={dark}
          onCheckedChange={(details) => setDark(details.checked)}
          checkedIcon={<Moon />}
          uncheckedIcon={<Sun />}
        />
      </div>
    </div>
  );
}
