import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * Swap styling data: plain class strings both adapters feed into their own `cva`
 * calls, one per anatomy part. Nothing here knows a framework.
 *
 * @remarks
 * Which icon the reader sees is chosen by presence, not by the adapter: Ark hides the
 * other indicator behind the `hidden` attribute, so one class string covers both
 * states. This is the arrangement the Switch uses for its thumb icons, with `on` and
 * `off` where the Switch says `checked` and `unchecked`.
 *
 * There is no `color`. A swap borrows its meaning from whatever it sits in — the play
 * button around it, the row it toggles — so it paints nothing of its own.
 */

export type SwapSize = "sm" | "md" | "lg";

/** What the root publishes and every part reads. Lives in each adapter. */
export interface SwapVariants {
  size: SwapSize;
}

export const swapDefaults = { size: "md" } as const;

export const swapSchema = {
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const swapParts = [
  { export: "Swap", file: "swap", contract: "SwapRootProps" },
  { export: "SwapIndicator", file: "indicator", contract: "SwapIndicatorProps" },
] as const satisfies readonly ComponentPart[];

export const swapSizeData = {
  indicator: {
    sm: "size-4",
    md: "size-5",
    lg: "size-6",
  },
} as const satisfies Record<string, Record<SwapSize, string>>;

/** Everything a Swap indicator accepts in both frameworks. */
export interface SwapIndicatorProps {
  /** Which state shows it. */
  type: "on" | "off";
}

/**
 * Everything the Swap root accepts in both frameworks.
 *
 * @remarks
 * The state is display-only: nothing inside a swap flips it, so `swap` is a plain
 * prop in both adapters rather than a model, and there is no change event.
 */
export interface SwapRootProps<F> {
  size?: SwapSize;
  /** Whether the swap shows its `on` icon. */
  swap?: boolean;
  /** Icon shown while on. */
  onIcon?: F;
  /** Icon shown while off. */
  offIcon?: F;
  /** Keep the hidden icon out of the DOM until it is shown for the first time. */
  lazyMount?: boolean;
  /** Remove the hidden icon from the DOM once it has finished hiding. */
  unmountOnExit?: boolean;
}
