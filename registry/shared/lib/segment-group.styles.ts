import { tv } from "tailwind-variants/lite";

export const segmentGroup = tv({
  slots: {
    root: "relative inline-flex items-center gap-1 rounded-md bg-muted/60 p-1 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
    label: "px-2 text-sm font-medium text-default",
    item: "relative z-10 inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-sm px-3 py-1.5 text-sm font-medium text-muted transition-colors data-disabled:pointer-events-none data-disabled:opacity-75 data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-primary data-[state=checked]:text-default",
    itemText: "select-none",
    itemControl: "hidden",
    indicator:
      "absolute top-(--top) left-(--left) z-0 h-(--height) w-(--width) rounded-sm bg-default shadow-sm transition-[left,top,width,height] duration-200 ease-out",
  },
});
