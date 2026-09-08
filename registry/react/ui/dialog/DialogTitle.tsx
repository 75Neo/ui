import React from "react";
import { Dialog as Ark } from "@ark-ui/react/dialog";
import { cn } from "cn";
import { dialogStyles as styles } from "@/registry/shared/lib/dialog.styles";

export interface DialogTitleProps extends React.ComponentPropsWithRef<typeof Ark.Title> {}

export default function DialogTitle({ className, children, ...props }: DialogTitleProps) {
  return (
    <Ark.Title className={cn(styles.title(), className)} {...props}>
      {children}
    </Ark.Title>
  );
}
