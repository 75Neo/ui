import type React from "react";
import { Combobox as Ark } from "@ark-ui/react/combobox";
import { cva } from "class-variance-authority";
import { Check } from "lucide-react";
import { cn, comboboxDefaults, comboboxSizeData } from "@75neo/themes";
import { useComboboxVariants } from "./variants";

const comboboxItemIndicator = cva("ms-auto shrink-0 [&>svg]:size-full", {
  variants: { size: comboboxSizeData.itemIndicator },
  defaultVariants: comboboxDefaults,
});

export interface ComboboxItemIndicatorProps extends React.ComponentProps<
  typeof Ark.ItemIndicator
> {}

export function ComboboxItemIndicator({
  className,
  children,
  ...rest
}: ComboboxItemIndicatorProps) {
  const variants = useComboboxVariants();

  return (
    <Ark.ItemIndicator
      {...rest}
      data-slot="combobox-item-indicator"
      className={cn(comboboxItemIndicator(variants), className)}
    >
      {children ?? <Check />}
    </Ark.ItemIndicator>
  );
}
