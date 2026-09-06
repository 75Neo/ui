import type React from "react";
import { Listbox as Ark } from "@ark-ui/react/listbox";
import { cva } from "class-variance-authority";
import { Check } from "lucide-react";
import { cn, listboxDefaults, listboxSizeData } from "@75neo/themes";
import { useListboxVariants } from "./variants";

const listboxItemIndicator = cva("ms-auto shrink-0 [&>svg]:size-full", {
  variants: { size: listboxSizeData.itemIndicator },
  defaultVariants: listboxDefaults,
});

export interface ListboxItemIndicatorProps extends React.ComponentProps<typeof Ark.ItemIndicator> {}

export function ListboxItemIndicator({ className, children, ...rest }: ListboxItemIndicatorProps) {
  const variants = useListboxVariants();

  return (
    <Ark.ItemIndicator
      {...rest}
      data-slot="listbox-item-indicator"
      className={cn(listboxItemIndicator(variants), className)}
    >
      {children ?? <Check />}
    </Ark.ItemIndicator>
  );
}
