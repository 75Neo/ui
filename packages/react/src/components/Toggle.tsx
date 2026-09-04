import type React from "react";
import { Toggle as Ark, type ToggleRootProps } from "@ark-ui/react/toggle";
import { toggle, type ToggleProps as ToggleContract } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

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
    Pick<ToggleRootProps, "pressed" | "defaultPressed" | "onPressedChange">,
    ToggleContract<React.ReactNode> {}

export function Toggle({
  ui,
  variant,
  size,
  color,
  leadingIcon,
  trailingIcon,
  pressed,
  defaultPressed,
  onPressedChange,
  disabled,
  className,
  children,
  ...rest
}: ToggleProps) {
  const theme = useResolvedTheme(toggle, "toggle", { ui, variant, size, color }, className);

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
      pressed={pressed}
      defaultPressed={defaultPressed}
      onPressedChange={onPressedChange}
      disabled={disabled}
    >
      {leadingIcon != null && (
        <span data-slot="leadingIcon" className={theme.class.leadingIcon}>
          {leadingIcon}
        </span>
      )}
      {children != null && (
        <span data-slot="label" className={theme.class.label}>
          {children}
        </span>
      )}
      {trailingIcon != null && (
        <span data-slot="trailingIcon" className={theme.class.trailingIcon}>
          {trailingIcon}
        </span>
      )}
    </Ark.Root>
  );
}
