import { tv } from "tailwind-variants/lite";

export type Color = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";

export const switchRecipe = tv({
  slots: {
    root: "group/switch inline-flex cursor-pointer items-center gap-2.5 text-default data-disabled:cursor-not-allowed data-disabled:opacity-75 data-[size=lg]:text-base data-[size=md]:text-sm data-[size=sm]:text-xs",
    control:
      "flex shrink-0 items-center rounded-full bg-accented p-0.5 transition-colors group-data-[size=lg]/switch:h-6 group-data-[size=lg]/switch:w-11 group-data-[size=md]/switch:h-5 group-data-[size=md]/switch:w-9 group-data-[size=sm]/switch:h-4 group-data-[size=sm]/switch:w-7 data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-invalid:bg-error",
    thumb:
      "rounded-full bg-elevated shadow-sm transition-transform duration-200 ease-out group-data-[size=lg]/switch:size-5 group-data-[size=md]/switch:size-4 group-data-[size=sm]/switch:size-3 data-[state=checked]:translate-x-full",
    label: "leading-tight select-none",
  },
  variants: {
    color: {
      primary: {
        control: "data-focus-visible:outline-primary data-[state=checked]:bg-primary",
      },
      secondary: {
        control: "data-focus-visible:outline-secondary data-[state=checked]:bg-secondary",
      },
      success: {
        control: "data-focus-visible:outline-success data-[state=checked]:bg-success",
      },
      info: {
        control: "data-focus-visible:outline-info data-[state=checked]:bg-info",
      },
      warning: {
        control: "data-focus-visible:outline-warning data-[state=checked]:bg-warning",
      },
      error: {
        control: "data-focus-visible:outline-error data-[state=checked]:bg-error",
      },
      neutral: {
        control: "data-focus-visible:outline-inverted data-[state=checked]:bg-inverted",
      },
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

export type SwitchSize = "sm" | "md" | "lg";

export const switchStyles = switchRecipe();
