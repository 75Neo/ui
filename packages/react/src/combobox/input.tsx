import type React from "react";
import { Combobox as Ark } from "@ark-ui/react/combobox";
import { cva } from "class-variance-authority";
import { cn, comboboxDefaults, comboboxSizeData } from "@75neo/themes";
import { useComboboxVariants } from "./variants";

const comboboxInput = cva(
  "min-w-0 flex-1 bg-transparent text-highlighted outline-none placeholder:text-dimmed disabled:cursor-not-allowed",
  {
    variants: { size: comboboxSizeData.input },
    defaultVariants: comboboxDefaults,
  },
);

export interface ComboboxInputProps extends React.ComponentProps<typeof Ark.Input> {}

export function ComboboxInput({ className, ...rest }: ComboboxInputProps) {
  const variants = useComboboxVariants();

  return (
    <Ark.Input
      {...rest}
      data-slot="combobox-input"
      className={cn(comboboxInput(variants), className)}
    />
  );
}
