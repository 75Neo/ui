import React from "react";
import { PasswordInput as Ark } from "@ark-ui/react/password-input";
import { cn } from "cn";
import { passwordInput } from "@/registry/shared/lib/password-input.styles";

export interface PasswordInputIndicatorProps extends React.ComponentPropsWithRef<
  typeof Ark.Indicator
> {}

export default function PasswordInputIndicator({
  className,
  children,
  ...props
}: PasswordInputIndicatorProps) {
  const styles = passwordInput();

  return (
    <Ark.Indicator className={cn(styles.indicator(), className)} {...props}>
      {children}
    </Ark.Indicator>
  );
}
