import type React from "react";
import { cva } from "class-variance-authority";
import { cn, dialogDefaults, dialogSizeData } from "@75neo/themes";
import { useDialogVariants } from "./variants";

const dialogHeader = cva("flex shrink-0 items-start gap-3 border-b border-muted", {
  variants: { size: dialogSizeData.header },
  defaultVariants: dialogDefaults,
});

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLElement> {}

export function DialogHeader({ className, children, ...rest }: DialogHeaderProps) {
  const variants = useDialogVariants();

  return (
    <div {...rest} data-slot="dialog-header" className={cn(dialogHeader(variants), className)}>
      {children}
    </div>
  );
}
