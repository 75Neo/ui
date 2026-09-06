import type React from "react";
import { Tooltip as Ark } from "@ark-ui/react/tooltip";
import { Portal } from "@ark-ui/react/portal";
import { cva } from "class-variance-authority";
import {
  cn,
  tooltipDefaults,
  tooltipSizeData,
  type TooltipContentProps as TooltipContentContract,
} from "@75neo/themes";
import { useTooltipVariants } from "./variants";

const tooltipContent = cva(
  "max-w-xs origin-(--transform-origin) rounded-md bg-inverted text-inverted shadow-md select-none",
  {
    variants: {
      size: tooltipSizeData.content,
      transition: {
        true: "data-[state=closed]:animate-panel-out data-[state=open]:animate-panel-in",
        false: "",
      },
    },
    defaultVariants: { ...tooltipDefaults, transition: true },
  },
);

export interface TooltipContentProps
  extends React.ComponentProps<typeof Ark.Content>, TooltipContentContract {
  /** Render the bubble at the end of `body`. @defaultValue `true` */
  portal?: boolean;
}

export function TooltipContent({
  transition,
  portal,
  className,
  children,
  ...rest
}: TooltipContentProps) {
  const variants = useTooltipVariants();
  const bubble = (
    <Ark.Positioner data-slot="tooltip-positioner" className="z-50">
      <Ark.Content
        {...rest}
        data-slot="tooltip-content"
        className={cn(tooltipContent({ ...variants, transition }), className)}
      >
        {children}
      </Ark.Content>
    </Ark.Positioner>
  );

  if (portal ?? true) return <Portal>{bubble}</Portal>;
  return bubble;
}
