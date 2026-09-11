import { tv } from "tailwind-variants/lite";

export const segmentGroup = tv({
  slots: {
    root: "group/segment-group relative inline-flex items-center gap-1 rounded-md bg-muted/60 p-1 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
    label: "px-2 text-sm font-medium text-default",
    item: "relative z-10 inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-sm font-medium text-muted transition-colors group-data-[size=lg]/segment-group:px-3.5 group-data-[size=lg]/segment-group:py-2 group-data-[size=lg]/segment-group:text-base group-data-[size=md]/segment-group:px-3 group-data-[size=md]/segment-group:py-1.5 group-data-[size=md]/segment-group:text-sm group-data-[size=sm]/segment-group:px-2.5 group-data-[size=sm]/segment-group:py-1 group-data-[size=sm]/segment-group:text-xs data-disabled:pointer-events-none data-disabled:opacity-75 data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-inverted data-[state=checked]:text-default",
    itemText: "select-none",
    itemControl: "hidden",
    indicator:
      "absolute top-(--top) left-(--left) z-0 h-(--height) w-(--width) rounded-sm bg-elevated shadow-sm transition-[left,top,width,height] duration-200 ease-out",
  },
});

export type SegmentGroupSize = "sm" | "md" | "lg";

export const segmentGroupStyles = segmentGroup();
