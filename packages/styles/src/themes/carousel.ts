import { tv, type VariantProps } from "tailwind-variants";

const carousel = tv({
  slots: {
    root: "flex w-full flex-col gap-4",
    control: "flex w-full items-center justify-between gap-2",
    itemGroup: "flex overflow-hidden rounded-lg",
    item: "min-w-0 shrink-0 basis-full",
    indicatorGroup: "flex items-center justify-center gap-2",
    indicator:
      "bg-muted hover:bg-accented data-[current]:bg-primary size-2.5 rounded-full transition-colors duration-200 disabled:opacity-50",
    prevTrigger:
      "bg-elevated hover:bg-accented border-default inline-flex size-8 shrink-0 items-center justify-center rounded-md border text-sm transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
    nextTrigger:
      "bg-elevated hover:bg-accented border-default inline-flex size-8 shrink-0 items-center justify-center rounded-md border text-sm transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
    autoplayTrigger:
      "bg-elevated hover:bg-accented border-default inline-flex size-8 shrink-0 items-center justify-center rounded-md border text-sm transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
    autoplayIndicator: "inline-flex items-center justify-center [&_svg]:size-4",
    progressText: "text-muted text-sm tabular-nums",
  },
  variants: {
    orientation: {
      horizontal: {
        itemGroup: "flex-row",
      },
      vertical: {
        root: "flex-col",
        control: "flex-col",
        itemGroup: "flex-col",
        indicatorGroup: "flex-col",
      },
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

type CarouselVariants = VariantProps<typeof carousel>;

export { carousel, type CarouselVariants };
