import type React from "react";
import { Slider as Ark } from "@ark-ui/react/slider";
import { cva } from "class-variance-authority";
import { cn, sliderDefaults, sliderSizeData } from "@75neo/themes";
import { useSliderVariants } from "./variants";

const sliderTrack = cva(
  "overflow-hidden rounded-full bg-accented group-data-[orientation=horizontal]/slider:w-full group-data-[orientation=vertical]/slider:h-full",
  {
    variants: { size: sliderSizeData.track },
    defaultVariants: sliderDefaults,
  },
);

export interface SliderTrackProps extends React.ComponentProps<typeof Ark.Track> {}

export function SliderTrack({ className, children, ...rest }: SliderTrackProps) {
  const variants = useSliderVariants();

  return (
    <Ark.Track {...rest} data-slot="slider-track" className={cn(sliderTrack(variants), className)}>
      {children}
    </Ark.Track>
  );
}
