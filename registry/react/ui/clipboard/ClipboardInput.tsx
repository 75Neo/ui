import React from "react";
import { Clipboard as Ark } from "@ark-ui/react/clipboard";
import { cn } from "cn";
import { clipboardStyles as styles } from "@/registry/shared/lib/clipboard.styles";

export interface ClipboardInputProps extends React.ComponentPropsWithRef<typeof Ark.Input> {}

export default function ClipboardInput({ className, ...props }: ClipboardInputProps) {
  return <Ark.Input className={cn(styles.input(), className)} {...props} />;
}
