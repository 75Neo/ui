import { tv } from "tailwind-variants/lite";

export const ratingGroup = tv({
  slots: {
    root: "flex flex-col gap-1.5",
    label: "text-sm font-medium text-default",
    control: "flex items-center gap-0.5 data-disabled:pointer-events-none data-disabled:opacity-75",
    item: "cursor-pointer text-dimmed transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-checked:text-warning data-highlighted:text-warning [&>svg]:size-5",
  },
});
