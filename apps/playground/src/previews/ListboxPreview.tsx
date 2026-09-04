import { useState } from "react";
import { listbox, variantValues } from "@75neo/themes";
import { Listbox } from "@75neo/react";

const sizes = variantValues(listbox, "size");
const colors = variantValues(listbox, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const languages = [
  { value: "ts", label: "TypeScript" },
  { value: "js", label: "JavaScript" },
  { value: "rs", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "py", label: "Python" },
  { value: "rb", label: "Ruby" },
  { value: "ex", label: "Elixir" },
  { value: "hs", label: "Haskell", disabled: true },
];

export default function ListboxPreview() {
  const [picked, setPicked] = useState<string[]>(["rs"]);

  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <Listbox size={size} label="Pick a language" items={languages} defaultValue={["ts"]} />
        </div>
      ))}

      <hr className="border-muted" />

      {/* The accent reaches the highlight and the chosen row, so arrow through the list. */}
      {colors.map((accent) => (
        <div key={accent} className={row}>
          <p className={rowLabel} data-identifier>
            {accent}
          </p>
          <Listbox color={accent} size="sm" items={languages} defaultValue={["ts"]} />
        </div>
      ))}

      <hr className="border-muted" />

      <div className="grid gap-6 @lg:grid-cols-2">
        <Listbox
          label="Many at once"
          items={languages}
          selectionMode="multiple"
          defaultValue={["ts", "rs"]}
        />
        <Listbox
          label="With keys held"
          items={languages}
          selectionMode="extended"
          defaultValue={["go"]}
        />
        <Listbox label="Nothing to offer" items={[]} emptyMessage="No languages found." />
        <Listbox label="Disabled" items={languages} disabled defaultValue={["ts"]} />
      </div>

      <hr className="border-muted" />

      {/* Controlled: the value is the option's `value`, in an array whatever the mode. */}
      <div className="grid gap-3 @lg:grid-cols-[minmax(0,1fr)_auto] @lg:items-center @lg:gap-6">
        <Listbox
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
