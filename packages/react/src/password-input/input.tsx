import type React from "react";
import { PasswordInput as Ark } from "@ark-ui/react/password-input";
import { cva } from "class-variance-authority";
import { cn, passwordInputDefaults, passwordInputSizeData } from "@75neo/themes";
import { usePasswordInputVariants } from "./variants";

const passwordInputInput = cva(
  "min-w-0 flex-1 bg-transparent text-highlighted outline-none placeholder:text-dimmed disabled:cursor-not-allowed",
  {
    variants: { size: passwordInputSizeData.input },
    defaultVariants: passwordInputDefaults,
  },
);

export interface PasswordInputInputProps extends React.ComponentProps<typeof Ark.Input> {
  /** Shown while the field is empty. */
  placeholder?: string;
}

export function PasswordInputInput({ placeholder, className, ...rest }: PasswordInputInputProps) {
  const variants = usePasswordInputVariants();

  return (
    <Ark.Input
      {...rest}
      data-slot="password-input-input"
      placeholder={placeholder}
      className={cn(passwordInputInput(variants), className)}
    />
  );
}
