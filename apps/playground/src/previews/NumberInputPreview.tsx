import { useState } from "react";
import { numberInput, variantValues } from "@75neo/themes";
import { NumberInput } from "@75neo/react";

const sizes = variantValues(numberInput, "size");
const colors = variantValues(numberInput, "color");
const orientations = variantValues(numberInput, "orientation");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

export default function NumberInputPreview() {
  const [typed, setTyped] = useState("3");

  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <NumberInput size={size} defaultValue="4" />
        </div>
      ))}

      <hr className="border-muted" />

      {/* Both arrangements, from one set of three elements: the row moves them with
          `order`, the column places them by grid line. */}
      {orientations.map((orientation) => (
        <div key={orientation} className={row}>
          <p className={rowLabel} data-identifier>
            {orientation}
          </p>
          <NumberInput orientation={orientation} defaultValue="4" />
        </div>
      ))}

      <hr className="border-muted" />

      {/* The accent reaches the focus ring and nothing else, so tab in to see it. */}
      {colors.map((accent) => (
        <div key={accent} className={row}>
          <p className={rowLabel} data-identifier>
            {accent}
          </p>
          <NumberInput color={accent} size="sm" defaultValue="4" />
        </div>
      ))}

      <hr className="border-muted" />

      <div className="grid gap-6 @lg:grid-cols-2">
        <NumberInput label="One to ten" min={1} max={10} defaultValue="5" />
        <NumberInput label="Two at a time" step={2} defaultValue="0" />
        <NumberInput
          label="A price"
          orientation="vertical"
          formatOptions={{ style: "currency", currency: "USD" }}
          defaultValue="19.99"
        />
        <NumberInput
          label="A share"
          orientation="vertical"
          formatOptions={{ style: "percent" }}
          step={0.05}
          defaultValue="25%"
        />
        <NumberInput label="Wheel works here" allowMouseWheel defaultValue="0" />
        <NumberInput label="Disabled" disabled defaultValue="4" />
      </div>

      <hr className="border-muted" />

      {/* Controlled: the value is the field's text, not a number, so a half-typed
          minus sign or trailing point survives a render. */}
      <div className="grid gap-3 @lg:grid-cols-[minmax(0,1fr)_auto] @lg:items-center @lg:gap-6">
        <NumberInput
          label="Controlled"
          value={typed}
          onValueChange={(details: { value: string }) => setTyped(details.value)}
        />
        <output className="font-mono text-sm text-toned">{JSON.stringify(typed)}</output>
      </div>
    </div>
  );
}
