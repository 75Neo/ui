import { tv } from "tailwind-variants/lite";

export const tooltip = tv({
  slots: {
    positioner: "z-50",
    content:
      "max-w-56 rounded-md bg-inverted px-2 py-1 text-xs leading-5 text-inverted shadow-md select-none",
    arrow: "[--arrow-background:var(--ui-bg-inverted)] [--arrow-size:0.375rem]",
    arrowTip: "",
  },
});
