import React from "react";
import { Steps as Ark } from "@ark-ui/react/steps";
import { cn } from "cn";
import { steps } from "@/registry/shared/lib/steps.styles";

export interface StepsCompletedContentProps extends React.ComponentPropsWithRef<
  typeof Ark.CompletedContent
> {}

export default function StepsCompletedContent({
  className,
  children,
  ...props
}: StepsCompletedContentProps) {
  const styles = steps();

  return (
    <Ark.CompletedContent className={cn(styles.completedContent(), className)} {...props}>
      {children}
    </Ark.CompletedContent>
  );
}
