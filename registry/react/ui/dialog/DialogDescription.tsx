import React from "react";
import { Dialog as Ark } from "@ark-ui/react/dialog";
import { cn } from "cn";
import { dialogStyles as styles } from "@/registry/shared/lib/dialog.styles";

export interface DialogDescriptionProps extends React.ComponentPropsWithRef<
  typeof Ark.Description
> {}

export default function DialogDescription({
  className,
  children,
  ...props
}: DialogDescriptionProps) {
  return (
    <Ark.Description className={cn(styles.description(), className)} {...props}>
      {children}
    </Ark.Description>
  );
}
