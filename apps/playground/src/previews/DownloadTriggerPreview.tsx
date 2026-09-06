import type { ReactNode } from "react";
import { DownloadTrigger } from "@75neo/react/download-trigger";
import { downloadTriggerSchema } from "@75neo/themes";

const variants = downloadTriggerSchema.variant.values;
const colors = downloadTriggerSchema.color.values;
const sizes = downloadTriggerSchema.size.values;

const file = () => new Blob(["75NeoUI"], { type: "text/plain" });

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "flex min-w-0 flex-wrap items-center gap-2";
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

function Save({ ...props }: Partial<React.ComponentProps<typeof DownloadTrigger>>) {
  return (
    <DownloadTrigger data={file()} fileName="75neo.txt" mimeType="text/plain" {...props}>
      Save
    </DownloadTrigger>
  );
}

export default function DownloadTriggerPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {variants.map((variant) => (
          <Row key={variant} label={variant}>
            <Save variant={variant} />
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="colors">
          {colors.map((color) => (
            <Save key={color} color={color} />
          ))}
        </Row>

        {sizes.map((size) => (
          <Row key={size} label={size}>
            <Save size={size} />
          </Row>
        ))}

        <Row label="disabled">
          <Save disabled />
        </Row>
      </div>
    </div>
  );
}
