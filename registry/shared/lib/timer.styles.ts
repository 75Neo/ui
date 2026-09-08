import { tv } from "tailwind-variants/lite";

export const timer = tv({
  slots: {
    root: "flex flex-col gap-3",
    area: "flex items-center gap-1.5",
    item: "flex min-w-12 items-center justify-center rounded-md bg-muted/50 px-2 py-2 font-mono text-lg leading-none text-default tabular-nums",
    separator: "font-mono text-lg leading-none text-dimmed",
    control: "flex items-center gap-2",
    actionTrigger:
      "inline-flex h-8 cursor-pointer items-center rounded-md px-2.5 text-xs font-medium text-muted ring ring-default transition-colors hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
  },
});
