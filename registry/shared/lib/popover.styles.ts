import { tv } from "tailwind-variants/lite";

export const popover = tv({
  slots: {
    positioner: "z-50",
    content:
      "relative flex max-w-xs flex-col gap-2 rounded-md bg-elevated p-4 shadow-lg ring ring-default focus-visible:outline-none data-[state=closed]:animate-panel-out data-[state=open]:animate-panel-in",
    title: "text-sm font-medium text-default",
    description: "text-sm leading-6 text-muted",
    arrow: "[--arrow-background:var(--ui-bg)] [--arrow-size:0.5rem]",
    arrowTip: "border-s border-t border-default",
    closeTrigger:
      "absolute end-2 top-2 inline-flex size-6 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus [&>svg]:size-3.5",
  },
});
