import type React from "react";
import { RadioGroup as Ark } from "@ark-ui/react/radio-group";
import { cva } from "class-variance-authority";
import {
  cn,
  radioGroupControlCompoundData,
  radioGroupDefaults,
  radioGroupSizeData,
} from "@75neo/themes";
import { useRadioGroupVariants } from "./variants";

const radioGroupItemControl = cva(
  "group/control inline-flex shrink-0 items-center justify-center rounded-full bg-default ring ring-accented transition-colors ring-inset data-focus-visible:outline-3 data-invalid:ring-error hover:data-[state=unchecked]:ring-inverted/50",
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
      size: radioGroupSizeData.control,
    },
    compoundVariants: radioGroupControlCompoundData,
    defaultVariants: radioGroupDefaults,
  },
);

export interface RadioGroupItemControlProps extends React.ComponentProps<typeof Ark.ItemControl> {}

export function RadioGroupItemControl({
  className,
  children,
  ...rest
}: RadioGroupItemControlProps) {
  const variants = useRadioGroupVariants();

  return (
    <Ark.ItemControl
      {...rest}
      data-slot="radio-group-item-control"
      className={cn(radioGroupItemControl(variants), className)}
    >
      {children}
    </Ark.ItemControl>
  );
}
