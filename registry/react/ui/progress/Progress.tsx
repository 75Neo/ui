import React from "react";
import { Progress as Ark } from "@ark-ui/react/progress";
import { cn } from "cn";
import { progress, type ProgressSize } from "@/registry/shared/lib/progress.styles";

export interface ProgressProps extends React.ComponentPropsWithRef<typeof Ark.Root> {
  size?: ProgressSize;
}

export default function Progress({ size = "md", className, children, ...props }: ProgressProps) {
  const styles = progress();

  return (
    <Ark.Root className={cn(styles.root(), className)} data-size={size} {...props}>
      {children}
    </Ark.Root>
  );
}
