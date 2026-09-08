import { tv } from "tailwind-variants/lite";

export const tour = tv({
  slots: {
    backdrop: "fixed inset-0 z-50 bg-inverted/50",
    spotlight: "fixed z-50 rounded-md outline-2 outline-primary",
    positioner: "z-50",
    content:
      "flex max-w-xs flex-col gap-2 rounded-md bg-default p-4 shadow-xl ring ring-default outline-none",
    title: "text-sm font-semibold text-default",
    description: "text-sm leading-6 text-muted",
    progressText: "text-xs text-dimmed tabular-nums",
    control: "mt-2 flex items-center justify-between gap-2",
    actionTrigger:
      "inline-flex h-8 cursor-pointer items-center rounded-md px-2.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    closeTrigger:
      "absolute end-2 top-2 inline-flex size-6 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors hover:bg-muted hover:text-default [&>svg]:size-3.5",
    arrow: "[--arrow-background:var(--ui-bg)] [--arrow-size:0.5rem]",
    arrowTip: "border-s border-t border-default",
  },
});
