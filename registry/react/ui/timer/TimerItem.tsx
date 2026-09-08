import React from "react";
import { Timer as Ark } from "@ark-ui/react/timer";
import { cn } from "cn";
import { timerStyles as styles } from "@/registry/shared/lib/timer.styles";

export interface TimerItemProps extends React.ComponentPropsWithRef<typeof Ark.Item> {}

export default function TimerItem({ className, children, ...props }: TimerItemProps) {
  return (
    <Ark.Item className={cn(styles.item(), className)} {...props}>
      {children}
    </Ark.Item>
  );
}
