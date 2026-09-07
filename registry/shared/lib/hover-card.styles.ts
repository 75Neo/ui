import { tv } from "tailwind-variants/lite";

export const hoverCard = tv({
  slots: {
    positioner: "z-50",
    content:
      "flex max-w-xs flex-col gap-2 rounded-md bg-default p-4 text-sm shadow-lg ring ring-default focus-visible:outline-none",
    arrow: "[--arrow-background:var(--ui-bg)] [--arrow-size:0.5rem]",
    arrowTip: "border-s border-t border-default",
  },
});
