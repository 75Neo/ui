import { useState } from "react";
import { pinInput, variantValues } from "@75neo/themes";
import { PinInput } from "@75neo/react";

const sizes = variantValues(pinInput, "size");
const colors = variantValues(pinInput, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

export default function PinInputPreview() {
  const [code, setCode] = useState<string[]>(["1", "2", "3", "", "", ""]);
  const [done, setDone] = useState("");

  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <PinInput size={size} length={4} />
        </div>
      ))}

      <hr className="border-muted" />

      {/* The accent reaches the focus ring on a box and nothing else, so click into one
          to see it. */}
      {colors.map((accent) => (
        <div key={accent} className={row}>
          <p className={rowLabel} data-identifier>
            {accent}
          </p>
          <PinInput color={accent} size="sm" length={4} defaultValue={["7", "5", "", ""]} />
        </div>
      ))}

      <hr className="border-muted" />

      <div className="grid gap-6 @lg:grid-cols-2">
        <PinInput label="Six digits" />
        <PinInput label="Letters too" type="alphanumeric" length={5} />
        <PinInput label="Hidden" mask length={4} defaultValue={["1", "2", "3", "4"]} />
        <PinInput label="Blank boxes" placeholder="" length={4} />
        <PinInput label="Invalid" invalid length={4} defaultValue={["9", "9", "9", "9"]} />
        <PinInput label="Disabled" disabled length={4} defaultValue={["1", "2", "3", "4"]} />
      </div>

      <hr className="border-muted" />

      {/* Controlled: one entry per box, `""` for an empty one. Delete a character in the
          middle and watch the rest move back — a code with a gap in it is not a code. */}
      <div className="grid gap-3 @lg:grid-cols-[minmax(0,1fr)_auto] @lg:items-center @lg:gap-6">
        <PinInput
          label="Controlled"
          length={6}
          value={code}
          onValueChange={(details: { value: string[] }) => setCode(details.value)}
          onValueComplete={(details: { valueAsString: string }) => setDone(details.valueAsString)}
        />
        <output className="font-mono text-sm text-toned">
          {JSON.stringify(code)}
          {done !== "" && ` → ${done}`}
        </output>
      </div>
    </div>
  );
}
