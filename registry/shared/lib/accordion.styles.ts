import { tv } from "tailwind-variants/lite";

export const accordion = tv({
  slots: {
    root: "flex w-full min-w-0 flex-col",
    item: "group/accordion-item border-b border-default last:border-b-0",
    itemTrigger:
      "flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-start text-sm font-medium text-default transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted data-disabled:pointer-events-none data-disabled:opacity-75",
    itemIndicator:
      "size-4 shrink-0 text-dimmed transition-transform duration-200 data-[state=open]:rotate-180 [&>svg]:size-full",
    itemContent:
      "overflow-hidden pb-4 text-sm text-muted group-data-[state=open]/accordion-item:animate-panel-in",
  },
});

export const accordionStyles = accordion();
