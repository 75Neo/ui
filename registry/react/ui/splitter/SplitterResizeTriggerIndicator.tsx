import React from "react";
import { Splitter as Ark } from "@ark-ui/react/splitter";
import { cn } from "cn";
import { splitter } from "@/registry/shared/lib/splitter.styles";

export interface SplitterResizeTriggerIndicatorProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.ResizeTriggerIndicator>,
  "children"
> {}

export default function SplitterResizeTriggerIndicator({
  className,
  ...props
}: SplitterResizeTriggerIndicatorProps) {
  const styles = splitter();

  return (
    <Ark.ResizeTriggerIndicator
      className={cn(styles.resizeTriggerIndicator(), className)}
      {...props}
    />
  );
}
