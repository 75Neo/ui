import React from "react";
import { Toast as Ark } from "@ark-ui/react/toast";
import { cn } from "cn";
import { toast } from "@/registry/shared/lib/toast.styles";

export interface ToastProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function Toast({ className, children, ...props }: ToastProps) {
  const styles = toast();

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
