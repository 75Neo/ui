import React from "react";
import { Timer as Ark } from "@ark-ui/react/timer";
import { cn } from "cn";
import { timer } from "@/registry/shared/lib/timer.styles";

export interface TimerItemProps extends React.ComponentPropsWithRef<typeof Ark.Item> {}

export default function TimerItem({ className, children, ...props }: TimerItemProps) {
  const styles = timer();

  return (
    <Ark.Item className={cn(styles.item(), className)} {...props}>
      {children}
    </Ark.Item>
  );
}
