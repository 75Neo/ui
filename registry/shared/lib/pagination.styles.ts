import { tv } from "tailwind-variants/lite";

const trigger =
  "inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted transition-colors hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted disabled:pointer-events-none disabled:opacity-50 [&>svg]:size-4";

export const pagination = tv({
  slots: {
    root: "flex items-center gap-1",
    item: "inline-flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-md px-2 text-sm font-medium text-muted transition-colors hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted data-selected:bg-muted data-selected:text-default",
    ellipsis: "inline-flex h-9 min-w-9 items-center justify-center text-sm text-dimmed select-none",
    firstTrigger: trigger,
    prevTrigger: trigger,
    nextTrigger: trigger,
    lastTrigger: trigger,
  },
});

export const paginationStyles = pagination();
