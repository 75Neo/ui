import type React from "react";
import { Dialog as Ark } from "@ark-ui/react/dialog";
import { cva } from "class-variance-authority";
import { cn, dialogDefaults, dialogSizeData } from "@75neo/themes";
import { useDialogVariants } from "./variants";

const dialogTitle = cva("font-semibold text-highlighted", {
  variants: { size: dialogSizeData.title },
  defaultVariants: dialogDefaults,
});

export interface DialogTitleProps extends React.ComponentProps<typeof Ark.Title> {}

export function DialogTitle({ className, children, ...rest }: DialogTitleProps) {
  const variants = useDialogVariants();

  return (
    <Ark.Title {...rest} data-slot="dialog-title" className={cn(dialogTitle(variants), className)}>
      {children}
    </Ark.Title>
  );
}
