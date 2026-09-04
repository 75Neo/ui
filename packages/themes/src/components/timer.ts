import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";

/**
 * Recipe for the Timer: digits for each unit of time, the separators between them, and
 * the buttons that drive the clock.
 *
 * @remarks
 * There is no `color` variant. Digits are text, and the library spends a hue on things
 * that carry meaning; the action triggers wear the neutral outline button instead,
 * repeated rather than composed, because a recipe that reached into the Button's would
 * let either component's `ui` reshape the other.
 *
 * The digits read `tabular-nums` so a ticking seconds column does not shove its label
 * sideways twice a second.
 */
export const timer = tv({
  slots: {
    base: "flex min-w-0 flex-col gap-3",
    area: "flex min-w-0 items-center gap-2",
    itemGroup: "flex min-w-0 flex-col items-center",
    item: "min-w-[2ch] text-center font-semibold text-highlighted tabular-nums",
    label: "text-muted",
    separator: "font-semibold text-muted tabular-nums",
    control: "flex min-w-0 flex-wrap items-center gap-2",
    actionTrigger:
      "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md bg-default font-medium text-default ring ring-accented outline-inverted/25 transition-colors ring-inset hover:bg-elevated focus-visible:ring-inverted focus-visible:outline-3 active:bg-elevated disabled:cursor-not-allowed disabled:opacity-75",
  },
  variants: {
    size: {
      sm: {
        item: "text-lg",
        label: "text-[0.6875rem]",
        separator: "text-lg",
        actionTrigger: "gap-1 px-2 py-1 text-xs",
      },
      md: {
        item: "text-2xl",
        label: "text-xs",
        separator: "text-2xl",
        actionTrigger: "gap-1.5 px-2.5 py-1.5 text-xs",
      },
      lg: {
        item: "text-4xl",
        label: "text-sm",
        separator: "text-4xl",
        actionTrigger: "gap-1.5 px-3 py-2 text-sm",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type TimerVariants = VariantProps<typeof timer>;
export type TimerSlots = keyof ReturnType<typeof timer>;

export type TimerUI = TVSlot<TimerSlots>;

export type TimerTheme = ThemeOverride<TimerSlots, TimerVariants>;

/** One unit of time the timer can show, spelling zag's `TimePart` by hand. */
export type TimerUnit = "days" | "hours" | "minutes" | "seconds" | "milliseconds";

/**
 * Everything a Timer accepts in both frameworks. Each adapter adds its own framework
 * props on top.
 *
 * @remarks
 * There is no icon type parameter, because digits and text buttons have nowhere to put
 * an icon.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface TimerProps {
  /** Per-slot class overrides. */
  ui?: TimerUI;
  size?: TimerVariants["size"];
  /** The units to show, in order. @defaultValue `["minutes", "seconds"]` */
  units?: TimerUnit[];
  /** Show the unit names under the digits. @defaultValue `true` */
  showLabels?: boolean;
  /** Replaces a unit's name. Falls back to the unit itself. */
  labels?: Partial<Record<TimerUnit, string>>;
  /** The text between two units. @defaultValue `":"` */
  separator?: string;
  /** Show the start, pause, resume and reset buttons. @defaultValue `true` */
  controls?: boolean;
  /** Start ticking on mount. */
  autoStart?: boolean;
  /** Tick down towards zero instead of up towards the target. */
  countdown?: boolean;
  /** How often the timer updates, in milliseconds. @defaultValue `1000` */
  interval?: number;
  /** Where the timer starts, in milliseconds. */
  startMs?: number;
  /** Where the timer stops, in milliseconds. */
  targetMs?: number;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type TimerVariantsAreExposed = MustBeNever<Exclude<keyof TimerVariants, keyof TimerProps>>;

declare global {
  interface Neo75ComponentThemes {
    timer: ComponentContract<TimerSlots, TimerVariants>;
  }
}
