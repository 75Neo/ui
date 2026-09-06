import type React from "react";
import { PasswordInput as Ark } from "@ark-ui/react/password-input";
import { cn } from "@75neo/themes";

export interface PasswordInputLabelProps extends React.ComponentProps<typeof Ark.Label> {}

export function PasswordInputLabel({ className, children, ...rest }: PasswordInputLabelProps) {
  return (
    <Ark.Label
      {...rest}
      data-slot="password-input-label"
      className={cn("font-medium text-highlighted select-none", className)}
    >
      {children}
    </Ark.Label>
  );
}
