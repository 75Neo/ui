import React from "react";
import { PasswordInput as Ark } from "@ark-ui/react/password-input";
import { cn } from "cn";
import { passwordInputStyles as styles } from "@/registry/shared/lib/password-input.styles";

export interface PasswordInputControlProps extends React.ComponentPropsWithRef<
  typeof Ark.Control
> {}

export default function PasswordInputControl({
  className,
  children,
  ...props
}: PasswordInputControlProps) {
  return (
    <Ark.Control className={cn(styles.control(), className)} {...props}>
      {children}
    </Ark.Control>
  );
}
