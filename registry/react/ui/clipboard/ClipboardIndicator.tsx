import React from "react";
import { Clipboard as Ark } from "@ark-ui/react/clipboard";
import { cn } from "cn";
import { clipboardStyles as styles } from "@/registry/shared/lib/clipboard.styles";

export interface ClipboardIndicatorProps extends React.ComponentPropsWithRef<
  typeof Ark.Indicator
> {}

export default function ClipboardIndicator({
  className,
  children,
  ...props
}: ClipboardIndicatorProps) {
  return (
    <Ark.Indicator className={cn(styles.indicator(), className)} {...props}>
      {children}
    </Ark.Indicator>
  );
}
