import React from "react";
import { Clipboard as Ark } from "@ark-ui/react/clipboard";
import { cn } from "cn";
import { clipboard } from "@/registry/shared/lib/clipboard.styles";

export interface ClipboardProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function Clipboard({ className, children, ...props }: ClipboardProps) {
  const styles = clipboard();

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
