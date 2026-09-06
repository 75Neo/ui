import type React from "react";
import { Toast as Ark } from "@ark-ui/react/toast";
import { cva } from "class-variance-authority";
import { cn, toastDefaults, toastSizeData } from "@75neo/themes";
import { useToastVariants } from "./variants";

const toastDescription = cva("opacity-80", {
  variants: { size: toastSizeData.description },
  defaultVariants: toastDefaults,
});

export interface ToastDescriptionProps extends React.ComponentProps<typeof Ark.Description> {
  children?: React.ReactNode;
}

export function ToastDescription({ className, children, ...rest }: ToastDescriptionProps) {
  const variants = useToastVariants();

  return (
    <Ark.Description
      {...rest}
      data-slot="toast-description"
      className={cn(toastDescription(variants), className)}
    >
      {children}
    </Ark.Description>
  );
}
