import React from "react";
import { Steps as Ark } from "@ark-ui/react/steps";
import { cn } from "cn";
import { steps } from "@/registry/shared/lib/steps.styles";

export interface StepsListProps extends React.ComponentPropsWithRef<typeof Ark.List> {}

export default function StepsList({ className, children, ...props }: StepsListProps) {
  const styles = steps();

  return (
    <Ark.List className={cn(styles.list(), className)} {...props}>
      {children}
    </Ark.List>
  );
}
