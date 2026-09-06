import type React from "react";
import { Clipboard as Ark } from "@ark-ui/react/clipboard";
import { cva } from "class-variance-authority";
import { clipboardDefaults, clipboardSizeData, cn } from "@75neo/themes";
import { useClipboardVariants } from "./variants";

const clipboardLabel = cva("font-medium text-highlighted", {
  variants: { size: clipboardSizeData.label },
  defaultVariants: clipboardDefaults,
});

export interface ClipboardLabelProps extends React.ComponentProps<typeof Ark.Label> {}

export function ClipboardLabel({ className, children, ...rest }: ClipboardLabelProps) {
  const variants = useClipboardVariants();

  return (
    <Ark.Label
      {...rest}
      data-slot="clipboard-label"
      className={cn(clipboardLabel(variants), className)}
    >
      {children}
    </Ark.Label>
  );
}
