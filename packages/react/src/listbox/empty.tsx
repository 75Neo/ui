import type React from "react";
import { Listbox as Ark } from "@ark-ui/react/listbox";
import { cva } from "class-variance-authority";
import { cn, listboxDefaults, listboxSizeData } from "@75neo/themes";
import { useListboxVariants } from "./variants";

const listboxEmpty = cva("text-center text-muted", {
  variants: { size: listboxSizeData.empty },
  defaultVariants: listboxDefaults,
});

export interface ListboxEmptyProps extends React.ComponentProps<typeof Ark.Empty> {}

export function ListboxEmpty({ className, children, ...rest }: ListboxEmptyProps) {
  const variants = useListboxVariants();

  return (
    <Ark.Empty
      {...rest}
      data-slot="listbox-empty"
      className={cn(listboxEmpty(variants), className)}
    >
      {children}
    </Ark.Empty>
  );
}
