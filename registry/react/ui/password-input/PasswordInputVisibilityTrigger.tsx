import React from "react";
import { PasswordInput as Ark } from "@ark-ui/react/password-input";
import { cn } from "cn";
import { passwordInput } from "@/registry/shared/lib/password-input.styles";

export interface PasswordInputVisibilityTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.VisibilityTrigger
> {}

export default function PasswordInputVisibilityTrigger({
  className,
  children,
  ...props
}: PasswordInputVisibilityTriggerProps) {
  const styles = passwordInput();

  return (
    <Ark.VisibilityTrigger className={cn(styles.visibilityTrigger(), className)} {...props}>
      {children}
    </Ark.VisibilityTrigger>
  );
}
