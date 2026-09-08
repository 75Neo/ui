import { tv } from "tailwind-variants/lite";
import { intentSlot, type Intent } from "@/registry/shared/lib/intent.styles";

export const progress = tv({
  slots: {
    root: "group/progress flex w-full min-w-0 flex-col gap-2",
    label: "text-sm font-medium text-default",
    track:
      "relative w-full overflow-hidden rounded-full bg-muted group-data-[size=lg]/progress:h-3 group-data-[size=md]/progress:h-2 group-data-[size=sm]/progress:h-1",
    range: "h-full rounded-full bg-(--intent) transition-[width] duration-300 ease-out",
    valueText: "text-sm text-muted tabular-nums",
  },
  variants: {
    color: intentSlot("root"),
  },
  defaultVariants: {
    color: "primary",
  },
});

export type ProgressSize = "sm" | "md" | "lg";

export type { Intent };

export const progressStyles = progress();
