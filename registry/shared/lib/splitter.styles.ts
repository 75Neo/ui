import { tv } from "tailwind-variants/lite";

export const splitter = tv({
  slots: {
    root: "flex w-full data-[orientation=vertical]:flex-col",
    panel: "min-h-0 min-w-0 overflow-auto",
    resizeTrigger:
      "group/resize flex shrink-0 items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[orientation=horizontal]:w-2 data-[orientation=horizontal]:cursor-col-resize data-[orientation=vertical]:h-2 data-[orientation=vertical]:cursor-row-resize",
    resizeTriggerIndicator:
      "rounded-full bg-accented transition-colors group-hover/resize:bg-primary group-data-[orientation=horizontal]/resize:h-8 group-data-[orientation=horizontal]/resize:w-0.5 group-data-[orientation=vertical]/resize:h-0.5 group-data-[orientation=vertical]/resize:w-8 group-data-[state=dragging]/resize:bg-primary",
  },
});
