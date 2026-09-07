import { tv } from "tailwind-variants/lite";

export const tagsInput = tv({
  slots: {
    root: "flex w-full min-w-0 flex-col gap-1.5",
    label: "text-sm font-medium text-default",
    control:
      "flex w-full flex-wrap items-center gap-1.5 rounded-md bg-default p-1.5 ring ring-default focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary data-disabled:opacity-75 data-invalid:ring-error",
    item: "inline-flex min-w-0 items-center",
    itemPreview:
      "inline-flex min-w-0 items-center gap-1 rounded-sm bg-muted py-0.5 ps-2 pe-1 text-xs text-default data-highlighted:bg-accented",
    itemText: "truncate",
    itemInput: "min-w-16 bg-transparent text-xs text-default outline-none",
    itemDeleteTrigger:
      "inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-xs text-dimmed transition-colors hover:text-default [&>svg]:size-3",
    input:
      "min-w-24 flex-1 bg-transparent px-1 text-sm text-default outline-none placeholder:text-dimmed",
    clearTrigger:
      "inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors hover:bg-muted hover:text-default [&>svg]:size-3.5",
  },
});
