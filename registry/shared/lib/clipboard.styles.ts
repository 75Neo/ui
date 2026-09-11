import { tv } from "tailwind-variants/lite";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted";

export const clipboard = tv({
  slots: {
    root: "flex w-full min-w-0 flex-col gap-1.5",
    label: "text-sm font-medium text-default",
    control: "flex items-center gap-2",
    input: `h-9 w-full min-w-0 rounded-md bg-default px-3 font-mono text-sm text-default ring ring-default transition-colors outline-none selection:bg-accented ${focusRing}`,
    trigger: `inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md bg-default text-muted ring ring-default transition-colors hover:bg-muted hover:text-default ${focusRing}`,
    indicator: "inline-flex shrink-0 [&>svg]:size-4",
    valueText: "truncate font-mono text-sm text-default",
  },
});

export const clipboardStyles = clipboard();
