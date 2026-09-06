import type React from "react";
import { Toast as Ark } from "@ark-ui/react/toast";
import { cva } from "class-variance-authority";
import { cn, toastDefaults, toastSizeData } from "@75neo/themes";
import { useToastVariants } from "./variants";

const toastRoot = cva(
  "relative flex w-full flex-col items-start rounded-xl bg-default text-default shadow-lg ring ring-accented outline-none data-[type=error]:bg-error data-[type=error]:text-inverted data-[type=error]:ring-error data-[type=success]:bg-success data-[type=success]:text-inverted data-[type=success]:ring-success data-[type=warning]:bg-warning data-[type=warning]:text-inverted data-[type=warning]:ring-warning",
  {
    variants: { size: toastSizeData.base },
    defaultVariants: toastDefaults,
  },
);

export interface ToastRootProps extends React.ComponentProps<typeof Ark.Root> {
  children?: React.ReactNode;
}

export function ToastRoot({ className, children, ...rest }: ToastRootProps) {
  const variants = useToastVariants();

  return (
    <Ark.Root {...rest} data-slot="toast-root" className={cn(toastRoot(variants), className)}>
      {children}
    </Ark.Root>
  );
}
