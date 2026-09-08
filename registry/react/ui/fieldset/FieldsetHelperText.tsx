import React from "react";
import { Fieldset as Ark } from "@ark-ui/react/fieldset";
import { cn } from "cn";
import { fieldsetStyles as styles } from "@/registry/shared/lib/fieldset.styles";

export interface FieldsetHelperTextProps extends React.ComponentPropsWithRef<
  typeof Ark.HelperText
> {}

export default function FieldsetHelperText({
  className,
  children,
  ...props
}: FieldsetHelperTextProps) {
  return (
    <Ark.HelperText className={cn(styles.helperText(), className)} {...props}>
      {children}
    </Ark.HelperText>
  );
}
