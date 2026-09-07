import React from "react";
import { Field as Ark } from "@ark-ui/react/field";
import { cn } from "cn";
import { field } from "@/registry/shared/lib/field.styles";

export interface FieldErrorTextProps extends React.ComponentPropsWithRef<typeof Ark.ErrorText> {}

export default function FieldErrorText({ className, children, ...props }: FieldErrorTextProps) {
  const styles = field();

  return (
    <Ark.ErrorText className={cn(styles.errorText(), className)} {...props}>
      {children}
    </Ark.ErrorText>
  );
}
