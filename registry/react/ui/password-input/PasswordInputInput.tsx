import React from "react";
import { PasswordInput as Ark } from "@ark-ui/react/password-input";
import { cn } from "cn";
import { passwordInputStyles as styles } from "@/registry/shared/lib/password-input.styles";

export interface PasswordInputInputProps extends React.ComponentPropsWithRef<typeof Ark.Input> {}

export default function PasswordInputInput({ className, ...props }: PasswordInputInputProps) {
  return <Ark.Input className={cn(styles.input(), className)} {...props} />;
}
