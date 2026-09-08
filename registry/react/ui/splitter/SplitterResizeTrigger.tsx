import React from "react";
import { Splitter as Ark } from "@ark-ui/react/splitter";
import { cn } from "cn";
import { splitterStyles as styles } from "@/registry/shared/lib/splitter.styles";

export interface SplitterResizeTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.ResizeTrigger
> {}

export default function SplitterResizeTrigger({
  className,
  children,
  ...props
}: SplitterResizeTriggerProps) {
  return (
    <Ark.ResizeTrigger className={cn(styles.resizeTrigger(), className)} {...props}>
      {children}
    </Ark.ResizeTrigger>
  );
}
