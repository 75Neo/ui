import React from "react";
import { Steps as Ark } from "@ark-ui/react/steps";
import { cn } from "cn";
import { stepsStyles as styles } from "@/registry/shared/lib/steps.styles";

export interface StepsContentProps extends React.ComponentPropsWithRef<typeof Ark.Content> {}

export default function StepsContent({ className, children, ...props }: StepsContentProps) {
  return (
    <Ark.Content className={cn(styles.content(), className)} {...props}>
      {children}
    </Ark.Content>
  );
}
