import React from "react";
import { Field as Ark } from "@ark-ui/react/field";
import { cn } from "cn";
import { field } from "@/registry/shared/lib/field.styles";

export interface FieldHelperTextProps extends React.ComponentPropsWithRef<typeof Ark.HelperText> {}

export default function FieldHelperText({ className, children, ...props }: FieldHelperTextProps) {
  const styles = field();

  return (
    <Ark.HelperText className={cn(styles.helperText(), className)} {...props}>
      {children}
    </Ark.HelperText>
  );
}
