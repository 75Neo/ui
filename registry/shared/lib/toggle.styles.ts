import { tv } from "tailwind-variants/lite";
import { intentSlot, type Intent } from "@/registry/shared/lib/intent.styles";

export const toggle = tv({
  slots: {
    root: "group/toggle inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-md font-medium text-muted transition-colors hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus data-disabled:pointer-events-none data-disabled:opacity-75 data-[size=lg]:h-10 data-[size=lg]:px-3 data-[size=lg]:text-sm data-[size=md]:h-9 data-[size=md]:px-2.5 data-[size=md]:text-sm data-[size=sm]:h-8 data-[size=sm]:px-2 data-[size=sm]:text-xs data-[state=on]:bg-(--intent-soft) data-[state=on]:text-(--intent-soft-fg)",
    indicator:
      "shrink-0 group-data-[size=lg]/toggle:size-5 group-data-[size=md]/toggle:size-4 group-data-[size=sm]/toggle:size-3.5 [&>svg]:size-full",
  },
  variants: {
    color: intentSlot("root"),
  },
  defaultVariants: {
    color: "primary",
  },
});

export type ToggleSize = "sm" | "md" | "lg";

export type { Intent };

export const toggleStyles = toggle();
