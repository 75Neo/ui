import React from "react";
import { Steps as Ark } from "@ark-ui/react/steps";
import { cn } from "cn";
import { steps } from "@/registry/shared/lib/steps.styles";

export interface StepsItemProps extends React.ComponentPropsWithRef<typeof Ark.Item> {}

export default function StepsItem({ className, children, ...props }: StepsItemProps) {
  const styles = steps();

  return (
    <Ark.Item className={cn(styles.item(), className)} {...props}>
      {children}
    </Ark.Item>
  );
}
