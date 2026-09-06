import type React from "react";
import { Combobox as Ark } from "@ark-ui/react/combobox";
import { cva } from "class-variance-authority";
import { Portal } from "@ark-ui/react/portal";
import { cn, comboboxDefaults, comboboxSizeData } from "@75neo/themes";
import { useComboboxVariants } from "./variants";

const comboboxContent = cva(
  "flex max-h-60 min-w-(--reference-width) flex-col overflow-hidden rounded-md bg-default shadow-lg ring ring-accented outline-none",
  {
    variants: { size: comboboxSizeData.content },
    defaultVariants: comboboxDefaults,
  },
);

export interface ComboboxContentProps extends React.ComponentProps<typeof Ark.Content> {
  /** Render the panel at the end of `body`. @defaultValue `true` */
  portal?: boolean;
}

export function ComboboxContent({ portal, className, children, ...rest }: ComboboxContentProps) {
  const variants = useComboboxVariants();
  const panel = (
    <Ark.Positioner data-slot="combobox-positioner" className="z-50">
      <Ark.Content
        {...rest}
        data-slot="combobox-content"
        className={cn(comboboxContent(variants), className)}
      >
        {children}
      </Ark.Content>
    </Ark.Positioner>
  );

  if (portal ?? true) return <Portal>{panel}</Portal>;
  return panel;
}
