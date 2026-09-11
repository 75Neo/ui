import { tv } from "tailwind-variants/lite";

export type Color = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";

export const ratingGroup = tv({
  slots: {
    root: "flex flex-col gap-1.5",
    label: "text-sm font-medium text-default",
    control: "flex items-center gap-0.5 data-disabled:pointer-events-none data-disabled:opacity-75",
    item: "cursor-pointer text-dimmed transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 data-disabled:pointer-events-none [&>svg]:size-5",
  },
  variants: {
    color: {
      primary: {
        item: "focus-visible:outline-primary data-checked:text-primary data-highlighted:text-primary",
      },
      secondary: {
        item: "focus-visible:outline-secondary data-checked:text-secondary data-highlighted:text-secondary",
      },
      success: {
        item: "focus-visible:outline-success data-checked:text-success data-highlighted:text-success",
      },
      info: {
        item: "focus-visible:outline-info data-checked:text-info data-highlighted:text-info",
      },
      warning: {
        item: "focus-visible:outline-warning data-checked:text-warning data-highlighted:text-warning",
      },
      error: {
        item: "focus-visible:outline-error data-checked:text-error data-highlighted:text-error",
      },
      neutral: {
        item: "focus-visible:outline-inverted data-checked:text-default data-highlighted:text-default",
      },
    },
  },
  defaultVariants: {
    color: "warning",
  },
});

export const ratingGroupStyles = ratingGroup();
