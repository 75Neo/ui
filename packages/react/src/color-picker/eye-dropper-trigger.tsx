import type React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cva } from "class-variance-authority";
import { Pipette } from "lucide-react";
import { cn, colorPickerDefaults, colorPickerSizeData } from "@75neo/themes";
import { useColorPickerVariants } from "./variants";

const colorPickerEyeDropperTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md ring ring-accented transition-colors outline-none focus-visible:outline-3 disabled:cursor-not-allowed",
  {
    variants: { size: colorPickerSizeData.eyeDropper },
    defaultVariants: colorPickerDefaults,
  },
);

export interface ColorPickerEyeDropperTriggerProps extends React.ComponentProps<
  typeof Ark.EyeDropperTrigger
> {}

export function ColorPickerEyeDropperTrigger({
  className,
  children,
  ...rest
}: ColorPickerEyeDropperTriggerProps) {
  const variants = useColorPickerVariants();

  return (
    <Ark.EyeDropperTrigger
      {...rest}
      data-slot="color-picker-eye-dropper-trigger"
      className={cn(colorPickerEyeDropperTrigger(variants), className)}
    >
      {children ?? <Pipette />}
    </Ark.EyeDropperTrigger>
  );
}
