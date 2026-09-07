import { tv } from "tailwind-variants/lite";

export const slider = tv({
  slots: {
    root: "flex w-full min-w-0 flex-col gap-2",
    label: "text-sm font-medium text-default",
    valueText: "text-sm text-muted tabular-nums",
    control:
      "relative flex w-full touch-none items-center py-2 select-none data-[orientation=vertical]:h-40 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[orientation=vertical]:px-2 data-[orientation=vertical]:py-0",
    track:
      "relative h-1.5 w-full overflow-hidden rounded-full bg-muted data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
    range:
      "absolute rounded-full bg-primary data-disabled:bg-accented data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
    thumb:
      "block size-4 shrink-0 cursor-grab rounded-full bg-default shadow-sm ring-2 ring-primary transition-shadow outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-disabled:pointer-events-none data-disabled:ring-default data-dragging:cursor-grabbing",
    markerGroup: "flex w-full justify-between pt-1",
    marker: "text-xs text-dimmed data-[state=under-value]:text-muted",
    draggingIndicator:
      "rounded-sm bg-inverted px-1.5 py-0.5 text-xs text-inverted tabular-nums shadow-md",
  },
});
