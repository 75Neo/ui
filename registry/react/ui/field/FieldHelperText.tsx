import React from "react";
import { Field as Ark } from "@ark-ui/react/field";
import { cn } from "cn";
import { fieldStyles as styles } from "@/registry/shared/lib/field.styles";

export interface FieldHelperTextProps extends React.ComponentPropsWithRef<typeof Ark.HelperText> {}

export default function FieldHelperText({ className, children, ...props }: FieldHelperTextProps) {
  return (
    <Ark.HelperText className={cn(styles.helperText(), className)} {...props}>
      {children}
    </Ark.HelperText>
  );
}
