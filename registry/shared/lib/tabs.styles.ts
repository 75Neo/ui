import { tv } from "tailwind-variants/lite";

export type Color = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";

export const tabs = tv({
  slots: {
    root: "flex w-full min-w-0 flex-col gap-4 data-[orientation=vertical]:flex-row",
    list: "relative flex min-w-0 shrink-0 items-center gap-1 border-b border-default data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch data-[orientation=vertical]:border-e data-[orientation=vertical]:border-b-0",
    trigger:
      "inline-flex cursor-pointer items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 data-disabled:pointer-events-none data-disabled:opacity-75",
    indicator:
      "absolute -bottom-px left-(--left) h-0.5 w-(--width) rounded-full transition-[left,top,width,height] duration-200 ease-out data-[orientation=vertical]:-end-px data-[orientation=vertical]:top-(--top) data-[orientation=vertical]:bottom-auto data-[orientation=vertical]:left-auto data-[orientation=vertical]:h-(--height) data-[orientation=vertical]:w-0.5",
    content: "min-w-0 focus-visible:outline-none",
  },
  variants: {
    color: {
      primary: {
        trigger: "focus-visible:outline-primary data-selected:text-primary",
        indicator: "bg-primary",
      },
      secondary: {
        trigger: "focus-visible:outline-secondary data-selected:text-default",
        indicator: "bg-secondary",
      },
      success: {
        trigger: "focus-visible:outline-success data-selected:text-success",
        indicator: "bg-success",
      },
      info: {
        trigger: "focus-visible:outline-info data-selected:text-info",
        indicator: "bg-info",
      },
      warning: {
        trigger: "focus-visible:outline-warning data-selected:text-warning",
        indicator: "bg-warning",
      },
      error: {
        trigger: "focus-visible:outline-error data-selected:text-error",
        indicator: "bg-error",
      },
      neutral: {
        trigger: "focus-visible:outline-inverted data-selected:text-default",
        indicator: "bg-inverted",
      },
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

export const tabsStyles = tabs();
