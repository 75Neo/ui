import React from "react";
import { Progress as Ark } from "@ark-ui/react/progress";
import { cn } from "cn";
import { progressStyles as styles } from "@/registry/shared/lib/progress.styles";

export interface ProgressValueTextProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.ValueText>,
  "children"
> {}

export default function ProgressValueText({ className, ...props }: ProgressValueTextProps) {
  return <Ark.ValueText className={cn(styles.valueText(), className)} {...props} />;
}
