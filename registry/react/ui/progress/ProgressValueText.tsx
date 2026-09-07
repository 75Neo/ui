import React from "react";
import { Progress as Ark } from "@ark-ui/react/progress";
import { cn } from "cn";
import { progress } from "@/registry/shared/lib/progress.styles";

export interface ProgressValueTextProps extends React.ComponentPropsWithRef<typeof Ark.ValueText> {}

export default function ProgressValueText({
  className,
  children,
  ...props
}: ProgressValueTextProps) {
  const styles = progress();

  return (
    <Ark.ValueText className={cn(styles.valueText(), className)} {...props}>
      {children}
    </Ark.ValueText>
  );
}
