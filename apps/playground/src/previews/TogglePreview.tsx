import { useState } from "react";
import { toggle, variantValues } from "@75neo/themes";
import { Toggle } from "@75neo/react";
import { Bold } from "lucide-react";

const variants = variantValues(toggle, "variant");
const colors = variantValues(toggle, "color");
const sizes = variantValues(toggle, "size");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

export default function TogglePreview() {
  const [pressed, setPressed] = useState(true);

  return (
    <div className="@container flex flex-col gap-6">
      {/* Every other cell starts pressed, so both states show in every color. */}
      {variants.map((variant, rowIndex) => (
        <div key={variant} className={row}>
          <p className={rowLabel} data-identifier>
            {variant}
          </p>
          <div className="flex flex-wrap gap-2">
            {colors.map((color, cellIndex) => (
              <Toggle
                key={color}
                variant={variant}
                color={color}
                defaultPressed={(rowIndex + cellIndex) % 2 === 0}
                aria-label={`${variant} ${color} toggle`}
              >
                <Bold />
              </Toggle>
            ))}
          </div>
        </div>
      ))}

      <hr className="border-muted" />

      <div className={row}>
        <p className={rowLabel} data-identifier>
          sizes
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {sizes.map((size) => (
            <Toggle
              key={size}
              size={size}
              variant="outline"
              color="neutral"
              aria-label={`${size} toggle`}
            >
              <Bold />
            </Toggle>
          ))}
        </div>
      </div>

      <hr className="border-muted" />

      <div className="flex flex-wrap items-center gap-2">
        <Toggle pressed={pressed} onPressedChange={setPressed} aria-label="Controlled toggle">
          <Bold />
        </Toggle>
        <p className="text-sm text-muted">
          Controlled: {pressed ? "pressed" : "released"} — click it, or
        </p>
        <button
          type="button"
          className="cursor-pointer text-sm text-primary underline-offset-4 hover:underline"
          onClick={() => setPressed((value) => !value)}
        >
          flip it from out here
        </button>
        <Toggle variant="soft" color="neutral" disabled aria-label="Disabled toggle">
          <Bold />
        </Toggle>
      </div>
    </div>
  );
}
