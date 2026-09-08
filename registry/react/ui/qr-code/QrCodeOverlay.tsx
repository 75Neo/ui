import React from "react";
import { QrCode as Ark } from "@ark-ui/react/qr-code";
import { cn } from "cn";
import { qrCodeStyles as styles } from "@/registry/shared/lib/qr-code.styles";

export interface QrCodeOverlayProps extends React.ComponentPropsWithRef<typeof Ark.Overlay> {}

export default function QrCodeOverlay({ className, children, ...props }: QrCodeOverlayProps) {
  return (
    <Ark.Overlay className={cn(styles.overlay(), className)} {...props}>
      {children}
    </Ark.Overlay>
  );
}
