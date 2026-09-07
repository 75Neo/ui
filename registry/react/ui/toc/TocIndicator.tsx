import React from "react";
import { Toc as Ark } from "@ark-ui/react/toc";
import { cn } from "cn";
import { toc } from "@/registry/shared/lib/toc.styles";

export interface TocIndicatorProps extends React.ComponentPropsWithRef<"li"> {}

export default function TocIndicator({ className, ...props }: TocIndicatorProps) {
  const styles = toc();

  return (
    <Ark.Indicator asChild>
      <li aria-hidden className={cn(styles.indicator(), className)} {...props} />
    </Ark.Indicator>
  );
}
