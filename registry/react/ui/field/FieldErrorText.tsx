import React from "react";
import { Field as Ark } from "@ark-ui/react/field";
import { cn } from "cn";
import { fieldStyles as styles } from "@/registry/shared/lib/field.styles";

export interface FieldErrorTextProps extends React.ComponentPropsWithRef<typeof Ark.ErrorText> {}

export default function FieldErrorText({ className, children, ...props }: FieldErrorTextProps) {
  return (
    <Ark.ErrorText className={cn(styles.errorText(), className)} {...props}>
      {children}
    </Ark.ErrorText>
  );
}
