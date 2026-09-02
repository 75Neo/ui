import { useState } from "react";
import { combobox, variantValues } from "@75neo/themes";
import { Combobox } from "@75neo/react";

const sizes = variantValues(combobox, "size");
const colors = variantValues(combobox, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const languages = [
  { value: "ts", label: "TypeScript" },
  { value: "js", label: "JavaScript" },
  { value: "rs", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "py", label: "Python" },
  { value: "rb", label: "Ruby" },
  { value: "ex", label: "Elixir" },
  { value: "hs", label: "Haskell" },
];

export default function ComboboxPreview() {
  const [picked, setPicked] = useState<string[]>(["rs"]);

  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <Combobox size={size} items={languages} placeholder="Pick a language" />
        </div>
      ))}

      <hr className="border-muted" />

      {/* The accent reaches the focus ring on the field and the highlight on an option,
          so tab in and arrow down to see it. */}
      {colors.map((accent) => (
        <div key={accent} className={row}>
          <p className={rowLabel} data-identifier>
            {accent}
          </p>
          <Combobox
            color={accent}
            size="sm"
            items={languages}
            defaultValue={["ts"]}
            placeholder="Pick a language"
          />
        </div>
      ))}

      <hr className="border-muted" />

      <div className="grid gap-6 @lg:grid-cols-2">
        <Combobox
          label="Opens on click"
          items={languages}
          openOnClick
          placeholder="Click to see them all"
        />
        <Combobox
          label="Many at once"
          items={languages}
          multiple
          placeholder="Pick as many as you like"
        />
        <Combobox
          label="Anything goes"
          items={languages}
          allowCustomValue
          placeholder="Or type your own"
        />
        <Combobox label="Disabled" items={languages} disabled placeholder="Not today" />
      </div>

      <hr className="border-muted" />

      {/* Controlled: the value is the item's `value`, in an array whatever the mode. */}
      <div className="grid gap-3 @lg:grid-cols-[minmax(0,1fr)_auto] @lg:items-center @lg:gap-6">
        <Combobox
          label="Controlled"
          items={languages}
          value={picked}
          onValueChange={(details: { value: string[] }) => setPicked(details.value)}
        />
        <output className="font-mono text-sm text-toned">[{picked.join(", ")}]</output>
      </div>
    </div>
  );
}
