import { tv } from "tailwind-variants/lite";

const controlTrigger =
  "inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors hover:bg-muted hover:text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted [&>svg]:size-3.5";

export const floatingPanel = tv({
  slots: {
    positioner: "z-50",
    content:
      "flex flex-col overflow-hidden rounded-md bg-elevated shadow-lg ring ring-default outline-none data-behind:opacity-90 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in",
    header:
      "flex shrink-0 cursor-grab items-center gap-2 border-b border-default px-3 py-2 data-dragging:cursor-grabbing",
    title: "min-w-0 flex-1 truncate text-sm font-medium text-default",
    body: "min-h-0 flex-1 overflow-auto p-3 text-sm text-muted",
    control: "flex items-center gap-0.5",
    dragTrigger: "min-w-0 flex-1 cursor-grab",
    stageTrigger: controlTrigger,
    closeTrigger: controlTrigger,
    resizeTrigger:
      "absolute data-[axis=e]:cursor-ew-resize data-[axis=n]:cursor-ns-resize data-[axis=ne]:cursor-nesw-resize data-[axis=nw]:cursor-nwse-resize data-[axis=s]:cursor-ns-resize data-[axis=se]:cursor-nwse-resize data-[axis=sw]:cursor-nesw-resize data-[axis=w]:cursor-ew-resize",
  },
});

export const floatingPanelStyles = floatingPanel();
