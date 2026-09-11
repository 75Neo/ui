import { tv } from "tailwind-variants/lite";

export const steps = tv({
  slots: {
    root: "flex w-full min-w-0 flex-col gap-6 data-[orientation=vertical]:flex-row",
    list: "flex w-full items-center gap-2 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
    item: "flex flex-1 items-center gap-2 data-[orientation=vertical]:flex-none",
    trigger:
      "flex cursor-pointer items-center gap-2.5 text-sm font-medium text-muted transition-colors hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted disabled:pointer-events-none disabled:opacity-75 data-complete:text-default data-current:text-default",
    indicator:
      "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-medium ring ring-default transition-colors data-complete:bg-primary/10 data-complete:text-primary data-complete:ring-primary/25 data-current:bg-primary data-current:text-inverted data-current:ring-primary [&>svg]:size-3.5",
    separator:
      "h-px flex-1 bg-accented transition-colors data-complete:bg-primary data-[orientation=vertical]:h-6 data-[orientation=vertical]:w-px data-[orientation=vertical]:flex-none",
    content: "min-w-0 text-sm leading-6 text-muted",
    completedContent: "min-w-0 text-sm leading-6 text-muted",
    progress: "text-xs text-dimmed tabular-nums",
    nextTrigger:
      "inline-flex h-9 cursor-pointer items-center rounded-md bg-primary px-3 text-sm font-medium text-inverted transition-colors hover:bg-primary/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50",
    prevTrigger:
      "inline-flex h-9 cursor-pointer items-center rounded-md px-3 text-sm font-medium text-muted ring ring-default transition-colors hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted disabled:pointer-events-none disabled:opacity-50",
  },
});

export const stepsStyles = steps();
