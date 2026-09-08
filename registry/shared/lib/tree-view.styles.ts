import { tv } from "tailwind-variants/lite";

const node =
  "flex cursor-pointer items-center gap-1.5 rounded-md py-1.5 pe-2 text-sm text-muted transition-colors select-none ps-[calc(0.75rem*var(--depth))] hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus data-disabled:pointer-events-none data-disabled:opacity-75 data-selected:bg-muted data-selected:text-default";

export const treeView = tv({
  slots: {
    root: "w-full min-w-0",
    label: "mb-1.5 text-sm font-medium text-default",
    tree: "flex flex-col gap-0.5",
    item: node,
    branchControl: node,
    branchContent: "flex flex-col gap-0.5",
    branchIndicator:
      "size-4 shrink-0 text-dimmed transition-transform duration-200 data-[state=open]:rotate-90 [&>svg]:size-full",
    branchText: "min-w-0 truncate",
    itemText: "min-w-0 truncate",
    itemIndicator: "ms-auto size-4 shrink-0 text-primary [&>svg]:size-full",
    branchIndentGuide: "absolute h-full w-px bg-default",
    nodeCheckbox: "flex size-4 shrink-0 items-center justify-center rounded-xs ring ring-default",
    nodeCheckboxIndicator: "size-full [&>svg]:size-full",
    nodeRenameInput:
      "w-full min-w-0 rounded-sm bg-default px-1 text-sm text-default ring ring-focus outline-none",
  },
});

export const treeViewStyles = treeView();
