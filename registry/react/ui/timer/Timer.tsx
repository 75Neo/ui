import React from "react";
import { Timer as Ark } from "@ark-ui/react/timer";
import { cn } from "cn";
import { timer } from "@/registry/shared/lib/timer.styles";

export interface TimerProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function Timer({ className, children, ...props }: TimerProps) {
  const styles = timer();

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
