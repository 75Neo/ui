import React from "react";
import { Steps as Ark } from "@ark-ui/react/steps";
import { cn } from "cn";
import { stepsStyles as styles } from "@/registry/shared/lib/steps.styles";

export interface StepsSeparatorProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.Separator>,
  "children"
> {}

export default function StepsSeparator({ className, ...props }: StepsSeparatorProps) {
  return <Ark.Separator className={cn(styles.separator(), className)} {...props} />;
}
