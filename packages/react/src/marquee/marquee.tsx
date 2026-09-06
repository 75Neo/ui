import type React from "react";
import { Marquee as Ark } from "@ark-ui/react/marquee";
import { cn, marqueeDefaults, type MarqueeRootProps as MarqueeContract } from "@75neo/themes";
import { MarqueeVariantsContext } from "./variants";
import { MarqueeContent } from "./content";
import { MarqueeEdge } from "./edge";
import { MarqueeItem } from "./item";
import { MarqueeViewport } from "./viewport";

export interface MarqueeProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "dir">,
    Pick<
      React.ComponentProps<typeof Ark.Root>,
      "paused" | "defaultPaused" | "onPauseChange" | "onComplete" | "onLoopComplete" | "ids"
    >,
    MarqueeContract {
  children?: React.ReactNode;
}

export function Marquee({
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
  paused,
  defaultPaused,
  onPauseChange,
  onComplete,
  onLoopComplete,
  ids,
  className,
  children,
  ...rest
}: MarqueeProps) {
  const resolved = {
    side: side ?? marqueeDefaults.side,
    size: size ?? marqueeDefaults.size,
    speed: speed ?? marqueeDefaults.speed,
  };

  // The edges follow the side, so a marquee that never names one fades left and right.
  const edgeSides =
    resolved.side === "top" || resolved.side === "bottom"
      ? (["top", "bottom"] as const)
      : (["start", "end"] as const);

  return (
    <MarqueeVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
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
        data-slot="marquee"
        data-size={resolved.size}
        data-speed={resolved.speed}
        className={cn(
          "relative w-full overflow-hidden data-paused:**:[animation-play-state:paused] data-[orientation=vertical]:h-60",
          className,
        )}
      >
        {children ?? (
          <>
            {edge && edgeSides.map((edgeSide) => <MarqueeEdge key={edgeSide} side={edgeSide} />)}
            <MarqueeViewport>
              <MarqueeContent>
                {items?.map((item) => (
                  <MarqueeItem key={item.id}>{item.content}</MarqueeItem>
                ))}
              </MarqueeContent>
            </MarqueeViewport>
          </>
        )}
      </Ark.Root>
    </MarqueeVariantsContext.Provider>
  );
}
