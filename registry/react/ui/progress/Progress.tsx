import React from "react";
import { Progress as Ark } from "@ark-ui/react/progress";
import { cn } from "cn";
import { progress, type ProgressSize, type Intent } from "@/registry/shared/lib/progress.styles";

export interface ProgressProps extends Omit<React.ComponentPropsWithRef<typeof Ark.Root>, "color"> {
  color?: Intent;
  size?: ProgressSize;
}

export default function Progress({
  color,
  size = "md",
  className,
  children,
  ...props
}: ProgressProps) {
  const styles = progress({ color });

  return (
    <Ark.Root className={cn(styles.root(), className)} data-size={size} {...props}>
      {children}
    </Ark.Root>
  );
}
