import React from "react";
import { PasswordInput as Ark } from "@ark-ui/react/password-input";
import { cn } from "cn";
import { passwordInput } from "@/registry/shared/lib/password-input.styles";

export interface PasswordInputProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function PasswordInput({ className, children, ...props }: PasswordInputProps) {
  const styles = passwordInput();

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
