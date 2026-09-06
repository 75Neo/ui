import type React from "react";
import { Clipboard as Ark } from "@ark-ui/react/clipboard";
import { cva } from "class-variance-authority";
import { clipboardDefaults, clipboardSizeData, cn } from "@75neo/themes";
import { useClipboardVariants } from "./variants";

const clipboardControl = cva(
  "flex min-w-0 items-center gap-2 rounded-md bg-default ring ring-accented ring-inset",
  {
    variants: { size: clipboardSizeData.control },
    defaultVariants: clipboardDefaults,
  },
);

export interface ClipboardControlProps extends React.ComponentProps<typeof Ark.Control> {}

export function ClipboardControl({ className, children, ...rest }: ClipboardControlProps) {
  const variants = useClipboardVariants();

  return (
    <Ark.Control
      {...rest}
      data-slot="clipboard-control"
      className={cn(clipboardControl(variants), className)}
    >
      {children}
    </Ark.Control>
  );
}
