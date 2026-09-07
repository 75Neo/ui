import { tv } from "tailwind-variants/lite";

export const numberInput = tv({
  slots: {
    root: "flex w-full min-w-0 flex-col gap-1.5",
    label: "text-sm font-medium text-default",
    control:
      "flex items-stretch overflow-hidden rounded-md bg-default ring ring-default focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary data-disabled:opacity-75 data-invalid:ring-error",
    input:
      "h-9 w-full min-w-0 bg-transparent px-3 text-sm text-default tabular-nums outline-none placeholder:text-dimmed",
    incrementTrigger:
      "flex w-9 shrink-0 cursor-pointer items-center justify-center text-dimmed transition-colors hover:bg-muted hover:text-default data-disabled:pointer-events-none data-disabled:opacity-75 [&>svg]:size-3.5",
    decrementTrigger:
      "flex w-9 shrink-0 cursor-pointer items-center justify-center text-dimmed transition-colors hover:bg-muted hover:text-default data-disabled:pointer-events-none data-disabled:opacity-75 [&>svg]:size-3.5",
    valueText: "text-sm text-muted tabular-nums",
    scrubber: "cursor-ew-resize",
  },
});
