import React from "react";
import { Toast as Ark } from "@ark-ui/react/toast";
import { cn } from "cn";
import { toast } from "@/registry/shared/lib/toast.styles";

export interface ToastCloseTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.CloseTrigger
> {}

export default function ToastCloseTrigger({
  className,
  children,
  ...props
}: ToastCloseTriggerProps) {
  const styles = toast();

  return (
    <Ark.CloseTrigger className={cn(styles.closeTrigger(), className)} {...props}>
      {children}
    </Ark.CloseTrigger>
  );
}
