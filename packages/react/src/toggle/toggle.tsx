import type React from "react";
import { Toggle as Ark } from "@ark-ui/react/toggle";
import { cva } from "class-variance-authority";
import {
  cn,
  toggleBaseCompoundData,
  toggleDefaults,
  toggleSizeData,
  type ToggleProps as ToggleContract,
} from "@75neo/themes";

const toggleBase = cva(
  "inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-75",
  {
    variants: {
      variant: { solid: "", outline: "", soft: "", subtle: "", ghost: "" },
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: toggleSizeData.base,
    },
    compoundVariants: toggleBaseCompoundData,
    defaultVariants: toggleDefaults,
  },
);

/**
 * Props for the Toggle.
 *
 * @remarks
 * `color` is dropped from the HTML attributes: the legacy presentational attribute
 * would collide with the variant of the same name.
 *
 * The pressed state comes from Ark, because React and Vue spell a controlled value
 * too differently to share one type.
 */
export interface ToggleProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    Pick<React.ComponentProps<typeof Ark.Root>, "pressed" | "defaultPressed" | "onPressedChange">,
    ToggleContract<React.ReactNode> {}

export function Toggle({
  variant,
  color,
  size,
  leadingIcon,
  trailingIcon,
  disabled,
  pressed,
  defaultPressed,
  onPressedChange,
  className,
  children,
  ...rest
}: ToggleProps) {
  return (
    <Ark.Root
      {...rest}
      data-slot="toggle"
      data-variant={variant ?? toggleDefaults.variant}
      data-color={color ?? toggleDefaults.color}
      data-size={size ?? toggleDefaults.size}
      className={cn(toggleBase({ variant, size, color }), className)}
      pressed={pressed}
      defaultPressed={defaultPressed}
      onPressedChange={onPressedChange}
      disabled={disabled}
    >
      {leadingIcon != null && (
        <span
          data-slot="toggle-leading-icon"
          className={cn(
            "shrink-0 [&>svg]:size-full",
            toggleSizeData.leadingIcon[size ?? toggleDefaults.size],
          )}
        >
          {leadingIcon}
        </span>
      )}
      {children != null && (
        <span data-slot="toggle-label" className={cn("truncate")}>
          {children}
        </span>
      )}
      {trailingIcon != null && (
        <span
          data-slot="toggle-trailing-icon"
          className={cn(
            "shrink-0 [&>svg]:size-full",
            toggleSizeData.trailingIcon[size ?? toggleDefaults.size],
          )}
        >
          {trailingIcon}
        </span>
      )}
    </Ark.Root>
  );
}
