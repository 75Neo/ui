import { tv } from "tailwind-variants/lite";

export const dialog = tv({
  slots: {
    backdrop:
      "fixed inset-0 z-50 bg-inverted/40 backdrop-blur-[1px] data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in",
    positioner: "fixed inset-0 z-50 flex items-center justify-center p-4",
    content:
      "relative flex w-full flex-col gap-4 rounded-md bg-elevated p-6 shadow-lg ring ring-default focus-visible:outline-none data-[state=closed]:animate-dialog-out data-[state=open]:animate-dialog-in",
    title: "text-base font-semibold text-default",
    description: "text-sm leading-6 text-muted",
    closeTrigger:
      "absolute end-4 top-4 inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus [&>svg]:size-4",
  },
  variants: {
    size: {
      sm: { content: "max-w-sm" },
      md: { content: "max-w-md" },
      lg: { content: "max-w-lg" },
      xl: { content: "max-w-2xl" },
      full: { content: "max-w-none" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type DialogSize = "sm" | "md" | "lg" | "xl" | "full";
