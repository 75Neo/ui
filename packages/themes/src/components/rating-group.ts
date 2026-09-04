import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { eachColor } from "../colors";

/**
 * Recipe for the RatingGroup: a row of stars, and how much of each one is filled.
 *
 * @remarks
 * Every star is two icons stacked, not one icon in two colours. The lower one is the
 * empty outline and is always there; the upper one is the filled star, inside a box
 * that is clipped to nothing, to half, or to the whole width. That is what makes a half
 * star a real half — the same shape cut down the middle — rather than a different icon
 * that happens to look like one.
 *
 * The clip is `inset-s-0`, so under a right-to-left locale a half star fills from the
 * right, which is the direction the row is read in.
 *
 * The state on the clip is written by the adapters from what Ark reports, rather than
 * read off an attribute Ark sets. Ark says whether an item is highlighted and whether
 * it is the half one; how much of a star that means is this library's decision, and
 * putting it in a `data-state` keeps it in the recipe where a caller can change it.
 */
export const ratingGroup = tv({
  slots: {
    base: "flex flex-col gap-1.5",
    label: "font-medium text-highlighted select-none",
    control: "flex items-center data-disabled:cursor-not-allowed data-disabled:opacity-75",
    item: "relative inline-flex shrink-0 cursor-pointer text-muted transition-colors data-disabled:cursor-not-allowed",
    icon: "block shrink-0 [&>svg]:size-full",
    fill: "pointer-events-none absolute inset-s-0 top-0 h-full w-0 overflow-hidden data-[state=full]:w-full data-[state=half]:w-1/2",
  },
  variants: {
    color: {
      primary: "",
      secondary: "",
      success: "",
      info: "",
      warning: "",
      error: "",
      neutral: "",
    },
    size: {
      sm: { label: "text-xs", control: "gap-0.5", item: "size-4", icon: "size-4" },
      md: { label: "text-sm", control: "gap-1", item: "size-5", icon: "size-5" },
      lg: { label: "text-sm", control: "gap-1", item: "size-6", icon: "size-6" },
    },
  },
  compoundVariants: [
    ...eachColor((color) => ({
      color,
      class: { fill: `text-${color}` },
    })),
    {
      color: "neutral",
      class: { fill: "text-highlighted" },
    },
  ],
  defaultVariants: {
    color: "warning",
    size: "md",
  },
});

export type RatingGroupVariants = VariantProps<typeof ratingGroup>;
export type RatingGroupSlots = keyof ReturnType<typeof ratingGroup>;

export type RatingGroupUI = TVSlot<RatingGroupSlots>;

export type RatingGroupTheme = ThemeOverride<RatingGroupSlots, RatingGroupVariants>;

/** How much of one star is filled. */
export type RatingFill = "empty" | "half" | "full";

/**
 * How much of a star to fill, given what Ark says about it.
 *
 * @param highlighted - Whether Ark counts this star as reached by the value.
 * @param half - Whether Ark counts this star as the half one.
 * @returns The state the clip is set to.
 *
 * @remarks
 * Lives here rather than in either adapter because both need exactly this rule, and a
 * row whose React and Vue halves disagreed about when a star is half full would be two
 * components. Half wins over highlighted, because Ark reports both on the same star and
 * a half star that filled completely would be the bug this function exists to prevent.
 */
export function ratingFill(highlighted: boolean, half: boolean): RatingFill {
  if (half) return "half";
  return highlighted ? "full" : "empty";
}

/**
 * Everything a RatingGroup accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The value is not here: React spells it `value` with `onValueChange`, Vue spells it
 * `v-model`, so each adapter takes it from Ark's root instead. It is a `number`, which
 * is one of the few values in this library that is not a string or an array of them —
 * a rating is a quantity and nothing else.
 *
 * The default colour is `warning`, not `primary`. A star is amber everywhere it appears
 * and a reader knows what an amber star means before reading a word, which is worth
 * more than the accent being consistent with the rest of a page.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface RatingGroupProps<F> {
  /** Per-slot class overrides. */
  ui?: RatingGroupUI;
  color?: RatingGroupVariants["color"];
  size?: RatingGroupVariants["size"];
  /** How many stars there are. @defaultValue `5` */
  count?: number;
  /** Caption above the row. */
  label?: string;
  /** Let a star be half filled. */
  allowHalf?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  /** Submits the rating under this name inside a form. */
  name?: string;
  /** Replaces the star. */
  icon?: F;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type RatingGroupVariantsAreExposed = MustBeNever<
  Exclude<keyof RatingGroupVariants, keyof RatingGroupProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    ratingGroup: ComponentContract<RatingGroupSlots, RatingGroupVariants>;
  }
}
