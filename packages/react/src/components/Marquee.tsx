import type React from "react";
import { Marquee as Ark, type MarqueeRootProps } from "@ark-ui/react/marquee";
import { type MarqueeItem, type MarqueeProps as MarqueeContract, marquee } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the Marquee.
 *
 * @remarks
 * The pause state comes from Ark, because React and Vue spell a controlled value too
 * differently to share one type.
 */
export interface MarqueeProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "dir">,
    Pick<
      MarqueeRootProps,
      "paused" | "defaultPaused" | "onPauseChange" | "onComplete" | "onLoopComplete" | "ids"
    >,
    MarqueeContract {
  /** Replace an item's text with arbitrary markup. Falls back to `item.content`. */
  renderItem?: (item: MarqueeItem, index: number) => React.ReactNode;
}

export function Marquee({
  ui,
  side,
  size,
  speed,
  items,
  edge,
  autoFill,
  spacing,
  delay,
  loopCount,
  reverse,
  pauseOnInteraction,
  renderItem,
  className,
  paused,
  defaultPaused,
  onPauseChange,
  onComplete,
  onLoopComplete,
  ids,
  ...rest
}: MarqueeProps) {
  const theme = useResolvedTheme(marquee, "marquee", { ui, side, size, speed }, className);

  // The variant defaults to `"start"`, so the edges follow the same fallback: a caller
  // that never names a side scrolls horizontally.
  const direction = side ?? "start";
  const edgeSides =
    direction === "top" || direction === "bottom" ? ["top", "bottom"] : ["start", "end"];

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
      side={side}
      autoFill={autoFill}
      spacing={spacing}
      delay={delay}
      loopCount={loopCount}
      reverse={reverse}
      paused={paused}
      defaultPaused={defaultPaused}
      onPauseChange={onPauseChange}
      pauseOnInteraction={pauseOnInteraction}
      onComplete={onComplete}
      onLoopComplete={onLoopComplete}
      ids={ids}
    >
      {edge &&
        edgeSides.map((edgeSide) => (
          <Ark.Edge
            key={edgeSide}
            side={edgeSide as "start" | "end" | "top" | "bottom"}
            data-slot="edge"
            className={theme.class.edge}
          />
        ))}
      <Ark.Viewport data-slot="viewport" className={theme.class.viewport}>
        <Ark.Content data-slot="content" className={theme.class.content}>
          {items.map((item, index) => (
            <Ark.Item key={item.id} data-slot="item" className={theme.class.item}>
              {renderItem?.(item, index) ?? item.content}
            </Ark.Item>
          ))}
        </Ark.Content>
      </Ark.Viewport>
    </Ark.Root>
  );
}
