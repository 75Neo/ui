import type React from "react";
import { Dialog as Ark } from "@ark-ui/react/dialog";
import { cva } from "class-variance-authority";
import { cn, dialogDefaults, dialogSizeData } from "@75neo/themes";
import { useDialogVariants } from "./variants";

const dialogDescription = cva("text-muted", {
  variants: { size: dialogSizeData.description },
  defaultVariants: dialogDefaults,
});

export interface DialogDescriptionProps extends React.ComponentProps<typeof Ark.Description> {}

export function DialogDescription({ className, children, ...rest }: DialogDescriptionProps) {
  const variants = useDialogVariants();

  return (
    <Ark.Description
      {...rest}
      data-slot="dialog-description"
      className={cn(dialogDescription(variants), className)}
    >
      {children}
    </Ark.Description>
  );
}
