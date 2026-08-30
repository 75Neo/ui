import { tv, type VariantProps } from "tailwind-variants";

const carousel = tv({
  slots: {
    root: "relative focus:outline-none",
    viewport: "overflow-hidden",
    container: "flex items-start",
    item: "min-w-0 shrink-0 basis-full",
    controls: "",
    arrows: "",
    prev: "absolute rounded-full",
    next: "absolute rounded-full",
    dots: "absolute inset-x-0 -bottom-7 flex flex-wrap items-center justify-center gap-3",
    dot: [
      "bg-accented outline-inverted/25 size-3 cursor-pointer rounded-full focus-visible:outline-3",
      "transition",
    ],
  },
  variants: {
    orientation: {
      vertical: {
        container: "-mt-4 flex-col",
        item: "pt-4",
        prev: "top-4 left-1/2 -translate-x-1/2 rotate-90 sm:-top-12 rtl:-rotate-90",
        next: "bottom-4 left-1/2 -translate-x-1/2 rotate-90 sm:-bottom-12 rtl:-rotate-90",
      },
      horizontal: {
        container: "-ms-4 flex-row",
        item: "ps-4",
        prev: "start-4 top-1/2 -translate-y-1/2 sm:-start-12",
        next: "end-4 top-1/2 -translate-y-1/2 sm:-end-12",
      },
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

type CarouselVariants = VariantProps<typeof carousel>;

export { carousel, type CarouselVariants };
