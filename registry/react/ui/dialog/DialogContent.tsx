import React from "react";
import { Dialog as Ark } from "@ark-ui/react/dialog";
import { cn } from "cn";
import { dialog, type DialogSize } from "@/registry/shared/lib/dialog.styles";

export interface DialogContentProps extends React.ComponentPropsWithRef<typeof Ark.Content> {
  size?: DialogSize;
}

export default function DialogContent({ size, className, children, ...props }: DialogContentProps) {
  const styles = dialog({ size });

  return (
    <Ark.Content className={cn(styles.content(), className)} {...props}>
      {children}
    </Ark.Content>
  );
}
