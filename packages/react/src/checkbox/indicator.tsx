import type React from "react";
import { Checkbox as Ark } from "@ark-ui/react/checkbox";
import { cva } from "class-variance-authority";
import { Check } from "lucide-react";
import { cn, checkboxDefaults, checkboxSizeData } from "@75neo/themes";
import { useCheckboxVariants } from "./variants";

const checkboxIndicator = cva("flex items-center justify-center [&>svg]:size-full", {
  variants: { size: checkboxSizeData.indicator },
  defaultVariants: checkboxDefaults,
});

export interface CheckboxIndicatorProps extends React.ComponentProps<typeof Ark.Indicator> {}

export function CheckboxIndicator({
  indeterminate,
  className,
  children,
  ...rest
}: CheckboxIndicatorProps) {
  const variants = useCheckboxVariants();

  return (
    <Ark.Indicator
      {...rest}
      indeterminate={indeterminate}
      data-slot="checkbox-indicator"
      className={cn(checkboxIndicator(variants), className)}
    >
      {children ?? <Check />}
    </Ark.Indicator>
  );
}
