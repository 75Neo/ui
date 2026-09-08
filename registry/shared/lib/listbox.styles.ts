import { tv } from "tailwind-variants/lite";

export const listbox = tv({
  slots: {
    root: "flex w-full min-w-0 flex-col gap-1.5",
    label: "text-sm font-medium text-default",
    input:
      "h-9 w-full min-w-0 rounded-md bg-default px-3 text-sm text-default ring ring-default transition-colors outline-none placeholder:text-dimmed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
    content:
      "flex max-h-64 flex-col overflow-y-auto rounded-md bg-elevated p-1.5 ring ring-default outline-none data-[state=closed]:animate-panel-out data-[state=open]:animate-panel-in",
    item: "flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-muted transition-colors select-none data-disabled:pointer-events-none data-disabled:opacity-75 data-highlighted:bg-muted data-highlighted:text-default data-[state=checked]:text-default",
    itemText: "min-w-0 flex-1 truncate",
    itemIndicator: "ms-auto size-4 shrink-0 text-primary [&>svg]:size-full",
    itemGroup: "flex flex-col gap-0.5",
    itemGroupLabel: "px-2.5 py-1.5 text-xs font-medium text-dimmed",
    empty: "px-2.5 py-6 text-center text-sm text-muted",
    valueText: "text-sm text-muted",
  },
});

export const listboxStyles = listbox();
