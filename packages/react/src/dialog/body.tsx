import type React from "react";
import { cva } from "class-variance-authority";
import { cn, dialogDefaults, dialogSizeData } from "@75neo/themes";
import { useDialogVariants } from "./variants";

const dialogBody = cva("min-h-0 flex-1 overflow-y-auto overscroll-contain text-toned", {
  variants: { size: dialogSizeData.body },
  defaultVariants: dialogDefaults,
});

export interface DialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DialogBody({ className, children, ...rest }: DialogBodyProps) {
  const variants = useDialogVariants();

  return (
    <div {...rest} data-slot="dialog-body" className={cn(dialogBody(variants), className)}>
      {children}
    </div>
  );
}
