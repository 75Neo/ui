import React from "react";
import { Fieldset as Ark } from "@ark-ui/react/fieldset";
import { cn } from "cn";
import { fieldsetStyles as styles } from "@/registry/shared/lib/fieldset.styles";

export interface FieldsetErrorTextProps extends React.ComponentPropsWithRef<typeof Ark.ErrorText> {}

export default function FieldsetErrorText({
  className,
  children,
  ...props
}: FieldsetErrorTextProps) {
  return (
    <Ark.ErrorText className={cn(styles.errorText(), className)} {...props}>
      {children}
    </Ark.ErrorText>
  );
}
