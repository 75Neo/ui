import { tv } from "tailwind-variants/lite";

export const marquee = tv({
  slots: {
    root: "relative flex w-full min-w-0 overflow-hidden",
    viewport: "flex w-full min-w-0 overflow-hidden",
    content: "flex shrink-0 items-center gap-8",
    item: "shrink-0",
    edge: "pointer-events-none absolute inset-y-0 w-16 from-default to-transparent data-[side=left]:left-0 data-[side=left]:bg-gradient-to-r data-[side=right]:right-0 data-[side=right]:bg-gradient-to-l",
  },
});
