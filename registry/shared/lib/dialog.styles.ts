import { tv } from "tailwind-variants/lite";

export const dialog = tv({
  slots: {
    backdrop: "fixed inset-0 z-50 bg-inverted/40 backdrop-blur-[1px]",
    positioner: "fixed inset-0 z-50 flex items-center justify-center p-4",
    content:
      "relative flex w-full max-w-md flex-col gap-4 rounded-md bg-default p-6 shadow-xl ring ring-default focus-visible:outline-none",
    title: "text-base font-semibold text-default",
    description: "text-sm leading-6 text-muted",
    closeTrigger:
      "absolute end-4 top-4 inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&>svg]:size-4",
  },
});
