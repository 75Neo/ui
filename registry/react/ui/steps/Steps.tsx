import React from "react";
import { Steps as Ark } from "@ark-ui/react/steps";
import { cn } from "cn";
import { steps } from "@/registry/shared/lib/steps.styles";

export interface StepsProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function Steps({ className, children, ...props }: StepsProps) {
  const styles = steps();

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
