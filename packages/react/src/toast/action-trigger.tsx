import type React from "react";
import { Toast as Ark } from "@ark-ui/react/toast";
import { cva } from "class-variance-authority";
import { cn, toastDefaults, toastSizeData } from "@75neo/themes";
import { useToastVariants } from "./variants";

const toastActionTrigger = cva(
  "mt-1 inline-flex cursor-pointer items-center justify-center rounded-md font-medium ring ring-current/25 transition-colors hover:bg-current/10 focus-visible:outline-3",
  {
    variants: { size: toastSizeData.actionTrigger },
    defaultVariants: toastDefaults,
  },
);

export interface ToastActionTriggerProps extends React.ComponentProps<typeof Ark.ActionTrigger> {
  children?: React.ReactNode;
}

export function ToastActionTrigger({ className, children, ...rest }: ToastActionTriggerProps) {
  const variants = useToastVariants();

  return (
    <Ark.ActionTrigger
      {...rest}
      data-slot="toast-action-trigger"
      className={cn(toastActionTrigger(variants), className)}
    >
      {children}
    </Ark.ActionTrigger>
  );
}
