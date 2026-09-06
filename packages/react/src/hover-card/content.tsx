import type React from "react";
import { HoverCard as Ark } from "@ark-ui/react/hover-card";
import { cva } from "class-variance-authority";
import { Portal } from "@ark-ui/react/portal";
import {
  cn,
  hoverCardSizeData,
  type HoverCardContentProps as HoverCardContentContract,
} from "@75neo/themes";
import { useHoverCardVariants } from "./variants";

const hoverCardContent = cva(
  "relative flex origin-(--transform-origin) flex-col rounded-xl bg-default shadow-lg ring ring-accented outline-none",
  {
    variants: {
      size: hoverCardSizeData.base,
      transition: {
        true: "data-[state=closed]:animate-panel-out data-[state=open]:animate-panel-in",
        false: "",
      },
    },
    defaultVariants: { size: "md", transition: true },
  },
);

export interface HoverCardContentProps
  extends React.ComponentProps<typeof Ark.Content>, HoverCardContentContract {
  /** Render the card at the end of `body`. @defaultValue `true` */
  portal?: boolean;
}

export function HoverCardContent({
  transition,
  portal,
  className,
  children,
  ...rest
}: HoverCardContentProps) {
  const variants = useHoverCardVariants();
  const panel = (
    <Ark.Positioner data-slot="hover-card-positioner" className="z-50">
      <Ark.Content
        {...rest}
        data-slot="hover-card-content"
        className={cn(hoverCardContent({ ...variants, transition }), className)}
      >
        {children}
      </Ark.Content>
    </Ark.Positioner>
  );

  if (portal ?? true) return <Portal>{panel}</Portal>;
  return panel;
}
