import { tv } from "tailwind-variants/lite";

export type Color = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";

export const checkbox = tv({
  slots: {
    root: "group/checkbox inline-flex cursor-pointer items-center gap-2.5 text-default data-disabled:cursor-not-allowed data-disabled:opacity-75 data-[size=lg]:text-base data-[size=md]:text-sm data-[size=sm]:text-xs",
    control:
      "flex shrink-0 items-center justify-center rounded-sm ring ring-default transition-colors group-data-[size=lg]/checkbox:size-6 group-data-[size=md]/checkbox:size-5 group-data-[size=sm]/checkbox:size-4 data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-invalid:ring-error",
    indicator: "flex size-full items-center justify-center [&>svg]:size-[70%]",
    label: "leading-tight select-none",
  },
  variants: {
    color: {
      primary: {
        control:
          "text-inverted data-focus-visible:outline-primary data-[state=checked]:bg-primary data-[state=checked]:ring-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:ring-primary",
      },
      secondary: {
        control:
          "text-default data-focus-visible:outline-secondary data-[state=checked]:bg-secondary data-[state=checked]:ring-secondary data-[state=indeterminate]:bg-secondary data-[state=indeterminate]:ring-secondary",
      },
      success: {
        control:
          "text-inverted data-focus-visible:outline-success data-[state=checked]:bg-success data-[state=checked]:ring-success data-[state=indeterminate]:bg-success data-[state=indeterminate]:ring-success",
      },
      info: {
        control:
          "text-inverted data-focus-visible:outline-info data-[state=checked]:bg-info data-[state=checked]:ring-info data-[state=indeterminate]:bg-info data-[state=indeterminate]:ring-info",
      },
      warning: {
        control:
          "text-inverted data-focus-visible:outline-warning data-[state=checked]:bg-warning data-[state=checked]:ring-warning data-[state=indeterminate]:bg-warning data-[state=indeterminate]:ring-warning",
      },
      error: {
        control:
          "text-inverted data-focus-visible:outline-error data-[state=checked]:bg-error data-[state=checked]:ring-error data-[state=indeterminate]:bg-error data-[state=indeterminate]:ring-error",
      },
      neutral: {
        control:
          "text-inverted data-focus-visible:outline-inverted data-[state=checked]:bg-inverted data-[state=checked]:ring-inverted data-[state=indeterminate]:bg-inverted data-[state=indeterminate]:ring-inverted",
      },
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

export type CheckboxSize = "sm" | "md" | "lg";

export const checkboxStyles = checkbox();
