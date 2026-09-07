import React from "react";
import { Dialog as Ark } from "@ark-ui/react/dialog";
import { cn } from "cn";
import { dialog } from "@/registry/shared/lib/dialog.styles";

export interface DialogBackdropProps extends React.ComponentPropsWithRef<typeof Ark.Backdrop> {}

export default function DialogBackdrop({ className, ...props }: DialogBackdropProps) {
  const styles = dialog();

  return <Ark.Backdrop className={cn(styles.backdrop(), className)} {...props} />;
}
