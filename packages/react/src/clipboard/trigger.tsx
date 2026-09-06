import type React from "react";
import { Clipboard as Ark } from "@ark-ui/react/clipboard";
import { cva } from "class-variance-authority";
import {
  clipboardDefaults,
  clipboardSizeData,
  clipboardTriggerCompoundData,
  cn,
  type ClipboardTriggerProps as ClipboardTriggerContract,
} from "@75neo/themes";
import { useClipboardVariants } from "./variants";
import { ClipboardIndicator } from "./indicator";

const clipboardTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm transition-colors focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-75",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: clipboardSizeData.trigger,
    },
    compoundVariants: clipboardTriggerCompoundData,
    defaultVariants: clipboardDefaults,
  },
);

export interface ClipboardTriggerProps
  extends React.ComponentProps<typeof Ark.Trigger>, ClipboardTriggerContract<React.ReactNode> {}

export function ClipboardTrigger({
  copyIcon,
  copiedIcon,
  className,
  children,
  ...rest
}: ClipboardTriggerProps) {
  const variants = useClipboardVariants();

  return (
    <Ark.Trigger
      {...rest}
      data-slot="clipboard-trigger"
      className={cn(clipboardTrigger(variants), className)}
    >
      {children ?? <ClipboardIndicator copyIcon={copyIcon} copiedIcon={copiedIcon} />}
    </Ark.Trigger>
  );
}
