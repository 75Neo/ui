import type React from "react";
import { QrCode as Ark } from "@ark-ui/react/qr-code";
import { cva } from "class-variance-authority";
import { cn, qrCodeDefaults, qrCodeSizeData } from "@75neo/themes";
import { useQrCodeVariants } from "./variants";

const qrCodeFrame = cva("block fill-inverted", {
  variants: { size: qrCodeSizeData.frame },
  defaultVariants: qrCodeDefaults,
});

export interface QrCodeFrameProps extends React.ComponentProps<typeof Ark.Frame> {}

export function QrCodeFrame({ className, children, ...rest }: QrCodeFrameProps) {
  const variants = useQrCodeVariants();

  return (
    <Ark.Frame {...rest} data-slot="qr-code-frame" className={cn(qrCodeFrame(variants), className)}>
      <Ark.Pattern />
      {children}
    </Ark.Frame>
  );
}
