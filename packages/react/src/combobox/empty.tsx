import type React from "react";
import { Combobox as Ark } from "@ark-ui/react/combobox";
import { cva } from "class-variance-authority";
import { cn, comboboxDefaults, comboboxSizeData } from "@75neo/themes";
import { useComboboxVariants } from "./variants";

const comboboxEmpty = cva("text-center text-muted", {
  variants: { size: comboboxSizeData.empty },
  defaultVariants: comboboxDefaults,
});

export interface ComboboxEmptyProps extends React.ComponentProps<typeof Ark.Empty> {}

export function ComboboxEmpty({ className, children, ...rest }: ComboboxEmptyProps) {
  const variants = useComboboxVariants();

  return (
    <Ark.Empty
      {...rest}
      data-slot="combobox-empty"
      className={cn(comboboxEmpty(variants), className)}
    >
      {children}
    </Ark.Empty>
  );
}
