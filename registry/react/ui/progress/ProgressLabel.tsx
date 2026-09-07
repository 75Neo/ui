import React from "react";
import { Progress as Ark } from "@ark-ui/react/progress";
import { cn } from "cn";
import { progress } from "@/registry/shared/lib/progress.styles";

export interface ProgressLabelProps extends React.ComponentPropsWithRef<typeof Ark.Label> {}

export default function ProgressLabel({ className, children, ...props }: ProgressLabelProps) {
  const styles = progress();

  return (
    <Ark.Label className={cn(styles.label(), className)} {...props}>
      {children}
    </Ark.Label>
  );
}
