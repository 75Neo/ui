import type React from "react";
import { Popover as Ark } from "@ark-ui/react/popover";
import { cva } from "class-variance-authority";
import { Portal } from "@ark-ui/react/portal";
import {
  cn,
  popoverSizeData,
  type PopoverContentProps as PopoverContentContract,
} from "@75neo/themes";
import { usePopoverVariants } from "./variants";

const popoverContent = cva(
  "relative flex origin-(--transform-origin) flex-col rounded-xl bg-default shadow-lg ring ring-accented outline-none",
  {
    variants: {
      size: popoverSizeData.base,
      transition: {
        true: "data-[state=closed]:animate-panel-out data-[state=open]:animate-panel-in",
        false: "",
      },
    },
    defaultVariants: { size: "md", transition: true },
  },
);

export interface PopoverContentProps
  extends React.ComponentProps<typeof Ark.Content>, PopoverContentContract {
  /** Render the panel at the end of `body`. @defaultValue `true` */
  portal?: boolean;
}

export function PopoverContent({
  transition,
  portal,
  className,
  children,
  ...rest
}: PopoverContentProps) {
  const variants = usePopoverVariants();
  const panel = (
    <Ark.Positioner data-slot="popover-positioner" className="z-50">
      <Ark.Content
        {...rest}
        data-slot="popover-content"
        className={cn(popoverContent({ ...variants, transition }), className)}
      >
        {children}
      </Ark.Content>
    </Ark.Positioner>
  );

  if (portal ?? true) return <Portal>{panel}</Portal>;
  return panel;
}
