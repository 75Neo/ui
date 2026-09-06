import type React from "react";
import { Combobox as Ark } from "@ark-ui/react/combobox";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { cn, comboboxDefaults, comboboxSizeData } from "@75neo/themes";
import { useComboboxVariants } from "./variants";

const comboboxClearTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm text-dimmed transition-colors outline-none hover:text-default disabled:cursor-not-allowed [&>svg]:size-full",
  {
    variants: { size: comboboxSizeData.clearTrigger },
    defaultVariants: comboboxDefaults,
  },
);

export interface ComboboxClearTriggerProps extends React.ComponentProps<typeof Ark.ClearTrigger> {}

export function ComboboxClearTrigger({ className, children, ...rest }: ComboboxClearTriggerProps) {
  const variants = useComboboxVariants();

  return (
    <Ark.ClearTrigger
      {...rest}
      data-slot="combobox-clear-trigger"
      className={cn(comboboxClearTrigger(variants), className)}
    >
      {children ?? <X />}
    </Ark.ClearTrigger>
  );
}
