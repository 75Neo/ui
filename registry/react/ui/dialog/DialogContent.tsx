import React from "react";
import { Dialog as Ark } from "@ark-ui/react/dialog";
import { cn } from "cn";
import { dialog } from "@/registry/shared/lib/dialog.styles";

export interface DialogContentProps extends React.ComponentPropsWithRef<typeof Ark.Content> {}

export default function DialogContent({ className, children, ...props }: DialogContentProps) {
  const styles = dialog();

  return (
    <Ark.Content className={cn(styles.content(), className)} {...props}>
      {children}
    </Ark.Content>
  );
}
