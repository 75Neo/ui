import { downloadTrigger, variantValues } from "@75neo/themes";
import { DownloadTrigger } from "@75neo/react";
import { Download } from "lucide-react";

const sizes = variantValues(downloadTrigger, "size");
const colors = variantValues(downloadTrigger, "color");
const variants = variantValues(downloadTrigger, "variant");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const data = "Hello from 75NeoUI: this file was saved by the DownloadTrigger.";
const fileName = "hello.txt";
const mimeType = "text/plain";

export default function DownloadTriggerPreview() {
  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <div>
            <DownloadTrigger size={size} data={data} fileName={fileName} mimeType={mimeType}>
              Download
            </DownloadTrigger>
          </div>
        </div>
      ))}

      <hr className="border-muted" />

      {variants.map((variant) => (
        <div key={variant} className={row}>
          <p className={rowLabel} data-identifier>
            {variant}
          </p>
          <div>
            <DownloadTrigger
              variant={variant}
              data={data}
              fileName={fileName}
              mimeType={mimeType}
              leadingIcon={<Download />}
            >
              Report
            </DownloadTrigger>
          </div>
        </div>
      ))}

      <hr className="border-muted" />

      {colors.map((color) => (
        <div key={color} className={row}>
          <p className={rowLabel} data-identifier>
            {color}
          </p>
          <div>
            <DownloadTrigger
              color={color}
              variant="soft"
              data={data}
              fileName={fileName}
              mimeType={mimeType}
            >
              {color}
            </DownloadTrigger>
          </div>
        </div>
      ))}
    </div>
  );
}
