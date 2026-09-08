import React from "react";
import { Splitter as Ark } from "@ark-ui/react/splitter";
import { cn } from "cn";
import { splitter } from "@/registry/shared/lib/splitter.styles";

export interface SplitterResizeTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.ResizeTrigger
> {}

export default function SplitterResizeTrigger({
  className,
  children,
  ...props
}: SplitterResizeTriggerProps) {
  const styles = splitter();

  return (
    <Ark.ResizeTrigger className={cn(styles.resizeTrigger(), className)} {...props}>
      {children}
    </Ark.ResizeTrigger>
  );
}
