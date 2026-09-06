import type React from "react";
import { cva } from "class-variance-authority";
import { cn, dialogDefaults, dialogSizeData } from "@75neo/themes";
import { useDialogVariants } from "./variants";

const dialogFooter = cva(
  "flex shrink-0 flex-wrap items-center justify-end gap-2 border-t border-muted bg-muted/40",
  {
    variants: { size: dialogSizeData.footer },
    defaultVariants: dialogDefaults,
  },
);

export interface DialogFooterProps extends React.HTMLAttributes<HTMLElement> {}

export function DialogFooter({ className, children, ...rest }: DialogFooterProps) {
  const variants = useDialogVariants();

  return (
    <footer {...rest} data-slot="dialog-footer" className={cn(dialogFooter(variants), className)}>
      {children}
    </footer>
  );
}
