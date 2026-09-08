import { tv } from "tailwind-variants/lite";

export const drawer = tv({
  slots: {
    backdrop:
      "fixed inset-0 z-50 bg-inverted/40 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in",
    positioner:
      "fixed inset-0 z-50 flex data-[swipe-direction=down]:items-end data-[swipe-direction=left]:justify-start data-[swipe-direction=right]:justify-end data-[swipe-direction=up]:items-start",
    content:
      "relative flex flex-col gap-4 bg-elevated p-6 shadow-lg ring ring-default focus-visible:outline-none data-[state=closed]:animate-drawer-out data-[state=open]:animate-drawer-in data-[swipe-direction=down]:h-auto data-[swipe-direction=down]:w-full data-[swipe-direction=down]:[--drawer-from:0_100%] data-[swipe-direction=left]:h-full data-[swipe-direction=left]:w-full data-[swipe-direction=left]:[--drawer-from:-100%_0] data-[swipe-direction=right]:h-full data-[swipe-direction=right]:w-full data-[swipe-direction=right]:[--drawer-from:100%_0] data-[swipe-direction=up]:h-auto data-[swipe-direction=up]:w-full data-[swipe-direction=up]:[--drawer-from:0_-100%]",
    title: "text-base font-semibold text-default",
    description: "text-sm leading-6 text-muted",
    grabber: "flex shrink-0 cursor-grab justify-center py-1",
    grabberIndicator: "h-1 w-10 rounded-full bg-accented",
    closeTrigger:
      "absolute end-4 top-4 inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus [&>svg]:size-4",
  },
  variants: {
    size: {
      sm: {
        content: "data-[swipe-direction=left]:max-w-sm data-[swipe-direction=right]:max-w-sm",
      },
      md: {
        content: "data-[swipe-direction=left]:max-w-md data-[swipe-direction=right]:max-w-md",
      },
      lg: {
        content: "data-[swipe-direction=left]:max-w-lg data-[swipe-direction=right]:max-w-lg",
      },
      xl: {
        content: "data-[swipe-direction=left]:max-w-2xl data-[swipe-direction=right]:max-w-2xl",
      },
      full: {
        content: "data-[swipe-direction=left]:max-w-none data-[swipe-direction=right]:max-w-none",
      },
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export type DrawerSize = "sm" | "md" | "lg" | "xl" | "full";

export const drawerStyles = drawer();
