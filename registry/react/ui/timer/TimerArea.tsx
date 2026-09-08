import React from "react";
import { Timer as Ark } from "@ark-ui/react/timer";
import { cn } from "cn";
import { timerStyles as styles } from "@/registry/shared/lib/timer.styles";

export interface TimerAreaProps extends React.ComponentPropsWithRef<typeof Ark.Area> {}

export default function TimerArea({ className, children, ...props }: TimerAreaProps) {
  return (
    <Ark.Area className={cn(styles.area(), className)} {...props}>
      {children}
    </Ark.Area>
  );
}
