import type React from "react";
import { Splitter as Ark } from "@ark-ui/react/splitter";
import { cn, type SplitterPanelProps as SplitterPanelContract } from "@75neo/themes";

export interface SplitterPanelProps
  extends Omit<React.ComponentProps<typeof Ark.Panel>, "id">, SplitterPanelContract {}

export function SplitterPanel({ id, className, children, ...rest }: SplitterPanelProps) {
  return (
    <Ark.Panel
      {...rest}
      id={id}
      data-slot="splitter-panel"
      className={cn("min-h-0 min-w-0 overflow-auto data-dragging:select-none", className)}
    >
      {children}
    </Ark.Panel>
  );
}
