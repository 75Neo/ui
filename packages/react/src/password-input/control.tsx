import type React from "react";
import { PasswordInput as Ark } from "@ark-ui/react/password-input";
import { cva } from "class-variance-authority";
import {
  cn,
  passwordInputControlCompoundData,
  passwordInputDefaults,
  passwordInputSizeData,
} from "@75neo/themes";
import { usePasswordInputVariants } from "./variants";

const passwordInputControl = cva(
  "flex w-full min-w-0 items-center bg-default ring ring-accented ring-inset data-disabled:cursor-not-allowed data-disabled:opacity-75 data-invalid:ring-error",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: passwordInputSizeData.control,
    },
    compoundVariants: passwordInputControlCompoundData,
    defaultVariants: passwordInputDefaults,
  },
);

export interface PasswordInputControlProps extends React.ComponentProps<typeof Ark.Control> {}

export function PasswordInputControl({ className, children, ...rest }: PasswordInputControlProps) {
  const variants = usePasswordInputVariants();

  return (
    <Ark.Control
      {...rest}
      data-slot="password-input-control"
      className={cn(passwordInputControl(variants), className)}
    >
      {children}
    </Ark.Control>
  );
}
