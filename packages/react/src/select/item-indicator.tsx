import type React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cva } from "class-variance-authority";
import { Check } from "lucide-react";
import { cn, selectDefaults, selectSizeData } from "@75neo/themes";
import { useSelectVariants } from "./variants";

const selectItemIndicator = cva("ms-auto shrink-0 [&>svg]:size-full", {
  variants: { size: selectSizeData.itemIndicator },
  defaultVariants: selectDefaults,
});

export interface SelectItemIndicatorProps extends React.ComponentProps<typeof Ark.ItemIndicator> {}

export function SelectItemIndicator({ className, children, ...rest }: SelectItemIndicatorProps) {
  const variants = useSelectVariants();

  return (
    <Ark.ItemIndicator
      {...rest}
      data-slot="select-item-indicator"
      className={cn(selectItemIndicator(variants), className)}
    >
      {children ?? <Check />}
    </Ark.ItemIndicator>
  );
}
