import { tv } from "tailwind-variants/lite";

export type Color = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";

export const toggleGroup = tv({
  slots: {
    root: "group/toggle-group inline-flex items-center gap-1 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
    item: "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-md font-medium text-muted transition-colors group-data-[size=lg]/toggle-group:h-10 group-data-[size=lg]/toggle-group:px-3 group-data-[size=lg]/toggle-group:text-sm group-data-[size=md]/toggle-group:h-9 group-data-[size=md]/toggle-group:px-2.5 group-data-[size=md]/toggle-group:text-sm group-data-[size=sm]/toggle-group:h-8 group-data-[size=sm]/toggle-group:px-2 group-data-[size=sm]/toggle-group:text-xs hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 data-disabled:pointer-events-none data-disabled:opacity-75",
  },
  variants: {
    color: {
      primary: {
        item: "focus-visible:outline-primary data-[state=on]:bg-primary/10 data-[state=on]:text-primary",
      },
      secondary: {
        item: "focus-visible:outline-secondary data-[state=on]:bg-secondary/10 data-[state=on]:text-default",
      },
      success: {
        item: "focus-visible:outline-success data-[state=on]:bg-success/10 data-[state=on]:text-success",
      },
      info: {
        item: "focus-visible:outline-info data-[state=on]:bg-info/10 data-[state=on]:text-info",
      },
      warning: {
        item: "focus-visible:outline-warning data-[state=on]:bg-warning/10 data-[state=on]:text-warning",
      },
      error: {
        item: "focus-visible:outline-error data-[state=on]:bg-error/10 data-[state=on]:text-error",
      },
      neutral: {
        item: "focus-visible:outline-inverted data-[state=on]:bg-elevated data-[state=on]:text-default",
      },
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

export type ToggleGroupSize = "sm" | "md" | "lg";

export const toggleGroupStyles = toggleGroup();
