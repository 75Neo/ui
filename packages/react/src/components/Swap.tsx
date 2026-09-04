import type React from "react";
import { Swap as Ark } from "@ark-ui/react/swap";
import { type SwapProps as SwapContract, swap } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the Swap.
 *
 * @remarks
 * The state is display-only — nothing inside a swap flips it — so `swap` is a plain
 * prop rather than a controlled value, and there is no change event.
 */
export interface SwapProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "dir">, SwapContract<React.ReactNode> {}

export function Swap({
  ui,
  size,
  swap: swapped,
  onIcon,
  offIcon,
  lazyMount,
  unmountOnExit,
  className,
  ...rest
}: SwapProps) {
  const theme = useResolvedTheme(swap, "swap", { ui, size }, className);

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
      swap={swapped}
      lazyMount={lazyMount}
      unmountOnExit={unmountOnExit}
    >
      <Ark.Indicator type="on" data-slot="onIcon" className={theme.class.onIcon}>
        {onIcon}
      </Ark.Indicator>
      <Ark.Indicator type="off" data-slot="offIcon" className={theme.class.offIcon}>
        {offIcon}
      </Ark.Indicator>
    </Ark.Root>
  );
}
