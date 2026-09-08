import { tv } from "tailwind-variants/lite";

export const table = tv({
  slots: {
    container: "relative w-full overflow-x-auto",
    root: "group/table w-full caption-bottom border-collapse text-sm group-data-[size=sm]/table:text-xs",
    header: "[&_tr]:border-b [&_tr]:border-default",
    body: "[&_tr:last-child]:border-0",
    footer: "border-t border-default bg-muted/40 font-medium [&>tr]:last:border-b-0",
    row: "border-b border-default transition-colors hover:bg-muted/40 data-[state=selected]:bg-muted",
    head: "text-left align-middle font-medium whitespace-nowrap text-muted group-data-[size=lg]/table:h-12 group-data-[size=lg]/table:px-4 group-data-[size=md]/table:h-10 group-data-[size=md]/table:px-3 group-data-[size=sm]/table:h-8 group-data-[size=sm]/table:px-2.5",
    cell: "align-middle group-data-[size=lg]/table:px-4 group-data-[size=lg]/table:py-3.5 group-data-[size=md]/table:px-3 group-data-[size=md]/table:py-2.5 group-data-[size=sm]/table:px-2.5 group-data-[size=sm]/table:py-1.5",
    caption: "mt-4 text-sm text-muted",
  },
});

export type TableSize = "sm" | "md" | "lg";

export const tableStyles = table();
