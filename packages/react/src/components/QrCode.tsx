import type React from "react";
import { QrCode as Ark, type QrCodeRootProps } from "@ark-ui/react/qr-code";
import { qrCode, type QrCodeProps as QrCodeContract } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the QrCode.
 */
export interface QrCodeProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "dir" | "defaultValue">,
    Pick<QrCodeRootProps, "value" | "onValueChange" | "encoding" | "ids">,
    QrCodeContract {}

export function QrCode({
  ui,
  size,
  value,
  defaultValue,
  pixelSize,
  encoding,
  ids,
  onValueChange,
  className,
  ...rest
}: QrCodeProps) {
  const theme = useResolvedTheme(qrCode, "qrCode", { ui, size }, className);

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
      value={value}
      defaultValue={defaultValue}
      pixelSize={pixelSize}
      encoding={encoding}
      ids={ids}
      onValueChange={onValueChange}
    >
      <Ark.Frame data-slot="frame" className={theme.class.frame}>
        <Ark.Pattern />
      </Ark.Frame>
    </Ark.Root>
  );
}
