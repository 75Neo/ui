import type React from "react";
import { Toast as Ark } from "@ark-ui/react/toast";
import { cva } from "class-variance-authority";
import { cn, toastDefaults, toastSizeData } from "@75neo/themes";
import { useToastVariants } from "./variants";

const toastTitle = cva("font-semibold", {
  variants: { size: toastSizeData.title },
  defaultVariants: toastDefaults,
});

export interface ToastTitleProps extends React.ComponentProps<typeof Ark.Title> {
  children?: React.ReactNode;
}

export function ToastTitle({ className, children, ...rest }: ToastTitleProps) {
  const variants = useToastVariants();

  return (
    <Ark.Title {...rest} data-slot="toast-title" className={cn(toastTitle(variants), className)}>
      {children}
    </Ark.Title>
  );
}
