import type { ReactNode } from "react";
import { QrCode, QrCodeDownloadTrigger, QrCodeFrame, QrCodeOverlay } from "@75neo/react/qr-code";
import { qrCodeSchema } from "@75neo/themes";

const sizes = qrCodeSchema.size.values;
const value = "https://github.com/75Neo/ui";

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "flex min-w-0 flex-wrap items-center gap-4";
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

export default function QrCodePreview() {
  return (
    <div className="@container">
      <div className={group}>
        <Row label="sizes">
          {sizes.map((size) => (
            <QrCode key={size} size={size} defaultValue={value} />
          ))}
        </Row>
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="overlay">
          <QrCode defaultValue={value}>
            <QrCodeFrame>
              <QrCodeOverlay>
                <img src="/favicon.svg" alt="" />
              </QrCodeOverlay>
            </QrCodeFrame>
          </QrCode>
        </Row>

        <Row label="download">
          <QrCode defaultValue={value}>
            <QrCodeFrame />
            <QrCodeDownloadTrigger fileName="75neo.png" className="ms-3 self-center">
              Download
            </QrCodeDownloadTrigger>
          </QrCode>
        </Row>
      </div>
    </div>
  );
}
