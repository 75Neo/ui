import type React from "react";
import { PasswordInput as Ark } from "@ark-ui/react/password-input";
import { cva } from "class-variance-authority";
import { Eye } from "lucide-react";
import { cn, passwordInputDefaults, passwordInputSizeData } from "@75neo/themes";
import { usePasswordInputVariants } from "./variants";

const passwordInputVisibilityTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm text-dimmed transition-colors outline-none hover:text-default disabled:cursor-not-allowed disabled:opacity-50 data-[state=visible]:text-default [&>svg]:size-full",
  {
    variants: { size: passwordInputSizeData.visibilityTrigger },
    defaultVariants: passwordInputDefaults,
  },
);

export interface PasswordInputVisibilityTriggerProps extends React.ComponentProps<
  typeof Ark.VisibilityTrigger
> {}

export function PasswordInputVisibilityTrigger({
  className,
  children,
  ...rest
}: PasswordInputVisibilityTriggerProps) {
  const variants = usePasswordInputVariants();

  return (
    <Ark.VisibilityTrigger
      {...rest}
      data-slot="password-input-visibility-trigger"
      className={cn(passwordInputVisibilityTrigger(variants), className)}
    >
      {children ?? <Eye />}
    </Ark.VisibilityTrigger>
  );
}
