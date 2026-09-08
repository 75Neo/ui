import { tv } from "tailwind-variants/lite";

export const dateInput = tv({
  slots: {
    root: "flex w-full min-w-0 flex-col gap-1.5",
    label: "text-sm font-medium text-default",
    control:
      "flex h-9 w-full min-w-0 items-center gap-2 rounded-md bg-default px-3 ring ring-default focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary data-disabled:opacity-75 data-invalid:ring-error",
    segmentGroup: "flex items-center",
    segment:
      "rounded-sm px-0.5 font-mono text-sm text-default tabular-nums outline-none data-focus:bg-primary data-focus:text-inverted data-placeholder-shown:text-dimmed",
  },
});
