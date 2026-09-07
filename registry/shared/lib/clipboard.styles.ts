import { tv } from "tailwind-variants/lite";

export const clipboard = tv({
  slots: {
    root: "flex w-full min-w-0 flex-col gap-1.5",
    label: "text-sm font-medium text-default",
    control: "flex items-stretch gap-2",
    input:
      "h-9 w-full min-w-0 rounded-md bg-muted/40 px-3 font-mono text-xs text-muted ring ring-default outline-none",
    trigger:
      "inline-flex h-9 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-md px-3 text-sm font-medium text-muted ring ring-default transition-colors hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    indicator: "shrink-0 [&>svg]:size-4",
    valueText: "truncate font-mono text-xs text-muted",
  },
});
