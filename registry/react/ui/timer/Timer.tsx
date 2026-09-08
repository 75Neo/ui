import React from "react";
import { Timer as Ark } from "@ark-ui/react/timer";
import { cn } from "cn";
import { timerStyles as styles } from "@/registry/shared/lib/timer.styles";

export interface TimerProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function Timer({ className, children, ...props }: TimerProps) {
  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
