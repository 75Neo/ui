import type React from "react";
import { FloatingPanel as Ark } from "@ark-ui/react/floating-panel";
import { cva } from "class-variance-authority";
import { Portal } from "@ark-ui/react/portal";
import { cn, type FloatingPanelContentProps as FloatingPanelContentContract } from "@75neo/themes";

const floatingPanelContent = cva(
  "relative flex flex-col overflow-hidden rounded-xl bg-default shadow-lg ring ring-accented outline-none",
  {
    variants: {
      transition: {
        true: "data-[state=closed]:animate-panel-out data-[state=open]:animate-panel-in",
        false: "",
      },
    },
    defaultVariants: { transition: true },
  },
);

export interface FloatingPanelContentProps
  extends React.ComponentProps<typeof Ark.Content>, FloatingPanelContentContract {
  /** Render the panel at the end of `body`. @defaultValue `true` */
  portal?: boolean;
}

export function FloatingPanelContent({
  transition,
  portal,
  className,
  children,
  ...rest
}: FloatingPanelContentProps) {
  const panel = (
    <Ark.Positioner data-slot="floating-panel-positioner" className="z-50">
      <Ark.Content
        {...rest}
        data-slot="floating-panel-content"
        className={cn(floatingPanelContent({ transition }), className)}
      >
        {children}
      </Ark.Content>
    </Ark.Positioner>
  );

  if (portal ?? true) return <Portal>{panel}</Portal>;
  return panel;
}
