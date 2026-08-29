import { tv, type VariantProps } from "tailwind-variants";

const angleSlider = tv({
  slots: {
    root: "inline-flex flex-col items-center gap-3 data-[disabled]:opacity-60 data-[disabled]:grayscale",
    label: "text-default text-sm font-medium select-none data-[disabled]:opacity-60",
    control:
      "bg-muted before:bg-default after:bg-inverted data-[focus]:ring-primary/40 focus-within:ring-primary/40 relative flex items-center justify-center rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_4px_12px_-4px_rgba(0,0,0,0.1)] select-none before:absolute before:inset-1 before:rounded-full before:shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)] before:content-[''] after:absolute after:z-[1] after:size-1.5 after:rounded-full after:content-[''] focus-within:ring-2 focus-within:ring-offset-2 data-[focus]:ring-2 data-[focus]:ring-offset-2",
    thumb:
      "before:bg-primary before:border-default after:from-primary absolute top-0 bottom-0 left-[calc(50%-1.5px)] z-[2] h-full w-[3px] outline-none before:absolute before:top-1 before:left-1/2 before:size-2.5 before:-translate-x-1/2 before:rounded-full before:border-2 before:shadow-[0_1px_4px_rgba(0,0,0,0.2)] before:transition-transform before:duration-150 before:content-[''] after:absolute after:top-3.5 after:left-1/2 after:h-[calc(50%-18px)] after:w-0.5 after:-translate-x-1/2 after:rounded-sm after:bg-gradient-to-b after:to-transparent after:content-[''] focus-visible:before:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-primary)_40%,transparent),0_2px_6px_rgba(0,0,0,0.2)] active:before:scale-110",
    markerGroup: "pointer-events-none absolute inset-0 z-0 rounded-full",
    marker:
      "before:bg-accented data-[state=at-value]:before:bg-primary data-[state=under-value]:before:bg-primary/50 absolute top-0 bottom-0 left-[calc(50%-1px)] w-0.5 before:absolute before:top-1.5 before:left-1/2 before:h-1.5 before:w-0.5 before:-translate-x-1/2 before:rounded-full before:content-['']",
    valueText: "text-default text-lg leading-none font-semibold tabular-nums",
  },
  variants: {
    size: {
      sm: {
        control: "size-[80px]",
        valueText: "text-base",
      },
      md: {
        control: "size-[100px]",
        valueText: "text-lg",
      },
      lg: {
        control: "size-[140px]",
        valueText: "text-xl",
      },
    },
    disabled: {
      true: {
        control: "cursor-not-allowed opacity-60 grayscale",
        thumb: "cursor-not-allowed",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type AngleSliderVariants = VariantProps<typeof angleSlider>;

export { angleSlider, type AngleSliderVariants };
