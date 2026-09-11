import { tv } from "tailwind-variants/lite";

const trigger =
  "inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-elevated text-muted shadow-sm ring ring-default transition-colors hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted disabled:pointer-events-none disabled:opacity-50 [&>svg]:size-4";

export const carousel = tv({
  slots: {
    root: "relative flex w-full min-w-0 flex-col gap-3",
    itemGroup: "flex data-[orientation=vertical]:flex-col",
    item: "min-w-0 shrink-0 overflow-hidden rounded-md",
    control: "flex items-center justify-between gap-3",
    prevTrigger: trigger,
    nextTrigger: trigger,
    indicatorGroup: "flex items-center justify-center gap-1.5",
    indicator:
      "size-1.5 cursor-pointer rounded-full bg-accented transition-[background-color,width] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted data-current:w-4 data-current:bg-primary",
    autoplayTrigger:
      "inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-muted transition-colors hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted [&>svg]:size-4",
    progressText: "text-xs text-dimmed tabular-nums",
  },
});

export const carouselStyles = carousel();
