import type React from "react";
import { Toast as Ark } from "@ark-ui/react/toast";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { cn, toastDefaults, toastSizeData } from "@75neo/themes";
import { useToastVariants } from "./variants";

const toastCloseTrigger = cva(
  "absolute inset-e-2 top-2 inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md opacity-60 outline-current/25 transition-opacity hover:opacity-100 focus-visible:outline-3 [&>svg]:size-full",
  {
    variants: { size: toastSizeData.closeTrigger },
    defaultVariants: toastDefaults,
  },
);

export interface ToastCloseTriggerProps extends React.ComponentProps<typeof Ark.CloseTrigger> {
  children?: React.ReactNode;
}

export function ToastCloseTrigger({ className, children, ...rest }: ToastCloseTriggerProps) {
  const variants = useToastVariants();

  return (
    <Ark.CloseTrigger
      {...rest}
      aria-label="Close toast"
      data-slot="toast-close-trigger"
      className={cn(toastCloseTrigger(variants), className)}
    >
      {children ?? <X />}
    </Ark.CloseTrigger>
  );
}
