import { tv } from "tailwind-variants/lite";

export const qrCode = tv({
  slots: {
    root: "relative inline-flex flex-col items-center gap-3",
    frame: "size-40 rounded-md bg-white p-2 ring ring-default",
    pattern: "fill-zinc-900",
    overlay:
      "flex size-9 items-center justify-center overflow-hidden rounded-sm bg-white p-1 ring ring-default",
    downloadTrigger:
      "inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-md px-3 text-sm font-medium text-muted ring ring-default transition-colors hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus [&>svg]:size-4",
  },
});
