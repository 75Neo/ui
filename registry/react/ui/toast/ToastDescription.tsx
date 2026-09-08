import React from "react";
import { Toast as Ark } from "@ark-ui/react/toast";
import { cn } from "cn";
import { toastStyles as styles } from "@/registry/shared/lib/toast.styles";

export interface ToastDescriptionProps extends React.ComponentPropsWithRef<
  typeof Ark.Description
> {}

export default function ToastDescription({ className, children, ...props }: ToastDescriptionProps) {
  return (
    <Ark.Description className={cn(styles.description(), className)} {...props}>
      {children}
    </Ark.Description>
  );
}
