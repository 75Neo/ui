import type React from "react";
import { Combobox as Ark } from "@ark-ui/react/combobox";
import { cva } from "class-variance-authority";
import { cn, comboboxControlCompoundData, comboboxDefaults, comboboxSizeData } from "@75neo/themes";
import { useComboboxVariants } from "./variants";

const comboboxControl = cva(
  "flex w-full min-w-0 items-center bg-default ring ring-accented ring-inset data-disabled:cursor-not-allowed data-disabled:opacity-75 data-invalid:ring-error",
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
      size: comboboxSizeData.control,
    },
    compoundVariants: comboboxControlCompoundData,
    defaultVariants: comboboxDefaults,
  },
);

export interface ComboboxControlProps extends React.ComponentProps<typeof Ark.Control> {}

export function ComboboxControl({ className, children, ...rest }: ComboboxControlProps) {
  const variants = useComboboxVariants();

  return (
    <Ark.Control
      {...rest}
      data-slot="combobox-control"
      className={cn(comboboxControl(variants), className)}
    >
      {children}
    </Ark.Control>
  );
}
