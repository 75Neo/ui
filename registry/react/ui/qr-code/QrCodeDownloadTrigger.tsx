import React from "react";
import { QrCode as Ark } from "@ark-ui/react/qr-code";
import { cn } from "cn";
import { qrCodeStyles as styles } from "@/registry/shared/lib/qr-code.styles";

export interface QrCodeDownloadTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.DownloadTrigger
> {}

export default function QrCodeDownloadTrigger({
  className,
  children,
  ...props
}: QrCodeDownloadTriggerProps) {
  return (
    <Ark.DownloadTrigger className={cn(styles.downloadTrigger(), className)} {...props}>
      {children}
    </Ark.DownloadTrigger>
  );
}
