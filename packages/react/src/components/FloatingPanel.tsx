import type React from "react";
import { FloatingPanel as Ark, type FloatingPanelRootProps } from "@ark-ui/react/floating-panel";
import { Portal } from "@ark-ui/react/portal";
import { GripVertical, Maximize2, Minimize2, Minus, X } from "lucide-react";
import {
  floatingPanel,
  floatingPanelResizeAxes,
  type FloatingPanelProps as FloatingPanelContract,
  type FloatingPanelStage,
} from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

const defaultStages: FloatingPanelStage[] = ["minimized", "maximized", "default"];

const stageIcons = {
  minimized: { label: "Minimize panel" },
  maximized: { label: "Maximize panel" },
  default: { label: "Restore panel" },
} as const;

/**
 * Props for the FloatingPanel.
 *
 * @remarks
 * `title` is dropped from the HTML attributes, because the global attribute is the
 * browser's own tooltip where this component's is the panel's heading.
 *
 * `children` is the trigger, not the body. See the note on `FloatingPanelProps` in
 * `@75neo/themes` for why the default slot is spent on the one element a caller has to
 * own.
 *
 * The pixel size Ark edits is `panelSize` here rather than `size`, because `size` is
 * already the width variant. It pairs with Ark's own `defaultSize`.
 */
export interface FloatingPanelProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "dir" | "draggable">,
    Pick<
      FloatingPanelRootProps,
      | "open"
      | "defaultOpen"
      | "onOpenChange"
      | "position"
      | "defaultPosition"
      | "onPositionChange"
      | "onPositionChangeEnd"
      | "defaultSize"
      | "minSize"
      | "maxSize"
      | "onSizeChange"
      | "onSizeChangeEnd"
      | "onStageChange"
      | "ids"
    >,
    FloatingPanelContract<React.ReactNode> {
  /** The element that opens the panel. It becomes the trigger and carries Ark's props. */
  children?: React.ReactNode;
  /** Replaces the whole header, including the grip, the title and the controls. */
  header?: React.ReactNode;
  /** Replaces the row of window controls at the end of the header. */
  control?: React.ReactNode;
  /** The panel's main content. */
  body?: React.ReactNode;
  /** The controlled size of the panel. Pairs with `defaultSize`. */
  panelSize?: FloatingPanelContract<React.ReactNode>["panelSize"];
}

export function FloatingPanel({
  ui,
  size,
  transition,
  title,
  stages = defaultStages,
  close = true,
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
  position,
  defaultSize,
  panelSize,
  minSize,
  maxSize,
  persistRect,
  portal = true,
  lazyMount,
  unmountOnExit,
  children,
  header,
  control,
  body,
  open,
  defaultOpen,
  onOpenChange,
  onPositionChange,
  onPositionChangeEnd,
  onSizeChange,
  onSizeChangeEnd,
  onStageChange,
  ids,
  className,
  ...rest
}: FloatingPanelProps) {
  const theme = useResolvedTheme(
    floatingPanel,
    "floatingPanel",
    { ui, size, transition },
    className,
  );

  const stageIcon = (stage: FloatingPanelStage) =>
    stage === "minimized"
      ? (minimizeIcon ?? <Minus />)
      : stage === "maximized"
        ? (maximizeIcon ?? <Maximize2 />)
        : (restoreIcon ?? <Minimize2 />);

  const panel = (
    <Ark.Positioner data-slot="positioner" className={theme.class.positioner}>
      <Ark.Content {...rest} data-slot="base" className={theme.class.base}>
        {header ?? (
          <Ark.DragTrigger data-slot="dragTrigger" className={theme.class.dragTrigger}>
            <Ark.Header data-slot="header" className={theme.class.header}>
              <span data-slot="dragIcon" className={theme.class.dragIcon}>
                {dragIcon ?? <GripVertical />}
              </span>
              {title != null && (
                <Ark.Title data-slot="title" className={theme.class.title}>
                  {title}
                </Ark.Title>
              )}
              {control ?? (
                <Ark.Control data-slot="control" className={theme.class.control}>
                  {stages.map((stage) => (
                    <Ark.StageTrigger
                      key={stage}
                      stage={stage}
                      aria-label={stageIcons[stage].label}
                      data-slot="stageTrigger"
                      className={theme.class.stageTrigger}
                    >
                      {stageIcon(stage)}
                    </Ark.StageTrigger>
                  ))}
                  {close && (
                    <Ark.CloseTrigger
                      aria-label="Close panel"
                      data-slot="closeTrigger"
                      className={theme.class.closeTrigger}
                    >
                      {closeIcon ?? <X />}
                    </Ark.CloseTrigger>
                  )}
                </Ark.Control>
              )}
            </Ark.Header>
          </Ark.DragTrigger>
        )}

        {body != null && (
          <Ark.Body data-slot="body" className={theme.class.body}>
            {body}
          </Ark.Body>
        )}

        {resizable !== false &&
          floatingPanelResizeAxes.map((axis) => (
            <Ark.ResizeTrigger
              key={axis}
              axis={axis}
              aria-label={`Resize panel ${axis}`}
              data-slot="resizeTrigger"
              className={theme.class.resizeTrigger}
            />
          ))}
      </Ark.Content>
    </Ark.Positioner>
  );

  return (
    <Ark.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      position={position}
      defaultPosition={defaultPosition}
      onPositionChange={onPositionChange}
      onPositionChangeEnd={onPositionChangeEnd}
      size={panelSize}
      defaultSize={defaultSize}
      minSize={minSize}
      maxSize={maxSize}
      onSizeChange={onSizeChange}
      onSizeChangeEnd={onSizeChangeEnd}
      onStageChange={onStageChange}
      draggable={draggable}
      resizable={resizable}
      disabled={disabled}
      closeOnEscape={closeOnEscape}
      strategy={strategy}
      persistRect={persistRect}
      lazyMount={lazyMount}
      unmountOnExit={unmountOnExit}
      ids={ids}
    >
      {children != null && <Ark.Trigger asChild>{children}</Ark.Trigger>}
      {portal ? <Portal>{panel}</Portal> : panel}
    </Ark.Root>
  );
}
