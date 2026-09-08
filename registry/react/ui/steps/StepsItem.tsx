import React from "react";
import { Steps as Ark } from "@ark-ui/react/steps";
import { cn } from "cn";
import { stepsStyles as styles } from "@/registry/shared/lib/steps.styles";

export interface StepsItemProps extends React.ComponentPropsWithRef<typeof Ark.Item> {}

export default function StepsItem({ className, children, ...props }: StepsItemProps) {
  return (
    <Ark.Item className={cn(styles.item(), className)} {...props}>
      {children}
    </Ark.Item>
  );
}
