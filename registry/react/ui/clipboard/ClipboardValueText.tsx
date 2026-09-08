import React from "react";
import { Clipboard as Ark } from "@ark-ui/react/clipboard";
import { cn } from "cn";
import { clipboardStyles as styles } from "@/registry/shared/lib/clipboard.styles";

export interface ClipboardValueTextProps extends React.ComponentPropsWithRef<
  typeof Ark.ValueText
> {}

export default function ClipboardValueText({ className, ...props }: ClipboardValueTextProps) {
  return <Ark.ValueText className={cn(styles.valueText(), className)} {...props} />;
}
