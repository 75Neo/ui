import React from "react";
import { QrCode as Ark } from "@ark-ui/react/qr-code";
import { cn } from "cn";
import { qrCode } from "@/registry/shared/lib/qr-code.styles";

export interface QrCodePatternProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.Pattern>,
  "children"
> {}

export default function QrCodePattern({ className, ...props }: QrCodePatternProps) {
  const styles = qrCode();

  return <Ark.Pattern className={cn(styles.pattern(), className)} {...props} />;
}
