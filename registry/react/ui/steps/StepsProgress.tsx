import React from "react";
import { Steps as Ark } from "@ark-ui/react/steps";
import { cn } from "cn";
import { steps } from "@/registry/shared/lib/steps.styles";

export interface StepsProgressProps extends React.ComponentPropsWithRef<typeof Ark.Progress> {}

export default function StepsProgress({ className, children, ...props }: StepsProgressProps) {
  const styles = steps();

  return (
    <Ark.Progress className={cn(styles.progress(), className)} {...props}>
      {children}
    </Ark.Progress>
  );
}
