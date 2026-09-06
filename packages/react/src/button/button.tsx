import type React from "react";
import { cva } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import {
  buttonBaseCompoundData,
  buttonDefaults,
  buttonLeadingIconCompoundData,
  buttonSizeData,
  buttonTrailingIconCompoundData,
  cn,
  resolveButtonIcons,
  type ButtonProps as ButtonContract,
} from "@75neo/themes";

const buttonBase = cva(
  "inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75",
  {
    variants: {
      variant: { solid: "", outline: "", soft: "", subtle: "", ghost: "", link: "" },
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: buttonSizeData.base,
      block: { true: "w-full justify-center" },
      square: { true: "" },
      leading: { true: "" },
      trailing: { true: "" },
      loading: { true: "" },
    },
    compoundVariants: buttonBaseCompoundData,
    defaultVariants: buttonDefaults,
  },
);

const buttonLeadingIcon = cva("shrink-0 [&>svg]:size-full", {
  variants: {
    size: buttonSizeData.leadingIcon,
    loading: { true: "" },
    leading: { true: "" },
  },
  compoundVariants: buttonLeadingIconCompoundData,
  defaultVariants: buttonDefaults,
});

const buttonTrailingIcon = cva("shrink-0 [&>svg]:size-full", {
  variants: {
    size: buttonSizeData.trailingIcon,
    block: { true: "ms-auto" },
    loading: { true: "" },
    leading: { true: "" },
    trailing: { true: "" },
  },
  compoundVariants: buttonTrailingIconCompoundData,
  defaultVariants: buttonDefaults,
});

/**
 * Props for the Button.
 *
 * @remarks
 * `color` is dropped from the HTML attributes: the legacy presentational attribute
 * would collide with the variant of the same name.
 */
export interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    ButtonContract<React.ReactNode> {}

export function Button({
  variant,
  size,
  color,
  block,
  square,
  disabled,
  loading,
  leading,
  trailing,
  leadingIcon,
  trailingIcon,
  loadingIcon,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  const isLoading = Boolean(loading);
  const icons = resolveButtonIcons({
    loading: isLoading,
    leading,
    trailing,
    hasLeading: leadingIcon != null,
    hasTrailing: trailingIcon != null,
  });
  // An icon with no label wants equal padding, which is worth not having to say.
  const squareResolved = square ?? children == null;
  const shared = {
    variant,
    size,
    color,
    block,
    square: squareResolved,
    loading: isLoading,
    leading: icons.leading,
    trailing: icons.trailing,
  };

  // The icon recipe puts `animate-spin` on whichever slot is showing, so the
  // spinner only has to be placed in the same one.
  const spinner = loadingIcon ?? <LoaderCircle />;

  return (
    <button
      type={type}
      data-slot="button"
      className={cn(buttonBase(shared), className)}
      disabled={Boolean(disabled) || isLoading}
      aria-busy={isLoading || undefined}
      {...rest}
    >
      {icons.leading && (
        <span data-slot="button-leading-icon" className={cn(buttonLeadingIcon(shared))}>
          {isLoading ? spinner : leadingIcon}
        </span>
      )}
      {children != null && (
        <span data-slot="button-label" className="truncate">
          {children}
        </span>
      )}
      {icons.trailing && (
        <span data-slot="button-trailing-icon" className={cn(buttonTrailingIcon(shared))}>
          {isLoading && !icons.leading ? spinner : trailingIcon}
        </span>
      )}
    </button>
  );
}
