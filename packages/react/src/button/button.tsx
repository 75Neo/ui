import type { ButtonSlots, ButtonVariants } from "@75neo/styles";
import { ark, type HTMLArkProps } from "@ark-ui/react/factory";
import { LoaderCircleIcon, type LucideIcon } from "lucide-react";
import type { ComponentType } from "react";
import { useComponentTheme } from "../theme";

/** A Lucide icon, or any component that renders one. */
export type IconComponent = LucideIcon | ComponentType<{ className?: string }>;

export interface ButtonProps
  // `color` is omitted because React types it as the HTML attribute of that name;
  // here it is the palette. `content` is not relevant to a button.
  extends Omit<HTMLArkProps<"button">, "color">, ButtonVariants {
  /** The button's text. Ignored when `children` is given. */
  label?: string;
  /** Shown on whichever side `leading`/`trailing` selects — leading by default. */
  icon?: IconComponent;
  /** Forces `icon` to the leading side. */
  leading?: boolean;
  /** Shown before the label, whatever `icon` is doing. */
  leadingIcon?: IconComponent;
  /** Forces `icon` to the trailing side. */
  trailing?: boolean;
  /** Shown after the label, whatever `icon` is doing. */
  trailingIcon?: IconComponent;
  /** Replaces whichever icon is showing with a spinner, and disables the button. */
  loading?: boolean;
  /** The spinner. Defaults to Lucide's `loader-circle`. */
  loadingIcon?: IconComponent;
  /**
   * Per-slot class overrides — `{ label: "font-bold" }`. Merged over the theme and
   * under `className`, which reaches the root element.
   */
  ui?: ButtonSlots;
}

/**
 * Ark's polymorphic `button` (so `asChild` works) wearing the shared `button` theme.
 *
 * A label, an icon on either side, a loading state that replaces whichever icon is
 * showing, and `square` inferred when there is nothing but an icon.
 *
 * The three class sources are merged in ascending priority — theme, then `ui`, then
 * `className` — and `tailwind-merge` drops whichever loses each conflict, so a caller
 * passing `className="px-8"` replaces the size variant's padding without knowing it was
 * there.
 */
export const Button = ({
  label = undefined,
  icon: Icon = undefined,
  leading = undefined,
  leadingIcon = undefined,
  trailing = undefined,
  trailingIcon = undefined,
  loading = undefined,
  loadingIcon: LoadingIcon = LoaderCircleIcon,
  color = undefined,
  variant = undefined,
  size = undefined,
  block = undefined,
  square = undefined,
  ui = undefined,
  className = undefined,
  children = undefined,
  disabled = undefined,
  ...rest
}: ButtonProps) => {
  const theme = useComponentTheme("button");

  /*
   * Which side each icon lands on: a bare `icon` leads unless `trailing` says
   * otherwise, `leadingIcon`/`trailingIcon` are absolute, and the spinner takes over
   * whichever side is already occupied.
   */
  const isLeading = Boolean(
    (Icon && leading) || (Icon && !trailing) || (loading && !trailing) || leadingIcon,
  );
  const isTrailing = Boolean(
    (Icon && trailing) || (loading && trailing) || (trailingIcon && trailing !== false),
  );

  const LeadingIcon = loading ? LoadingIcon : (leadingIcon ?? Icon);
  const TrailingIcon = loading && !isLeading ? LoadingIcon : (trailingIcon ?? Icon);

  const slots = theme({
    color,
    variant,
    size,
    block,
    loading,
    leading: isLeading,
    trailing: isTrailing,
    // An icon on its own gets equal padding, so the caller does not have to say so.
    square: square ?? (children === undefined && label === undefined),
  });

  return (
    <ark.button
      className={slots.base({ class: [ui?.base, className] })}
      disabled={disabled ?? loading}
      {...rest}
    >
      {isLeading && LeadingIcon && (
        <LeadingIcon
          className={slots.leadingIcon({ class: ui?.leadingIcon })}
          aria-hidden="true"
          focusable="false"
        />
      )}

      {children ??
        (label === undefined ? null : (
          <span className={slots.label({ class: ui?.label })}>{label}</span>
        ))}

      {isTrailing && TrailingIcon && (
        <TrailingIcon
          className={slots.trailingIcon({ class: ui?.trailingIcon })}
          aria-hidden="true"
          focusable="false"
        />
      )}
    </ark.button>
  );
};

Button.displayName = "Button";
