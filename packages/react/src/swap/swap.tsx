import type React from "react";
import { Swap as Ark } from "@ark-ui/react/swap";
import { cn, swapDefaults, type SwapRootProps as SwapContract } from "@75neo/themes";
import { SwapVariantsContext } from "./variants";
import { SwapIndicator } from "./indicator";

/**
 * Props for the Swap.
 *
 * @remarks
 * The prop is spelled `swapped` here because `swap` is the component's own name, and
 * a prop matching its element would read as a typo at every call site.
 */
export interface SwapProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "dir">,
    Omit<SwapContract<React.ReactNode>, "swap"> {
  /** Whether the swap shows its `on` icon. */
  swapped?: boolean;
  children?: React.ReactNode;
}

export function Swap({
  size,
  swapped,
  onIcon,
  offIcon,
  lazyMount,
  unmountOnExit,
  className,
  children,
  ...rest
}: SwapProps) {
  const resolved = { size: size ?? swapDefaults.size };

  return (
    <SwapVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        swap={swapped}
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        data-slot="swap"
        data-size={resolved.size}
        className={cn("inline-flex shrink-0 items-center justify-center", className)}
      >
        {children ?? (
          <>
            <SwapIndicator type="on">{onIcon}</SwapIndicator>
            <SwapIndicator type="off">{offIcon}</SwapIndicator>
          </>
        )}
      </Ark.Root>
    </SwapVariantsContext.Provider>
  );
}
