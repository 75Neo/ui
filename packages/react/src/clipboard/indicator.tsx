import type React from "react";
import { Clipboard as Ark } from "@ark-ui/react/clipboard";
import { cva } from "class-variance-authority";
import { Check, Copy } from "lucide-react";
import { clipboardDefaults, clipboardSizeData, cn } from "@75neo/themes";
import { useClipboardVariants } from "./variants";

const clipboardIndicator = cva("shrink-0 [&>svg]:size-full", {
  variants: { size: clipboardSizeData.indicator },
  defaultVariants: clipboardDefaults,
});

export interface ClipboardIndicatorProps extends React.ComponentProps<typeof Ark.Indicator> {
  /** Replaces the copy icon. */
  copyIcon?: React.ReactNode;
  /** Replaces the icon shown just after a copy. */
  copiedIcon?: React.ReactNode;
}

export function ClipboardIndicator({
  copyIcon,
  copiedIcon,
  className,
  children,
  ...rest
}: ClipboardIndicatorProps) {
  const variants = useClipboardVariants();

  return (
    <Ark.Indicator
      {...rest}
      data-slot="clipboard-indicator"
      copied={copiedIcon ?? <Check />}
      className={cn(clipboardIndicator(variants), className)}
    >
      {children ?? copyIcon ?? <Copy />}
    </Ark.Indicator>
  );
}
