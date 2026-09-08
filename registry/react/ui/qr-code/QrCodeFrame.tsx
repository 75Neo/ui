import React from "react";
import { QrCode as Ark } from "@ark-ui/react/qr-code";
import { cn } from "cn";
import { qrCodeStyles as styles } from "@/registry/shared/lib/qr-code.styles";

export interface QrCodeFrameProps extends React.ComponentPropsWithRef<typeof Ark.Frame> {}

export default function QrCodeFrame({ className, children, ...props }: QrCodeFrameProps) {
  return (
    <Ark.Frame className={cn(styles.frame(), className)} {...props}>
      {children}
    </Ark.Frame>
  );
}
