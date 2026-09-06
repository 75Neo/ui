import type React from "react";
import { Listbox as Ark } from "@ark-ui/react/listbox";
import { cva } from "class-variance-authority";
import { cn, listboxDefaults, listboxSizeData } from "@75neo/themes";
import { useListboxVariants } from "./variants";

const listboxContent = cva(
  "flex max-h-60 w-full min-w-0 flex-col overflow-y-auto overscroll-contain rounded-md bg-default shadow-lg ring ring-accented outline-none data-disabled:opacity-75",
  {
    variants: { size: listboxSizeData.content },
    defaultVariants: listboxDefaults,
  },
);

export interface ListboxContentProps extends React.ComponentProps<typeof Ark.Content> {}

export function ListboxContent({ className, children, ...rest }: ListboxContentProps) {
  const variants = useListboxVariants();

  return (
    <Ark.Content
      {...rest}
      data-slot="listbox-content"
      className={cn(listboxContent(variants), className)}
    >
      {children}
    </Ark.Content>
  );
}
