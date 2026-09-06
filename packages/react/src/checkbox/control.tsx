import type React from "react";
import { Checkbox as Ark } from "@ark-ui/react/checkbox";
import { cva } from "class-variance-authority";
import { cn, checkboxControlCompoundData, checkboxDefaults, checkboxSizeData } from "@75neo/themes";
import { useCheckboxVariants } from "./variants";

const checkboxControl = cva(
  "inline-flex shrink-0 items-center justify-center rounded-sm bg-default text-inverted ring ring-accented transition-colors ring-inset data-focus-visible:outline-3 data-invalid:ring-error hover:data-[state=unchecked]:ring-inverted/50",
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
      size: checkboxSizeData.control,
    },
    compoundVariants: checkboxControlCompoundData,
    defaultVariants: checkboxDefaults,
  },
);

export interface CheckboxControlProps extends React.ComponentProps<typeof Ark.Control> {}

export function CheckboxControl({ className, children, ...rest }: CheckboxControlProps) {
  const variants = useCheckboxVariants();

  return (
    <Ark.Control
      {...rest}
      data-slot="checkbox-control"
      className={cn(checkboxControl(variants), className)}
    >
      {children}
    </Ark.Control>
  );
}
