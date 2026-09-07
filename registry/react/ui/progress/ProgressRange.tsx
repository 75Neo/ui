import React from "react";
import { Progress as Ark } from "@ark-ui/react/progress";
import { cn } from "cn";
import { progress } from "@/registry/shared/lib/progress.styles";

export interface ProgressRangeProps extends React.ComponentPropsWithRef<typeof Ark.Range> {}

export default function ProgressRange({ className, ...props }: ProgressRangeProps) {
  const styles = progress();

  return <Ark.Range className={cn(styles.range(), className)} {...props} />;
}
