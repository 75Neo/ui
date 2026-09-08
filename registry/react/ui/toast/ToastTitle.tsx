import React from "react";
import { Toast as Ark } from "@ark-ui/react/toast";
import { cn } from "cn";
import { toastStyles as styles } from "@/registry/shared/lib/toast.styles";

export interface ToastTitleProps extends React.ComponentPropsWithRef<typeof Ark.Title> {}

export default function ToastTitle({ className, children, ...props }: ToastTitleProps) {
  return (
    <Ark.Title className={cn(styles.title(), className)} {...props}>
      {children}
    </Ark.Title>
  );
}
