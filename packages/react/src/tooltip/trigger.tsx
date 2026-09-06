import type React from "react";
import { Tooltip as Ark } from "@ark-ui/react/tooltip";

export interface TooltipTriggerProps extends React.ComponentProps<typeof Ark.Trigger> {}

/**
 * The element the bubble explains.
 *
 * @remarks
 * Handed to Ark with `asChild`, so the trigger is the caller's own element rather
 * than a button wrapping it. That element has to be focusable, or the tooltip is
 * reachable by pointer only.
 */
export function TooltipTrigger({ children, ...rest }: TooltipTriggerProps) {
  return (
    <Ark.Trigger {...rest} asChild>
      {children}
    </Ark.Trigger>
  );
}
