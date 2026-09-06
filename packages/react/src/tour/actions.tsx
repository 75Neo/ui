import type React from "react";
import { Tour as Ark, type TourActionTriggerProps } from "@ark-ui/react/tour";
import { cn } from "@75neo/themes";

export interface TourActionsProps {
  className?: string;
  children?: (actions: TourActionTriggerProps["action"][]) => React.ReactNode;
}

export function TourActions({ className, children }: TourActionsProps) {
  return (
    <span data-slot="tour-actions" className={cn("contents", className)}>
      <Ark.Actions>{children ?? (() => null)}</Ark.Actions>
    </span>
  );
}
