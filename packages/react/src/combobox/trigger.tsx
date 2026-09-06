import type React from "react";
import { Combobox as Ark } from "@ark-ui/react/combobox";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import { cn, comboboxDefaults, comboboxSizeData } from "@75neo/themes";
import { useComboboxVariants } from "./variants";

const comboboxTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm text-dimmed transition-transform outline-none hover:text-default disabled:cursor-not-allowed data-[state=open]:rotate-180 [&>svg]:size-full",
  {
    variants: { size: comboboxSizeData.trigger },
    defaultVariants: comboboxDefaults,
  },
);

export interface ComboboxTriggerProps extends React.ComponentProps<typeof Ark.Trigger> {}

export function ComboboxTrigger({ className, children, ...rest }: ComboboxTriggerProps) {
  const variants = useComboboxVariants();

  return (
    <Ark.Trigger
      {...rest}
      data-slot="combobox-trigger"
      className={cn(comboboxTrigger(variants), className)}
    >
      {children ?? <ChevronDown />}
    </Ark.Trigger>
  );
}
