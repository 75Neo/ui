import type React from "react";
import { AngleSlider as Ark } from "@ark-ui/react/angle-slider";
import { cva } from "class-variance-authority";
import { angleSliderColorData, angleSliderDefaults, cn } from "@75neo/themes";
import { useAngleSliderVariants } from "./variants";

const angleSliderThumb = cva(
  "pointer-events-none absolute inset-0 outline-none before:pointer-events-auto before:absolute before:top-[-2%] before:left-1/2 before:size-[16%] before:-translate-x-1/2 before:rounded-full before:shadow-sm before:transition-transform before:content-[''] hover:before:scale-110 focus-visible:before:outline-3",
  {
    variants: { color: angleSliderColorData.thumb },
    defaultVariants: angleSliderDefaults,
  },
);

export interface AngleSliderThumbProps extends React.ComponentProps<typeof Ark.Thumb> {}

export function AngleSliderThumb({ className, ...rest }: AngleSliderThumbProps) {
  const variants = useAngleSliderVariants();

  return (
    <Ark.Thumb
      {...rest}
      data-slot="angle-slider-thumb"
      className={cn(angleSliderThumb(variants), className)}
    />
  );
}
