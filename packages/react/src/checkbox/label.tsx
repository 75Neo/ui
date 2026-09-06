import type React from "react";
import { Checkbox as Ark } from "@ark-ui/react/checkbox";
import { cva } from "class-variance-authority";
import { cn, checkboxDefaults, checkboxSizeData } from "@75neo/themes";
import { useCheckboxVariants } from "./variants";

const checkboxLabel = cva("block font-medium text-highlighted select-none", {
  variants: { size: checkboxSizeData.label },
  defaultVariants: checkboxDefaults,
});

export interface CheckboxLabelProps extends React.ComponentProps<typeof Ark.Label> {}

export function CheckboxLabel({ className, children, ...rest }: CheckboxLabelProps) {
  const variants = useCheckboxVariants();

  return (
    <Ark.Label
      {...rest}
      data-slot="checkbox-label"
      className={cn(checkboxLabel(variants), className)}
    >
      {children}
    </Ark.Label>
  );
}
