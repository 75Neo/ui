import { tv } from "tailwind-variants/lite";

const navTrigger =
  "inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted transition-colors hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-50 [&>svg]:size-4";

const select =
  "h-7 cursor-pointer rounded-md bg-transparent px-1.5 text-sm font-medium text-default outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

export const datePicker = tv({
  slots: {
    root: "flex w-full min-w-0 flex-col gap-1.5",
    label: "text-sm font-medium text-default",
    control: "flex items-center gap-2",
    input:
      "h-9 w-full min-w-0 rounded-md bg-default px-3 text-sm text-default ring ring-default transition-colors outline-none placeholder:text-dimmed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus data-invalid:ring-error",
    trigger:
      "inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted ring ring-default transition-colors hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus [&>svg]:size-4",
    clearTrigger:
      "inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors hover:bg-muted hover:text-default [&>svg]:size-3.5",
    positioner: "z-50",
    content:
      "flex flex-col gap-3 rounded-md bg-elevated p-3 shadow-lg ring ring-default outline-none data-[state=closed]:animate-panel-out data-[state=open]:animate-panel-in",
    view: "flex flex-col gap-3",
    viewControl: "flex items-center justify-between gap-2",
    viewTrigger:
      "inline-flex h-7 cursor-pointer items-center rounded-md px-2 text-sm font-medium text-default transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
    prevTrigger: navTrigger,
    nextTrigger: navTrigger,
    monthSelect: select,
    yearSelect: select,
    table: "w-full border-collapse",
    tableHead: "",
    tableHeader: "size-9 text-xs font-normal text-dimmed",
    tableBody: "",
    tableRow: "",
    tableCell: "p-0",
    tableCellTrigger:
      "flex size-9 cursor-pointer items-center justify-center rounded-md text-sm text-muted transition-colors hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus data-disabled:pointer-events-none data-disabled:opacity-40 data-in-range:bg-primary-soft data-in-range:text-primary data-outside-range:text-dimmed data-selected:bg-primary data-selected:text-primary-fg data-today:font-medium data-today:not-data-selected:text-default data-unavailable:pointer-events-none data-unavailable:line-through data-unavailable:opacity-40",
    weekNumberHeaderCell: "size-9 text-xs font-normal text-dimmed",
    weekNumberCell: "size-9 text-center text-xs text-dimmed",
    rangeText: "text-sm font-medium text-default",
    valueText: "text-sm text-default",
    presetTrigger:
      "inline-flex h-8 cursor-pointer items-center rounded-md px-2.5 text-xs font-medium text-muted transition-colors hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
  },
});
