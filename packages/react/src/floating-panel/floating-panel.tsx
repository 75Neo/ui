import type React from "react";
import { FloatingPanel as Ark } from "@ark-ui/react/floating-panel";
import { ArrowDownLeft, GripVertical, Maximize2, Minus } from "lucide-react";
import {
  floatingPanelDefaults,
  floatingPanelResizeAxes,
  type FloatingPanelRootProps as FloatingPanelContract,
} from "@75neo/themes";
import { FloatingPanelVariantsContext } from "./variants";
import { FloatingPanelBody } from "./body";
import { FloatingPanelCloseTrigger } from "./close-trigger";
import { FloatingPanelContent } from "./content";
import { FloatingPanelControl } from "./control";
import { FloatingPanelDragTrigger } from "./drag-trigger";
import { FloatingPanelHeader } from "./header";
import { FloatingPanelResizeTrigger } from "./resize-trigger";
import { FloatingPanelStageTrigger } from "./stage-trigger";
import { FloatingPanelTitle } from "./title";

/**
 * Props for the FloatingPanel.
 *
 * @remarks
 * `title` is dropped from the HTML attributes, because the global attribute is the
 * wrong kind of title, and `dir` belongs to the locale provider.
 *
 * The open state comes from Ark, because React and Vue spell a controlled value too
 * differently to share one type. The pixel size reaches Ark as `size`, so the shared
 * contract names it `panelSize` and the `md` in the room stays the variant.
 *
 * `children` is the trigger, not the body: the body is data, and the one element a
 * caller has to own is what opens the panel.
 */
export interface FloatingPanelProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "dir" | "draggable">,
    Pick<React.ComponentProps<typeof Ark.Root>, "open" | "defaultOpen" | "onOpenChange" | "ids">,
    FloatingPanelContract<React.ReactNode> {
  /** The element that opens the panel. It becomes the trigger. */
  children?: React.ReactNode;
}

export function FloatingPanel({
  size,
  transition,
  title,
  header,
  body,
  stages,
  close,
  closeIcon,
  dragIcon,
  minimizeIcon,
  maximizeIcon,
  restoreIcon,
  draggable,
  resizable,
  disabled,
  closeOnEscape,
  strategy,
  defaultPosition,
  defaultSize,
  panelSize,
  minSize,
  maxSize,
  persistRect,
  portal,
  lazyMount,
  unmountOnExit,
  children,
  open,
  defaultOpen,
  onOpenChange,
  ids,
  className,
  ...rest
}: FloatingPanelProps) {
  const resolved = { size: size ?? floatingPanelDefaults.size };

  return (
    <FloatingPanelVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        draggable={draggable}
        resizable={resizable}
        disabled={disabled}
        closeOnEscape={closeOnEscape}
        strategy={strategy}
        defaultPosition={defaultPosition}
        defaultSize={defaultSize}
        size={panelSize}
        minSize={minSize}
        maxSize={maxSize}
        persistRect={persistRect}
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        ids={ids}
        data-slot="floating-panel"
        data-size={resolved.size}
      >
        {children != null && <Ark.Trigger asChild>{children}</Ark.Trigger>}
        <FloatingPanelContent portal={portal} transition={transition} className={className}>
          {header ?? (
            <FloatingPanelDragTrigger>
              <FloatingPanelHeader>
                {title != null && (
                  <FloatingPanelTitle>
                    {dragIcon ?? <GripVertical />}
                    {title}
                  </FloatingPanelTitle>
                )}
                <FloatingPanelControl>
                  {(stages ?? ["minimized", "maximized", "default"]).map((stage) => (
                    <FloatingPanelStageTrigger key={stage} stage={stage}>
                      {stage === "minimized"
                        ? (minimizeIcon ?? <Minus />)
                        : stage === "maximized"
                          ? (maximizeIcon ?? <Maximize2 />)
                          : (restoreIcon ?? <ArrowDownLeft />)}
                    </FloatingPanelStageTrigger>
                  ))}
                  {(close ?? true) && (
                    <FloatingPanelCloseTrigger aria-label="Close panel">
                      {closeIcon}
                    </FloatingPanelCloseTrigger>
                  )}
                </FloatingPanelControl>
              </FloatingPanelHeader>
            </FloatingPanelDragTrigger>
          )}
          {body != null && <FloatingPanelBody>{body}</FloatingPanelBody>}
          {(resizable ?? true) &&
            floatingPanelResizeAxes.map((axis) => (
              <FloatingPanelResizeTrigger key={axis} axis={axis} />
            ))}
        </FloatingPanelContent>
      </Ark.Root>
    </FloatingPanelVariantsContext.Provider>
  );
}
