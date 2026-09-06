import type React from "react";
import { Clipboard as Ark } from "@ark-ui/react/clipboard";
import { cva } from "class-variance-authority";
import { clipboardDefaults, clipboardSizeData, cn } from "@75neo/themes";
import { useClipboardVariants } from "./variants";

const clipboardInput = cva(
  "min-w-0 flex-1 truncate bg-transparent font-mono text-toned outline-none",
  {
    variants: { size: clipboardSizeData.input },
    defaultVariants: clipboardDefaults,
  },
);

export interface ClipboardInputProps extends React.ComponentProps<typeof Ark.Input> {}

export function ClipboardInput({ className, ...rest }: ClipboardInputProps) {
  const variants = useClipboardVariants();

  return (
    <Ark.Input
      {...rest}
      data-slot="clipboard-input"
      className={cn(clipboardInput(variants), className)}
    />
  );
}
