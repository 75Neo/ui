import React from "react";
import { Field as Ark } from "@ark-ui/react/field";
import { cn } from "cn";
import { fieldStyles as styles } from "@/registry/shared/lib/field.styles";

export interface FieldRequiredIndicatorProps extends React.ComponentPropsWithRef<
  typeof Ark.RequiredIndicator
> {}

export default function FieldRequiredIndicator({
  className,
  children,
  ...props
}: FieldRequiredIndicatorProps) {
  return (
    <Ark.RequiredIndicator className={cn(styles.requiredIndicator(), className)} {...props}>
      {children}
    </Ark.RequiredIndicator>
  );
}
