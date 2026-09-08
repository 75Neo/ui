import React from "react";
import { Toast as Ark } from "@ark-ui/react/toast";
import { cn } from "cn";
import { toast } from "@/registry/shared/lib/toast.styles";

export interface ToastDescriptionProps extends React.ComponentPropsWithRef<
  typeof Ark.Description
> {}

export default function ToastDescription({ className, children, ...props }: ToastDescriptionProps) {
  const styles = toast();

  return (
    <Ark.Description className={cn(styles.description(), className)} {...props}>
      {children}
    </Ark.Description>
  );
}
