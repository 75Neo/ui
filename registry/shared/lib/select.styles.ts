import { tv } from "tailwind-variants/lite";

export const select = tv({
  slots: {
    root: "flex w-full min-w-0 flex-col gap-1.5",
    label: "text-sm font-medium text-default",
    control: "relative w-full min-w-0",
    trigger:
      "flex h-9 w-full min-w-0 cursor-pointer items-center justify-between gap-2 rounded-md bg-default px-3 text-sm text-default ring ring-default transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-disabled:pointer-events-none data-disabled:opacity-75 data-invalid:ring-error data-placeholder-shown:text-dimmed",
    valueText: "min-w-0 truncate text-start",
    indicator:
      "shrink-0 text-dimmed transition-transform duration-200 data-[state=open]:rotate-180 [&>svg]:size-4",
    clearTrigger:
      "inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors hover:bg-muted hover:text-default [&>svg]:size-3.5",
    positioner: "z-50",
    content:
      "flex max-h-64 w-(--reference-width) min-w-40 flex-col overflow-y-auto rounded-md bg-default p-1.5 shadow-lg ring ring-default outline-none",
    list: "flex flex-col gap-0.5",
    item: "flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-muted transition-colors select-none data-disabled:pointer-events-none data-disabled:opacity-75 data-highlighted:bg-muted data-highlighted:text-default data-[state=checked]:text-default",
    itemText: "min-w-0 flex-1 truncate",
    itemIndicator: "ms-auto size-4 shrink-0 text-primary [&>svg]:size-full",
    itemGroup: "flex flex-col gap-0.5",
    itemGroupLabel: "px-2.5 py-1.5 text-xs font-medium text-dimmed",
  },
});
