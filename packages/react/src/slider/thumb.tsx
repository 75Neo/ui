import type React from "react";
import { Slider as Ark } from "@ark-ui/react/slider";
import { cva } from "class-variance-authority";
import {
  cn,
  sliderDefaults,
  sliderSizeData,
  sliderThumbCompoundData,
  type SliderThumbProps as SliderThumbContract,
} from "@75neo/themes";
import { useSliderVariants } from "./variants";

const sliderThumb = cva(
  "rounded-full bg-default shadow-sm ring-2 transition-shadow outline-none focus-visible:outline-3 data-disabled:cursor-not-allowed",
  {
    variants: {
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: sliderSizeData.thumb,
    },
    compoundVariants: sliderThumbCompoundData,
    defaultVariants: sliderDefaults,
  },
);

export interface SliderThumbProps
  extends Omit<React.ComponentProps<typeof Ark.Thumb>, "index">, SliderThumbContract {}

export function SliderThumb({ index, className, ...rest }: SliderThumbProps) {
  const variants = useSliderVariants();

  return (
    <Ark.Thumb
      {...rest}
      index={index}
      data-slot="slider-thumb"
      className={cn(sliderThumb(variants), className)}
    >
      <Ark.HiddenInput />
    </Ark.Thumb>
  );
}
