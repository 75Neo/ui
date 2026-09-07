import React from "react";
import { Clipboard as Ark } from "@ark-ui/react/clipboard";
import { cn } from "cn";
import { clipboard } from "@/registry/shared/lib/clipboard.styles";

export interface ClipboardIndicatorProps extends React.ComponentPropsWithRef<
  typeof Ark.Indicator
> {}

export default function ClipboardIndicator({
  className,
  children,
  ...props
}: ClipboardIndicatorProps) {
  const styles = clipboard();

  return (
    <Ark.Indicator className={cn(styles.indicator(), className)} {...props}>
      {children}
    </Ark.Indicator>
  );
}
