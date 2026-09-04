import type React from "react";
import { Splitter as Ark, type SplitterRootProps } from "@ark-ui/react/splitter";
import {
  splitter,
  type SplitterPanel,
  type SplitterProps as SplitterContract,
} from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the Splitter.
 */
export interface SplitterProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "dir">,
    Pick<
      SplitterRootProps,
      "onResize" | "onResizeStart" | "onResizeEnd" | "onCollapse" | "onExpand" | "ids"
    >,
    SplitterContract {
  /** Replace a panel's content with arbitrary markup. Falls back to `panel.content`. */
  renderPanel?: (panel: SplitterPanel) => React.ReactNode;
}

export function Splitter({
  ui,
  orientation,
  panels,
  defaultSize,
  size,
  keyboardResizeBy,
  renderPanel,
  onResize,
  onResizeStart,
  onResizeEnd,
  onCollapse,
  onExpand,
  ids,
  className,
  ...rest
}: SplitterProps) {
  const theme = useResolvedTheme(splitter, "splitter", { ui }, className);

  /*
   * Ark's panels carry constraints only; the content and the disabled flag are this
   * library's own, so they are stripped before the array reaches the root. A handle
   * is disabled when either panel it touches is, and named off both of them.
   */
  const panelData = panels.map(({ id, minSize, maxSize, collapsible, collapsedSize }) => ({
    id,
    minSize,
    maxSize,
    collapsible,
    collapsedSize,
  }));

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
      panels={panelData}
      orientation={orientation}
      defaultSize={defaultSize}
      size={size}
      keyboardResizeBy={keyboardResizeBy}
      onResize={onResize}
      onResizeStart={onResizeStart}
      onResizeEnd={onResizeEnd}
      onCollapse={onCollapse}
      onExpand={onExpand}
      ids={ids}
    >
      {panels.flatMap((panel, index) => {
        const peer = panels[index + 1];
        const handle =
          peer == null ? null : (
            <Ark.ResizeTrigger
              key={`handle:${panel.id}:${peer.id}`}
              id={`${panel.id}:${peer.id}`}
              aria-label={`Resize ${panel.id} and ${peer.id}`}
              disabled={panel.disabled || peer.disabled}
              data-slot="handle"
              className={theme.class.handle}
            >
              <Ark.ResizeTriggerIndicator
                data-slot="handleIndicator"
                className={theme.class.handleIndicator}
              />
            </Ark.ResizeTrigger>
          );

        return [
          <Ark.Panel key={panel.id} id={panel.id} data-slot="panel" className={theme.class.panel}>
            {renderPanel?.(panel) ?? panel.content}
          </Ark.Panel>,
          handle,
        ];
      })}
    </Ark.Root>
  );
}
