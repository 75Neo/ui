import React from "react";
import { Clipboard as Ark } from "@ark-ui/react/clipboard";
import { cn } from "cn";
import { clipboard } from "@/registry/shared/lib/clipboard.styles";

export interface ClipboardTriggerProps extends React.ComponentPropsWithRef<typeof Ark.Trigger> {}

export default function ClipboardTrigger({ className, children, ...props }: ClipboardTriggerProps) {
  const styles = clipboard();

  return (
    <Ark.Trigger className={cn(styles.trigger(), className)} {...props}>
      {children}
    </Ark.Trigger>
  );
}
