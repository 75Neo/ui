import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";

/**
 * Where a popup sits relative to the element it belongs to.
 *
 * @remarks
 * The twelve Ark understands, written out rather than imported, because Vue's
 * `defineProps` resolves types from source and cannot follow one into a dependency's
 * declaration files.
 */
export type Placement =
  | "top"
  | "top-start"
  | "top-end"
  | "right"
  | "right-start"
  | "right-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end";

/**
 * Recipe for the Tooltip: a bubble that appears beside whatever it explains.
 *
 * @remarks
 * `base` is the bubble. Ark's tooltip root renders no element of its own, so there is
 * no root to put it on, and the rule the Dialog set holds here too: `base` is the part
 * the call site is naming when it passes a `class`.
 *
 * The motion is the Dialog's, and deliberately so. Everything that appears over the
 * page fades and scales by the same amounts, and the only thing a popper adds is where
 * it scales from. Zag writes `--transform-origin` on the positioner for exactly that,
 * so `origin-(--transform-origin)` makes one pair of keyframes read correctly from all
 * twelve placements: a tooltip above its trigger grows downward, one below it grows up.
 *
 * The arrow is two elements because the tip has to rotate inside a box that does not.
 * Ark reads `--arrow-size` and `--arrow-background` off them, so those two variables
 * are the whole of the arrow's styling and the tip needs no classes of its own.
 */
export const tooltip = tv({
  slots: {
    positioner: "z-50",
    base: "max-w-xs origin-(--transform-origin) rounded-md bg-inverted text-inverted shadow-md select-none",
    arrow: "[--arrow-background:var(--ui-bg-inverted)] [--arrow-size:0.5rem]",
    arrowTip: "",
  },
  variants: {
    size: {
      sm: { base: "px-1.5 py-0.5 text-xs" },
      md: { base: "px-2 py-1 text-xs" },
      lg: { base: "px-2.5 py-1.5 text-sm" },
    },
    /** Off is for a caller who would rather animate the bubble themselves. */
    transition: {
      true: {
        base: "data-[state=closed]:animate-panel-out data-[state=open]:animate-panel-in",
      },
      false: {},
    },
  },
  defaultVariants: {
    size: "md",
    transition: true,
  },
});

export type TooltipVariants = VariantProps<typeof tooltip>;
export type TooltipSlots = keyof ReturnType<typeof tooltip>;

export type TooltipUI = TVSlot<TooltipSlots>;

export type TooltipTheme = ThemeOverride<TooltipSlots, TooltipVariants>;

/**
 * Everything a Tooltip accepts in both frameworks. Each adapter adds its own framework
 * props on top.
 *
 * @remarks
 * This is the one component contract with no icon type parameter, because a bubble of
 * text has nowhere to put an icon. Everything else here takes one.
 *
 * The open state is not here: React spells it `open` with `onOpenChange`, Vue spells it
 * `v-model:open`, so each adapter takes it from Ark's root instead.
 *
 * What the tooltip is attached to is the component's own children, handed to Ark with
 * `asChild` so the trigger is the caller's element rather than a button wrapping it.
 * That element has to be focusable, or the tooltip is reachable by pointer only.
 */
export interface TooltipProps {
  /** Per-slot class overrides. */
  ui?: TooltipUI;
  size?: TooltipVariants["size"];
  transition?: TooltipVariants["transition"];
  /** What the bubble says. */
  text?: string;
  /** Point a small triangle back at the trigger. @defaultValue `false` */
  arrow?: boolean;
  /** Which side of the trigger the bubble prefers. @defaultValue `"top"` */
  placement?: Placement;
  /** Gap in pixels between the trigger and the bubble. @defaultValue `8` */
  offset?: number;
  /** How long a pointer rests before the bubble appears. @defaultValue `400` */
  openDelay?: number;
  /** How long the bubble waits after the pointer leaves. @defaultValue `150` */
  closeDelay?: number;
  /** Keep the bubble open while the pointer is over it. @defaultValue `false` */
  interactive?: boolean;
  /** Stop the tooltip appearing at all, without removing it from the tree. */
  disabled?: boolean;
  /** Render the bubble at the end of `body`. @defaultValue `true` */
  portal?: boolean;
  /** Wait until first open to mount the bubble. @defaultValue `false` */
  lazyMount?: boolean;
  /** Unmount the bubble again on close. @defaultValue `false` */
  unmountOnExit?: boolean;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type TooltipVariantsAreExposed = MustBeNever<
  Exclude<keyof TooltipVariants, keyof TooltipProps>
>;

declare global {
  interface Neo75ComponentThemes {
    tooltip: ComponentContract<TooltipSlots, TooltipVariants>;
  }
}
