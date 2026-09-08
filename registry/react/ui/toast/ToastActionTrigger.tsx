import React from "react";
import { Toast as Ark } from "@ark-ui/react/toast";
import { cn } from "cn";
import { toast } from "@/registry/shared/lib/toast.styles";

export interface ToastActionTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.ActionTrigger
> {}

export default function ToastActionTrigger({
  className,
  children,
  ...props
}: ToastActionTriggerProps) {
  const styles = toast();

  return (
    <Ark.ActionTrigger className={cn(styles.actionTrigger(), className)} {...props}>
      {children}
    </Ark.ActionTrigger>
  );
}
