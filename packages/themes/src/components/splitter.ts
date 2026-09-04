import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";

/**
 * Recipe for the Splitter: resizable panels divided by draggable handles.
 *
 * @remarks
 * There are no variants. Layout comes from the component's own props — the panels it
 * is given and the direction they split — and orientation is styled off the
 * `data-orientation` attribute Ark sets on every part rather than declared as one.
 * The Carousel reads its orientation the same way, and for the same reason: one
 * resolved class string covers both directions.
 *
 * The handle is a roomy invisible bar with a small visible pill, so the grab target
 * stays generous on touch while the page keeps a hairline. The pill lights up on
 * hover, on focus and mid-drag off the handle's own state, which is why the handle
 * opens a group for it. A disabled handle dims the pair, styled off `data-disabled`
 * rather than `disabled:`: Ark's resize trigger is a native button that still
 * carries only `data-disabled`, the way the Collapsible's trigger does.
 *
 * There is no `color` variant. A divider carries no meaning; what it divides does.
 */
export const splitter = tv({
  slots: {
    base: "group/splitter flex min-h-0 min-w-0 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row data-[orientation=vertical]:h-full data-[orientation=vertical]:flex-col",
    panel: "min-h-0 min-w-0 overflow-auto data-dragging:select-none",
    handle:
      "group/handle flex shrink-0 cursor-col-resize touch-none items-center justify-center rounded-full outline-primary/25 select-none focus-visible:outline-3 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-[orientation=horizontal]:w-3 data-[orientation=vertical]:h-3 data-[orientation=vertical]:cursor-row-resize",
    handleIndicator:
      "rounded-full bg-accented transition-colors group-hover/handle:bg-inverted/60 group-focus-visible/handle:bg-inverted/60 group-data-[dragging]/handle:bg-inverted data-[orientation=horizontal]:h-8 data-[orientation=horizontal]:w-1 data-[orientation=vertical]:h-1 data-[orientation=vertical]:w-8",
  },
  variants: {},
});

export type SplitterVariants = VariantProps<typeof splitter>;
export type SplitterSlots = keyof ReturnType<typeof splitter>;

export type SplitterUI = TVSlot<SplitterSlots>;

export type SplitterTheme = ThemeOverride<SplitterSlots, SplitterVariants>;

/** One panel: its constraints for Ark and its content for the adapter. */
export interface SplitterPanel {
  /** Identifies the panel. Handles are named `"<id>:<id>"` off their neighbours. */
  id: string;
  /** Panel text. Anything richer goes through the adapter's own escape hatch. */
  content?: string;
  /** The smallest share of the splitter this panel keeps. */
  minSize?: number | string;
  /** The largest share of the splitter this panel takes. */
  maxSize?: number | string;
  /** Whether the panel collapses to `collapsedSize`. */
  collapsible?: boolean;
  /** The share the panel keeps while collapsed. */
  collapsedSize?: number | string;
  /** Also disables the handles touching this panel. */
  disabled?: boolean;
}

/**
 * Everything a Splitter accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @remarks
 * A panel's content is a string on the item, and anything richer goes through the
 * adapter's own escape hatch: `renderPanel` in React, the scoped `panel` slot in
 * Vue. The Tabs takes tab panels the same way.
 *
 * Sizes are numbers for percentages and strings for pixels, which is Ark's own
 * vocabulary. The resize callbacks are not here: the theme package takes no Ark
 * dependency, so each adapter takes them from Ark's root instead.
 */
export interface SplitterProps {
  /** Per-slot class overrides. */
  ui?: SplitterUI;
  /** Which way the panels split. @defaultValue `"horizontal"` */
  orientation?: "horizontal" | "vertical";
  /** The panels to render, in order. Handles land between each pair. */
  panels: SplitterPanel[];
  /** The panels' starting shares, as percentages. */
  defaultSize?: number[];
  /** The panels' controlled shares, as percentages. */
  size?: number[];
  /** How many pixels a handle moves per arrow key press. */
  keyboardResizeBy?: number;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type SplitterVariantsAreExposed = MustBeNever<
  Exclude<keyof SplitterVariants, keyof SplitterProps>
>;

declare global {
  interface Neo75ComponentThemes {
    splitter: ComponentContract<SplitterSlots, SplitterVariants>;
  }
}
