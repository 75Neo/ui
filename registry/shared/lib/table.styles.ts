import { tv } from "tailwind-variants/lite";

export const table = tv({
  slots: {
    container: "relative w-full overflow-x-auto",
    root: "w-full caption-bottom border-collapse text-sm",
    header: "[&_tr]:border-b [&_tr]:border-default",
    body: "[&_tr:last-child]:border-0",
    footer: "border-t border-default bg-muted/40 font-medium [&>tr]:last:border-b-0",
    row: "border-b border-default transition-colors hover:bg-muted/40 data-[state=selected]:bg-muted",
    head: "h-10 px-3 text-left align-middle font-medium whitespace-nowrap text-muted",
    cell: "px-3 py-2.5 align-middle",
    caption: "mt-4 text-sm text-muted",
  },
});
