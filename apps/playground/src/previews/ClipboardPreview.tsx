import type { ReactNode } from "react";
import { Clipboard } from "@75neo/react/clipboard";
import { clipboardSchema } from "@75neo/themes";
import { Star } from "lucide-react";

const sizes = clipboardSchema.size.values;
const colors = clipboardSchema.color.values;

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "min-w-0 max-w-md";
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

export default function ClipboardPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <Clipboard size={size} value="pnpm add @75neo/react" />
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="colors">
          <div className="flex flex-col gap-2">
            {colors.map((color) => (
              <Clipboard key={color} color={color} value={color} />
            ))}
          </div>
        </Row>

        <Row label="label">
          <Clipboard label="Registry URL" value="https://75neo.dev/r/button.json" />
        </Row>

        <Row label="icons">
          <Clipboard value="starred" copyIcon={<Star />} copiedIcon={<Star />} />
        </Row>
      </div>
    </div>
  );
}
