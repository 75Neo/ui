import { tv } from "tailwind-variants/lite";
import { intentSlot, type Intent } from "@/registry/shared/lib/intent.styles";

export const toggleGroup = tv({
  slots: {
    root: "group/toggle-group inline-flex items-center gap-1 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
    item: "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-md font-medium text-muted transition-colors group-data-[size=lg]/toggle-group:h-10 group-data-[size=lg]/toggle-group:px-3 group-data-[size=lg]/toggle-group:text-sm group-data-[size=md]/toggle-group:h-9 group-data-[size=md]/toggle-group:px-2.5 group-data-[size=md]/toggle-group:text-sm group-data-[size=sm]/toggle-group:h-8 group-data-[size=sm]/toggle-group:px-2 group-data-[size=sm]/toggle-group:text-xs hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus data-disabled:pointer-events-none data-disabled:opacity-75 data-[state=on]:bg-(--intent-soft) data-[state=on]:text-(--intent-soft-fg)",
  },
  variants: {
    color: intentSlot("root"),
  },
  defaultVariants: {
    color: "primary",
  },
});

export type ToggleGroupSize = "sm" | "md" | "lg";

export type { Intent };

export const toggleGroupStyles = toggleGroup();
