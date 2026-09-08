import React from "react";
import { Steps as Ark } from "@ark-ui/react/steps";
import { cn } from "cn";
import { stepsStyles as styles } from "@/registry/shared/lib/steps.styles";

export interface StepsListProps extends React.ComponentPropsWithRef<typeof Ark.List> {}

export default function StepsList({ className, children, ...props }: StepsListProps) {
  return (
    <Ark.List className={cn(styles.list(), className)} {...props}>
      {children}
    </Ark.List>
  );
}
