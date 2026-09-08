import React from "react";
import { PasswordInput as Ark } from "@ark-ui/react/password-input";
import { cn } from "cn";
import { passwordInputStyles as styles } from "@/registry/shared/lib/password-input.styles";

export interface PasswordInputLabelProps extends React.ComponentPropsWithRef<typeof Ark.Label> {}

export default function PasswordInputLabel({
  className,
  children,
  ...props
}: PasswordInputLabelProps) {
  return (
    <Ark.Label className={cn(styles.label(), className)} {...props}>
      {children}
    </Ark.Label>
  );
}
