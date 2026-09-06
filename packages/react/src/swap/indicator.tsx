import type React from "react";
import { Swap as Ark } from "@ark-ui/react/swap";
import { cva } from "class-variance-authority";
import {
  cn,
  swapDefaults,
  swapSizeData,
  type SwapIndicatorProps as SwapIndicatorContract,
} from "@75neo/themes";
import { useSwapVariants } from "./variants";

const swapIndicator = cva("shrink-0 [&>svg]:size-full", {
  variants: { size: swapSizeData.indicator },
  defaultVariants: swapDefaults,
});

export interface SwapIndicatorProps
  extends Omit<React.ComponentProps<typeof Ark.Indicator>, "type">, SwapIndicatorContract {}

export function SwapIndicator({ type, className, children, ...rest }: SwapIndicatorProps) {
  const variants = useSwapVariants();

  return (
    <Ark.Indicator
      {...rest}
      type={type}
      data-slot={`swap-${type}-indicator`}
      className={cn(swapIndicator(variants), className)}
    >
      {children}
    </Ark.Indicator>
  );
}
