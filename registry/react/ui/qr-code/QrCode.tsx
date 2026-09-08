import React from "react";
import { QrCode as Ark } from "@ark-ui/react/qr-code";
import { cn } from "cn";
import { qrCodeStyles as styles } from "@/registry/shared/lib/qr-code.styles";

export interface QrCodeProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function QrCode({ className, children, ...props }: QrCodeProps) {
  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
