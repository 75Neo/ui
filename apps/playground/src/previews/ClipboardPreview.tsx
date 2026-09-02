import { clipboard, variantValues } from "@75neo/themes";
import { Clipboard } from "@75neo/react";

const sizes = variantValues(clipboard, "size");
const colors = variantValues(clipboard, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

export default function ClipboardPreview() {
  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <Clipboard size={size} value={`pnpm add @75neo/react --size ${size}`} />
        </div>
      ))}

      <hr className="border-muted" />

      {colors.map((color) => (
        <div key={color} className={row}>
          <p className={rowLabel} data-identifier>
            {color}
          </p>
          <Clipboard color={color} value={`--ui-${color}: var(--color-teal-600);`} />
        </div>
      ))}

      <hr className="border-muted" />

      <Clipboard label="Registry URL" value="https://75neo.dev/r/button.json" color="primary" />
    </div>
  );
}
