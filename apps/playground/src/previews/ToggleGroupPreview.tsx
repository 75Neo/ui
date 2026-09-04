import { useState, type ReactNode } from "react";
import { toggleGroup, variantValues, type ToggleGroupItem } from "@75neo/themes";
import { ToggleGroup } from "@75neo/react";
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Underline } from "lucide-react";

const variants = variantValues(toggleGroup, "variant");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const formatting: ToggleGroupItem<ReactNode>[] = [
  { value: "bold", icon: <Bold /> },
  { value: "italic", icon: <Italic /> },
  { value: "underline", icon: <Underline /> },
];

const alignment = [
  { value: "left", label: "Left", icon: <AlignLeft /> },
  { value: "center", label: "Center", icon: <AlignCenter /> },
  { value: "right", label: "Right", icon: <AlignRight /> },
];

export default function ToggleGroupPreview() {
  const [value, setValue] = useState<string[]>(["center"]);

  return (
    <div className="@container flex flex-col gap-6">
      <div className={row}>
        <p className={rowLabel} data-identifier>
          single
        </p>
        <ToggleGroup items={formatting} defaultValue={["italic"]} aria-label="Text formatting" />
      </div>

      <div className={row}>
        <p className={rowLabel} data-identifier>
          multiple
        </p>
        <ToggleGroup
          items={formatting}
          multiple
          defaultValue={["bold", "underline"]}
          aria-label="Text formatting"
        />
      </div>

      {variants.map((variant) => (
        <div key={variant} className={row}>
          <p className={rowLabel} data-identifier>
            {variant}
          </p>
          <ToggleGroup
            variant={variant}
            items={alignment}
            defaultValue={["center"]}
            aria-label={`${variant} alignment`}
          />
        </div>
      ))}

      <hr className="border-muted" />

      <div className={row}>
        <p className={rowLabel} data-identifier>
          vertical
        </p>
        <ToggleGroup
          orientation="vertical"
          items={alignment}
          defaultValue={["left"]}
          aria-label="Vertical alignment"
        />
      </div>

      <div className={row}>
        <p className={rowLabel} data-identifier>
          stuck
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <ToggleGroup
            value={value}
            onValueChange={(details) => setValue(details.value)}
            items={alignment}
            aria-label="Controlled alignment"
          />
          <p className="text-sm text-muted">Controlled: {value.join(", ") || "nothing"}</p>
          <ToggleGroup
            items={alignment}
            disabled
            defaultValue={["center"]}
            aria-label="Disabled alignment"
          />
        </div>
      </div>
    </div>
  );
}
