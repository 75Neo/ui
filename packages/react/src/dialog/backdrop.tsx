import type React from "react";
import { Dialog as Ark } from "@ark-ui/react/dialog";
import { cva } from "class-variance-authority";
import { cn } from "@75neo/themes";

const dialogBackdrop = cva("fixed inset-0 bg-inverted/40 backdrop-blur-[2px]", {
  variants: {
    transition: {
      true: "data-[state=closed]:animate-overlay-out data-[state=open]:animate-overlay-in",
      false: "",
    },
  },
  defaultVariants: { transition: true },
});

export interface DialogBackdropProps extends React.ComponentProps<typeof Ark.Backdrop> {
  /** @defaultValue `true` */
  transition?: boolean;
}

export function DialogBackdrop({ transition, className, ...rest }: DialogBackdropProps) {
  return (
    <Ark.Backdrop
      {...rest}
      data-slot="dialog-backdrop"
      className={cn(dialogBackdrop({ transition }), className)}
    />
  );
}
