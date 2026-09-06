import type React from "react";
import { QrCode as Ark } from "@ark-ui/react/qr-code";
import {
  cn,
  type QrCodeDownloadTriggerProps as QrCodeDownloadTriggerContract,
} from "@75neo/themes";

export interface QrCodeDownloadTriggerProps
  extends
    Omit<React.ComponentProps<typeof Ark.DownloadTrigger>, "fileName" | "mimeType" | "quality">,
    QrCodeDownloadTriggerContract {}

export function QrCodeDownloadTrigger({
  fileName,
  mimeType = "image/png",
  quality,
  className,
  children,
  ...rest
}: QrCodeDownloadTriggerProps) {
  return (
    <Ark.DownloadTrigger
      {...rest}
      fileName={fileName}
      mimeType={mimeType}
      quality={quality}
      data-slot="qr-code-download-trigger"
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-md bg-default px-2.5 py-1.5 text-xs font-medium text-default ring ring-accented outline-inverted/25 transition-colors ring-inset hover:bg-elevated focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-75",
        className,
      )}
    >
      {children}
    </Ark.DownloadTrigger>
  );
}
