import type React from "react";
import { Dialog as Ark } from "@ark-ui/react/dialog";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { cn, dialogDefaults, dialogSizeData } from "@75neo/themes";
import { useDialogVariants } from "./variants";

const dialogCloseTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed outline-primary/25 transition-colors hover:bg-elevated hover:text-default focus-visible:outline-3 disabled:cursor-not-allowed [&>svg]:size-full",
  {
    variants: { size: dialogSizeData.closeTrigger },
    defaultVariants: dialogDefaults,
  },
);

export interface DialogCloseTriggerProps extends React.ComponentProps<typeof Ark.CloseTrigger> {}

export function DialogCloseTrigger({ className, children, ...rest }: DialogCloseTriggerProps) {
  const variants = useDialogVariants();

  return (
    <Ark.CloseTrigger
      {...rest}
      aria-label="Close dialog"
      data-slot="dialog-close-trigger"
      className={cn(dialogCloseTrigger(variants), className)}
    >
      {children ?? <X />}
    </Ark.CloseTrigger>
  );
}
