import type React from "react";
import { Splitter as Ark } from "@ark-ui/react/splitter";
import { cva } from "class-variance-authority";
import {
  cn,
  splitterDefaults,
  splitterSizeData,
  type SplitterResizeTriggerProps as SplitterResizeTriggerContract,
} from "@75neo/themes";
import { useSplitterVariants } from "./variants";

const splitterResizeTrigger = cva(
  "group/handle flex shrink-0 cursor-col-resize touch-none items-center justify-center rounded-full outline-primary/25 select-none focus-visible:outline-3 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-[orientation=vertical]:cursor-row-resize",
  {
    variants: { size: splitterSizeData.resizeTrigger },
    defaultVariants: splitterDefaults,
  },
);

const splitterIndicator = cva(
  "rounded-full bg-accented transition-colors group-hover/handle:bg-inverted/60 group-focus-visible/handle:bg-inverted/60 group-data-[dragging]/handle:bg-inverted",
  {
    variants: { size: splitterSizeData.indicator },
    defaultVariants: splitterDefaults,
  },
);

export interface SplitterResizeTriggerProps
  extends
    Omit<React.ComponentProps<typeof Ark.ResizeTrigger>, "id">,
    SplitterResizeTriggerContract {}

export function SplitterResizeTrigger({
  id,
  disabled,
  className,
  children,
  ...rest
}: SplitterResizeTriggerProps) {
  const variants = useSplitterVariants();

  return (
    <Ark.ResizeTrigger
      {...rest}
      id={id as React.ComponentProps<typeof Ark.ResizeTrigger>["id"]}
      disabled={disabled}
      data-slot="splitter-resize-trigger"
      className={cn(splitterResizeTrigger(variants), className)}
    >
      {children ?? (
        <Ark.ResizeTriggerIndicator
          data-slot="splitter-resize-trigger-indicator"
          className={splitterIndicator(variants)}
        />
      )}
    </Ark.ResizeTrigger>
  );
}
