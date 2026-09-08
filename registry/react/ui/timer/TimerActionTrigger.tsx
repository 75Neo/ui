import React from "react";
import { Timer as Ark } from "@ark-ui/react/timer";
import { cn } from "cn";
import { timer } from "@/registry/shared/lib/timer.styles";

export interface TimerActionTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.ActionTrigger
> {}

export default function TimerActionTrigger({
  className,
  children,
  ...props
}: TimerActionTriggerProps) {
  const styles = timer();

  return (
    <Ark.ActionTrigger className={cn(styles.actionTrigger(), className)} {...props}>
      {children}
    </Ark.ActionTrigger>
  );
}
