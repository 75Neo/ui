import type React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cva } from "class-variance-authority";
import { Portal } from "@ark-ui/react/portal";
import { cn, selectDefaults, selectSizeData } from "@75neo/themes";
import { useSelectVariants } from "./variants";

const selectContent = cva(
  "flex max-h-60 min-w-(--reference-width) flex-col overflow-hidden rounded-md bg-default shadow-lg ring ring-accented outline-none",
  {
    variants: { size: selectSizeData.content },
    defaultVariants: selectDefaults,
  },
);

export interface SelectContentProps extends React.ComponentProps<typeof Ark.Content> {
  /** Render the panel at the end of `body`. @defaultValue `true` */
  portal?: boolean;
}

export function SelectContent({ portal, className, children, ...rest }: SelectContentProps) {
  const variants = useSelectVariants();
  const panel = (
    <>
      <Ark.Positioner data-slot="select-positioner" className="z-50">
        <Ark.Content
          {...rest}
          data-slot="select-content"
          className={cn(selectContent(variants), className)}
        >
          {children}
        </Ark.Content>
      </Ark.Positioner>
    </>
  );

  if (portal ?? true) return <Portal>{panel}</Portal>;
  return panel;
}
