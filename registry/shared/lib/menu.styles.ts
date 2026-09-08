import { tv } from "tailwind-variants/lite";

export const menu = tv({
  slots: {
    positioner: "z-50",
    content:
      "flex min-w-40 flex-col gap-0.5 rounded-md bg-elevated p-1.5 shadow-lg ring ring-default focus-visible:outline-none data-[state=closed]:animate-panel-out data-[state=open]:animate-panel-in",
    item: "flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-muted transition-colors select-none data-disabled:pointer-events-none data-disabled:opacity-75 data-highlighted:bg-muted data-highlighted:text-default",
    itemText: "min-w-0 flex-1 truncate",
    itemIndicator: "ms-auto size-4 shrink-0 text-primary [&>svg]:size-full",
    itemGroup: "flex flex-col gap-0.5",
    itemGroupLabel: "px-2.5 py-1.5 text-xs font-medium text-dimmed",
    separator: "-mx-1.5 my-1 border-t border-default",
    arrow: "[--arrow-background:var(--ui-bg)] [--arrow-size:0.5rem]",
    arrowTip: "border-s border-t border-default",
  },
});
