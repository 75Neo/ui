import { tv } from "tailwind-variants/lite";
import { intentSlot, type Intent } from "@/registry/shared/lib/intent.styles";

export const checkbox = tv({
  slots: {
    root: "group/checkbox inline-flex cursor-pointer items-center gap-2.5 text-default data-disabled:cursor-not-allowed data-disabled:opacity-75 data-[size=lg]:text-base data-[size=md]:text-sm data-[size=sm]:text-xs",
    control:
      "flex shrink-0 items-center justify-center rounded-sm text-(--intent-fg) ring ring-default transition-colors group-data-[size=lg]/checkbox:size-6 group-data-[size=md]/checkbox:size-5 group-data-[size=sm]/checkbox:size-4 data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-focus data-invalid:ring-error data-[state=checked]:bg-(--intent) data-[state=checked]:ring-(--intent) data-[state=indeterminate]:bg-(--intent) data-[state=indeterminate]:ring-(--intent)",
    indicator: "flex size-full items-center justify-center [&>svg]:size-[70%]",
    label: "leading-tight select-none",
  },
  variants: {
    color: intentSlot("root"),
  },
  defaultVariants: {
    color: "primary",
  },
});

export type CheckboxSize = "sm" | "md" | "lg";

export type { Intent };
