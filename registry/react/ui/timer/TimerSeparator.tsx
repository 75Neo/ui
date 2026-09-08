import React from "react";
import { Timer as Ark } from "@ark-ui/react/timer";
import { cn } from "cn";
import { timerStyles as styles } from "@/registry/shared/lib/timer.styles";

export interface TimerSeparatorProps extends React.ComponentPropsWithRef<typeof Ark.Separator> {}

export default function TimerSeparator({ className, children, ...props }: TimerSeparatorProps) {
  return (
    <Ark.Separator className={cn(styles.separator(), className)} {...props}>
      {children}
    </Ark.Separator>
  );
}
