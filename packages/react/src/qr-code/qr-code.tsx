import type React from "react";
import { QrCode as Ark } from "@ark-ui/react/qr-code";
import { cva } from "class-variance-authority";
import {
  cn,
  qrCodeDefaults,
  qrCodeSizeData,
  type QrCodeRootProps as QrCodeContract,
} from "@75neo/themes";
import { QrCodeVariantsContext } from "./variants";
import { QrCodeFrame } from "./frame";

const qrCodeRoot = cva("inline-flex w-fit rounded-xl bg-default ring ring-default ring-inset", {
  variants: { size: qrCodeSizeData.root },
  defaultVariants: qrCodeDefaults,
});

export interface QrCodeProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "dir" | "defaultValue">,
    Pick<React.ComponentProps<typeof Ark.Root>, "value" | "onValueChange" | "encoding" | "ids">,
    QrCodeContract {
  children?: React.ReactNode;
}

export function QrCode({
  size,
  value,
  defaultValue,
  pixelSize,
  encoding,
  ids,
  onValueChange,
  className,
  children,
  ...rest
}: QrCodeProps) {
  const resolved = { size: size ?? qrCodeDefaults.size };

  return (
    <QrCodeVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        value={value}
        defaultValue={defaultValue}
        pixelSize={pixelSize}
        encoding={encoding}
        ids={ids}
        onValueChange={onValueChange}
        data-slot="qr-code"
        data-size={resolved.size}
        className={cn(qrCodeRoot(resolved), className)}
      >
        {children ?? <QrCodeFrame />}
      </Ark.Root>
    </QrCodeVariantsContext.Provider>
  );
}
