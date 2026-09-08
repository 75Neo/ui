import React from "react";
import { Progress as Ark } from "@ark-ui/react/progress";
import { cn } from "cn";
import { progressStyles as styles } from "@/registry/shared/lib/progress.styles";

export interface ProgressRangeProps extends React.ComponentPropsWithRef<typeof Ark.Range> {}

export default function ProgressRange({ className, ...props }: ProgressRangeProps) {
  return <Ark.Range className={cn(styles.range(), className)} {...props} />;
}
