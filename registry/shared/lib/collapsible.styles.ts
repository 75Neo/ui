import { tv } from "tailwind-variants/lite";

export const collapsible = tv({
  slots: {
    root: "flex w-full min-w-0 flex-col",
    trigger:
      "flex w-full cursor-pointer items-center justify-between gap-4 text-start text-sm font-medium text-default transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-disabled:pointer-events-none data-disabled:opacity-75",
    indicator:
      "size-4 shrink-0 text-dimmed transition-transform duration-200 data-[state=open]:rotate-180 [&>svg]:size-full",
    content: "overflow-hidden text-sm text-muted",
  },
});
