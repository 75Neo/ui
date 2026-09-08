import { tv } from "tailwind-variants/lite";
import { intentSlot, type Intent } from "@/registry/shared/lib/intent.styles";

export const ratingGroup = tv({
  slots: {
    root: "flex flex-col gap-1.5",
    label: "text-sm font-medium text-default",
    control: "flex items-center gap-0.5 data-disabled:pointer-events-none data-disabled:opacity-75",
    item: "cursor-pointer text-dimmed transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus data-checked:text-(--intent) data-highlighted:text-(--intent) [&>svg]:size-5",
  },
  variants: {
    color: intentSlot("root"),
  },
  defaultVariants: {
    color: "warning",
  },
});

export type { Intent };
