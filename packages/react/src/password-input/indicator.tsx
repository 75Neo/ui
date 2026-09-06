import type React from "react";
import { PasswordInput as Ark } from "@ark-ui/react/password-input";
import { cva } from "class-variance-authority";
import { Eye } from "lucide-react";
import { cn, passwordInputDefaults, passwordInputSizeData } from "@75neo/themes";
import { usePasswordInputVariants } from "./variants";

const passwordInputIndicator = cva("inline-flex items-center justify-center [&>svg]:size-full", {
  variants: { size: passwordInputSizeData.indicator },
  defaultVariants: passwordInputDefaults,
});

export interface PasswordInputIndicatorProps extends React.ComponentProps<typeof Ark.Indicator> {}

export function PasswordInputIndicator({
  fallback,
  className,
  children,
  ...rest
}: PasswordInputIndicatorProps) {
  const variants = usePasswordInputVariants();

  return (
    <Ark.Indicator
      {...rest}
      data-slot="password-input-indicator"
      fallback={fallback}
      className={cn(passwordInputIndicator(variants), className)}
    >
      {children ?? <Eye />}
    </Ark.Indicator>
  );
}
