import { tv } from "tailwind-variants/lite";

export const angleSlider = tv({
  slots: {
    root: "flex flex-col items-center gap-2",
    label: "text-sm font-medium text-default",
    control:
      "relative size-24 rounded-full bg-muted ring ring-default data-disabled:pointer-events-none data-disabled:opacity-75",
    thumb:
      "size-3 rounded-full bg-primary shadow-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted",
    valueText: "font-mono text-sm text-muted tabular-nums",
    markerGroup: "",
    marker: "size-1 rounded-full bg-accented data-[state=under-value]:bg-primary",
  },
});

export const angleSliderStyles = angleSlider();
