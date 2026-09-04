import { qrCode, variantValues } from "@75neo/themes";
import { QrCode } from "@75neo/react";

const sizes = variantValues(qrCode, "size");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

export default function QrCodePreview() {
  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <QrCode size={size} defaultValue="https://75neo.design" />
        </div>
      ))}
    </div>
  );
}
