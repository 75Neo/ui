import type React from "react";
import { QrCode as Ark } from "@ark-ui/react/qr-code";
import { cva } from "class-variance-authority";
import { cn, qrCodeDefaults, qrCodeSizeData } from "@75neo/themes";
import { useQrCodeVariants } from "./variants";

const qrCodeOverlay = cva("rounded-sm bg-default p-0.5 [&>*]:size-full", {
  variants: { size: qrCodeSizeData.overlay },
  defaultVariants: qrCodeDefaults,
});

export interface QrCodeOverlayProps extends React.ComponentProps<typeof Ark.Overlay> {}

export function QrCodeOverlay({ className, children, ...rest }: QrCodeOverlayProps) {
  const variants = useQrCodeVariants();

  return (
    <Ark.Overlay
      {...rest}
      data-slot="qr-code-overlay"
      className={cn(qrCodeOverlay(variants), className)}
    >
      {children}
    </Ark.Overlay>
  );
}
