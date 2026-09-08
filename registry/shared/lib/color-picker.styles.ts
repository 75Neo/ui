import { tv } from "tailwind-variants/lite";

export const colorPicker = tv({
  slots: {
    root: "flex w-full min-w-0 flex-col gap-1.5",
    label: "text-sm font-medium text-default",
    control: "flex items-center gap-2",
    trigger:
      "inline-flex size-9 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-md p-1 ring ring-default transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus data-disabled:pointer-events-none data-disabled:opacity-75",
    valueSwatch: "size-full rounded-sm",
    valueText: "font-mono text-sm text-muted",
    positioner: "z-50",
    content:
      "flex w-56 flex-col gap-3 rounded-md bg-elevated p-3 shadow-lg ring ring-default outline-none data-[state=closed]:animate-panel-out data-[state=open]:animate-panel-in",
    view: "flex flex-col gap-3",
    area: "relative h-32 w-full overflow-hidden rounded-md",
    areaBackground: "size-full",
    areaThumb: "size-4 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-sm ring-2 ring-white",
    channelSlider: "relative h-3 w-full",
    channelSliderTrack: "size-full rounded-full",
    channelSliderThumb:
      "size-4 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-sm ring-2 ring-white",
    channelSliderLabel: "text-xs text-muted",
    channelSliderValueText: "text-xs text-muted tabular-nums",
    channelInput:
      "h-8 w-full min-w-0 rounded-md bg-default px-2 font-mono text-xs text-default ring ring-default outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
    transparencyGrid: "rounded-md",
    swatchGroup: "flex flex-wrap gap-1.5",
    swatchTrigger:
      "size-6 cursor-pointer overflow-hidden rounded-sm ring ring-default transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus data-[state=checked]:ring-2 data-[state=checked]:ring-primary",
    swatch: "size-full",
    swatchIndicator: "flex size-full items-center justify-center text-white [&>svg]:size-3",
    eyeDropperTrigger:
      "inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted transition-colors hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus [&>svg]:size-4",
    formatTrigger:
      "inline-flex h-8 cursor-pointer items-center rounded-md px-2 text-xs font-medium text-muted transition-colors hover:bg-muted hover:text-default",
    formatSelect:
      "h-8 cursor-pointer rounded-md bg-transparent px-1 text-xs font-medium text-muted outline-none",
  },
});

export const colorPickerStyles = colorPicker();
