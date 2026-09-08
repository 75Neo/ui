import { tv } from "tailwind-variants/lite";

export const hoverCard = tv({
  slots: {
    positioner: "z-50",
    content:
      "flex max-w-xs flex-col gap-2 rounded-md bg-elevated p-4 text-sm shadow-lg ring ring-default focus-visible:outline-none data-[state=closed]:animate-panel-out data-[state=open]:animate-panel-in",
    arrow: "[--arrow-background:var(--ui-bg)] [--arrow-size:0.5rem]",
    arrowTip: "border-s border-t border-default",
  },
});

export const hoverCardStyles = hoverCard();
