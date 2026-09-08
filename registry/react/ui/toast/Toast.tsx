import React from "react";
import { Toast as Ark } from "@ark-ui/react/toast";
import { cn } from "cn";
import { toastStyles as styles } from "@/registry/shared/lib/toast.styles";

export interface ToastProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function Toast({ className, children, ...props }: ToastProps) {
  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
