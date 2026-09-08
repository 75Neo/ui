import { tv } from "tailwind-variants/lite";

export const numberInput = tv({
  slots: {
    root: "group/number-input flex w-full min-w-0 flex-col gap-1.5",
    label: "text-sm font-medium text-default",
    control:
      "flex items-stretch overflow-hidden rounded-md bg-default ring ring-default focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus data-disabled:opacity-75 data-invalid:ring-error",
    input:
      "w-full min-w-0 bg-transparent text-default tabular-nums outline-none group-data-[size=lg]/number-input:h-10 group-data-[size=lg]/number-input:px-3.5 group-data-[size=lg]/number-input:text-base group-data-[size=md]/number-input:h-9 group-data-[size=md]/number-input:px-3 group-data-[size=md]/number-input:text-sm group-data-[size=sm]/number-input:h-8 group-data-[size=sm]/number-input:px-2.5 group-data-[size=sm]/number-input:text-xs placeholder:text-dimmed",
    incrementTrigger:
      "flex shrink-0 cursor-pointer items-center justify-center text-dimmed transition-colors group-data-[size=lg]/number-input:w-10 group-data-[size=md]/number-input:w-9 group-data-[size=sm]/number-input:w-8 hover:bg-muted hover:text-default data-disabled:pointer-events-none data-disabled:opacity-75 [&>svg]:size-3.5",
    decrementTrigger:
      "flex shrink-0 cursor-pointer items-center justify-center text-dimmed transition-colors group-data-[size=lg]/number-input:w-10 group-data-[size=md]/number-input:w-9 group-data-[size=sm]/number-input:w-8 hover:bg-muted hover:text-default data-disabled:pointer-events-none data-disabled:opacity-75 [&>svg]:size-3.5",
    valueText: "text-sm text-muted tabular-nums",
    scrubber: "cursor-ew-resize",
  },
});

export type NumberInputSize = "sm" | "md" | "lg";

export const numberInputStyles = numberInput();
