import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import type { Placement } from "../placement";

/**
 * Recipe for the HoverCard: a panel that appears when a pointer rests on its trigger.
 *
 * @remarks
 * It is the Popover's panel on the Tooltip's patience. The slots are the Popover's
 * less the close button — a card that opens on hover has no button to close it with —
 * and where the panel sits, how it moves and how its arrow is drawn are the Tooltip's,
 * down to reading `--transform-origin` off the positioner so one pair of keyframes
 * reads correctly from all twelve placements.
 *
 * `base` sets a width rather than a maximum, for the same reason the Popover's does:
 * left to `max-width` the card would shrink to its content and land in a different
 * place for every string it holds.
 *
 * There is no `color` variant. A hover card is a surface, and the library spends a hue
 * on things that carry meaning.
 */
export const hoverCard = tv({
  slots: {
    positioner: "z-50",
    base: "relative flex origin-(--transform-origin) flex-col rounded-xl bg-default shadow-lg ring ring-accented outline-none",
    arrow: "[--arrow-background:var(--ui-bg)] [--arrow-size:0.625rem]",
    arrowTip: "",
    title: "font-semibold text-highlighted",
    description: "text-muted",
    body: "min-w-0 text-toned",
  },
  variants: {
    size: {
      sm: {
        base: "w-56 gap-1 p-3",
        title: "text-sm",
        description: "text-xs/5",
        body: "text-sm/6",
      },
      md: {
        base: "w-72 gap-1 p-4",
        title: "text-sm",
        description: "text-sm/6",
        body: "text-sm/6",
      },
      lg: {
        base: "w-96 gap-1.5 p-5",
        title: "text-base",
        description: "text-sm/6",
        body: "text-base/7",
      },
    },
    /** Off is for a caller who would rather animate the card themselves. */
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

export type HoverCardVariants = VariantProps<typeof hoverCard>;
export type HoverCardSlots = keyof ReturnType<typeof hoverCard>;

export type HoverCardUI = TVSlot<HoverCardSlots>;

export type HoverCardTheme = ThemeOverride<HoverCardSlots, HoverCardVariants>;

/**
 * Everything a HoverCard accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @remarks
 * The open state is not here: React spells it `open` with `onOpenChange`, Vue spells
 * it `v-model:open`, so each adapter takes it from Ark's root instead.
 *
 * The trigger is the component's own children, handed to Ark with `asChild`, and the
 * card's parts are named. That is the rule for every component carrying the caller's
 * own content, and the Dialog is where it was settled.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface HoverCardProps {
  /** Per-slot class overrides. */
  ui?: HoverCardUI;
  size?: HoverCardVariants["size"];
  transition?: HoverCardVariants["transition"];
  /** A heading at the top of the card. */
  title?: string;
  /** A quieter line under the title. */
  description?: string;
  /** Point a small triangle back at the trigger. @defaultValue `false` */
  arrow?: boolean;
  /** Which side of the trigger the card prefers. @defaultValue `"bottom"` */
  placement?: Placement;
  /** Gap in pixels between the trigger and the card. @defaultValue `8` */
  offset?: number;
  /** How long a pointer rests before the card appears. @defaultValue `600` */
  openDelay?: number;
  /** How long the card waits after the pointer leaves. @defaultValue `300` */
  closeDelay?: number;
  /** Stop the card appearing at all, without removing it from the tree. */
  disabled?: boolean;
  /** Render the card at the end of `body`. @defaultValue `true` */
  portal?: boolean;
  /** Wait until first open to mount the card. @defaultValue `false` */
  lazyMount?: boolean;
  /** Unmount the card again on close. @defaultValue `false` */
  unmountOnExit?: boolean;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type HoverCardVariantsAreExposed = MustBeNever<
  Exclude<keyof HoverCardVariants, keyof HoverCardProps>
>;

declare global {
  interface Neo75ComponentThemes {
    hoverCard: ComponentContract<HoverCardSlots, HoverCardVariants>;
  }
}
