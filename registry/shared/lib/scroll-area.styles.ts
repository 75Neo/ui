import { tv } from "tailwind-variants/lite";

export const scrollArea = tv({
  slots: {
    root: "relative overflow-hidden",
    viewport: "size-full [scrollbar-width:none] overflow-auto [&::-webkit-scrollbar]:hidden",
    content: "min-w-full",
    scrollbar:
      "flex touch-none p-0.5 opacity-0 transition-opacity select-none data-hover:opacity-100 data-scrolling:opacity-100 data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col data-[orientation=vertical]:w-2.5",
    thumb: "flex-1 rounded-full bg-accented transition-colors data-dragging:bg-primary",
    corner: "bg-transparent",
  },
});

export const scrollAreaStyles = scrollArea();
