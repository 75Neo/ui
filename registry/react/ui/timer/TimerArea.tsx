import React from "react";
import { Timer as Ark } from "@ark-ui/react/timer";
import { cn } from "cn";
import { timer } from "@/registry/shared/lib/timer.styles";

export interface TimerAreaProps extends React.ComponentPropsWithRef<typeof Ark.Area> {}

export default function TimerArea({ className, children, ...props }: TimerAreaProps) {
  const styles = timer();

  return (
    <Ark.Area className={cn(styles.area(), className)} {...props}>
      {children}
    </Ark.Area>
  );
}
