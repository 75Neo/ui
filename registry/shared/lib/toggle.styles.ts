import { tv } from "tailwind-variants/lite";

export type Color = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";

export const toggle = tv({
  slots: {
    root: "group/toggle inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-md font-medium text-muted transition-colors hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 data-disabled:pointer-events-none data-disabled:opacity-75 data-[size=lg]:h-10 data-[size=lg]:px-3 data-[size=lg]:text-sm data-[size=md]:h-9 data-[size=md]:px-2.5 data-[size=md]:text-sm data-[size=sm]:h-8 data-[size=sm]:px-2 data-[size=sm]:text-xs",
    indicator:
      "shrink-0 group-data-[size=lg]/toggle:size-5 group-data-[size=md]/toggle:size-4 group-data-[size=sm]/toggle:size-3.5 [&>svg]:size-full",
  },
  variants: {
    color: {
      primary: {
        root: "focus-visible:outline-primary data-[state=on]:bg-primary/10 data-[state=on]:text-primary",
      },
      secondary: {
        root: "focus-visible:outline-secondary data-[state=on]:bg-secondary/10 data-[state=on]:text-default",
      },
      success: {
        root: "focus-visible:outline-success data-[state=on]:bg-success/10 data-[state=on]:text-success",
      },
      info: {
        root: "focus-visible:outline-info data-[state=on]:bg-info/10 data-[state=on]:text-info",
      },
      warning: {
        root: "focus-visible:outline-warning data-[state=on]:bg-warning/10 data-[state=on]:text-warning",
      },
      error: {
        root: "focus-visible:outline-error data-[state=on]:bg-error/10 data-[state=on]:text-error",
      },
      neutral: {
        root: "focus-visible:outline-inverted data-[state=on]:bg-elevated data-[state=on]:text-default",
      },
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

export type ToggleSize = "sm" | "md" | "lg";

export const toggleStyles = toggle();
