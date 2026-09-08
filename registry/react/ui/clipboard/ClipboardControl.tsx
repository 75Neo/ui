import React from "react";
import { Clipboard as Ark } from "@ark-ui/react/clipboard";
import { cn } from "cn";
import { clipboardStyles as styles } from "@/registry/shared/lib/clipboard.styles";

export interface ClipboardControlProps extends React.ComponentPropsWithRef<typeof Ark.Control> {}

export default function ClipboardControl({ className, children, ...props }: ClipboardControlProps) {
  return (
    <Ark.Control className={cn(styles.control(), className)} {...props}>
      {children}
    </Ark.Control>
  );
}
