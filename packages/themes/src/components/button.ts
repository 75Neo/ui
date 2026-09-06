import { componentColors, eachColor, type ComponentColor } from "../colors";

/**
 * Button styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 *
 * @remarks
 * The colour table is the six `eachColor` calls plus one hand-written `neutral`
 * row per variant, byte-for-byte what the `tv()` recipe held — `cva` accepts the
 * same `compoundVariants` shape, so the forty-two cells survive unchanged. What
 * does not survive is slots: the old per-slot `class:` objects are split by hand
 * into one compound list per part below.
 *
 * `loading`, `leading` and `trailing` stay variant inputs rather than adapter
 * logic, which is what puts the spinner on whichever icon slot is actually
 * rendered — including a caller's own `loadingIcon`.
 */

export type ButtonVariant = "solid" | "outline" | "soft" | "subtle" | "ghost" | "link";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonColor = ComponentColor;

export const buttonDefaults = {
  variant: "solid",
  color: "primary",
  size: "md",
  block: false,
  square: false,
  leading: false,
  trailing: false,
  loading: false,
} as const;

/**
 * The introspection the previews and the docs read instead of a recipe object.
 * Shaped to match `cva` v1's `getSchema`, so adopting that later is a deletion.
 */
export const buttonSchema = {
  variant: {
    values: ["solid", "outline", "soft", "subtle", "ghost", "link"],
    defaultValue: "solid",
  },
  color: { values: componentColors, defaultValue: "primary" },
  size: { values: ["xs", "sm", "md", "lg", "xl"], defaultValue: "md" },
  block: { values: [true], defaultValue: false },
  square: { values: [true], defaultValue: false },
  leading: { values: [true], defaultValue: false },
  trailing: { values: [true], defaultValue: false },
  loading: { values: [true], defaultValue: false },
} as const;

/** Structural classes: no variant key touches these, so they are not shared. */
// (They live inline in each adapter's `cva` call, beside the part that wears them.)

export const buttonSizeData = {
  base: {
    xs: "gap-1 px-2 py-1 text-xs",
    sm: "gap-1.5 px-2.5 py-1.5 text-xs",
    md: "gap-1.5 px-2.5 py-1.5 text-sm",
    lg: "gap-2 px-3 py-2 text-sm",
    xl: "gap-2 px-3 py-2 text-base",
  },
  leadingIcon: {
    xs: "size-4",
    sm: "size-4",
    md: "size-5",
    lg: "size-5",
    xl: "size-6",
  },
  trailingIcon: {
    xs: "size-4",
    sm: "size-4",
    md: "size-5",
    lg: "size-5",
    xl: "size-6",
  },
} as const satisfies Record<string, Record<ButtonSize, string>>;

/** One row of the base colour table, as `cva` compound variants read it. */
export interface ButtonBaseCompound {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  block?: boolean;
  square?: boolean;
  leading?: boolean;
  trailing?: boolean;
  loading?: boolean;
  class: string;
}

/** Colour × variant cells plus the square rows: the whole forty-two, as strings. */
export const buttonBaseCompoundData: ButtonBaseCompound[] = [
  ...eachColor((color) => ({
    color,
    variant: "solid" as const,
    class: `bg-${color} text-inverted outline-${color}/25 hover:bg-${color}/75 active:bg-${color}/75 disabled:bg-${color} aria-disabled:bg-${color}`,
  })),
  ...eachColor((color) => ({
    color,
    variant: "outline" as const,
    class: `text-${color} ring ring-${color}/50 outline-${color}/25 ring-inset hover:bg-${color}/10 focus-visible:ring-${color} active:bg-${color}/10`,
  })),
  ...eachColor((color) => ({
    color,
    variant: "soft" as const,
    class: `bg-${color}/10 text-${color} outline-${color}/25 hover:bg-${color}/15 active:bg-${color}/15 disabled:bg-${color}/10 aria-disabled:bg-${color}/10`,
  })),
  ...eachColor((color) => ({
    color,
    variant: "subtle" as const,
    class: `bg-${color}/10 text-${color} ring ring-${color}/25 outline-${color}/25 ring-inset hover:bg-${color}/15 focus-visible:ring-${color} active:bg-${color}/15 disabled:bg-${color}/10 aria-disabled:bg-${color}/10`,
  })),
  ...eachColor((color) => ({
    color,
    variant: "ghost" as const,
    class: `text-${color} outline-${color}/25 hover:bg-${color}/10 active:bg-${color}/10`,
  })),
  ...eachColor((color) => ({
    color,
    variant: "link" as const,
    class: `text-${color} underline-offset-4 outline-${color}/25 hover:text-${color}/75 hover:underline active:text-${color}/75`,
  })),
  {
    color: "neutral",
    variant: "solid",
    class:
      "bg-inverted text-inverted outline-inverted/25 hover:bg-inverted/90 active:bg-inverted/90 disabled:bg-inverted aria-disabled:bg-inverted",
  },
  {
    color: "neutral",
    variant: "outline",
    class:
      "bg-default text-default ring ring-accented outline-inverted/25 ring-inset hover:bg-elevated focus-visible:ring-inverted active:bg-elevated",
  },
  {
    color: "neutral",
    variant: "soft",
    class:
      "bg-elevated text-default outline-inverted/25 hover:bg-accented/75 active:bg-accented/75",
  },
  {
    color: "neutral",
    variant: "subtle",
    class:
      "bg-elevated text-default ring ring-accented outline-inverted/25 ring-inset hover:bg-accented/75 focus-visible:ring-inverted active:bg-accented/75",
  },
  {
    color: "neutral",
    variant: "ghost",
    class: "text-default outline-inverted/25 hover:bg-elevated active:bg-elevated",
  },
  {
    color: "neutral",
    variant: "link",
    class:
      "text-muted underline-offset-4 outline-inverted/25 hover:text-default hover:underline active:text-default",
  },
  { size: "xs", square: true, class: "p-1" },
  { size: "sm", square: true, class: "p-1.5" },
  { size: "md", square: true, class: "p-1.5" },
  { size: "lg", square: true, class: "p-2" },
  { size: "xl", square: true, class: "p-2" },
];

/** Spinner rows, one per icon part. The glyph is whichever icon is showing. */
export interface ButtonIconCompound {
  loading?: boolean;
  leading?: boolean;
  trailing?: boolean;
  class: string;
}

export const buttonLeadingIconCompoundData: ButtonIconCompound[] = [
  { loading: true, leading: true, class: "animate-spin" },
];

export const buttonTrailingIconCompoundData: ButtonIconCompound[] = [
  { loading: true, leading: false, trailing: true, class: "animate-spin" },
];

/**
 * Everything a Button accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The variant props are written out by hand because `defineProps` in Vue cannot
 * read them off a `cva` call. They are the source of truth now, not a guard —
 * there is no recipe left to drift from.
 */
export interface ButtonProps<F> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  /** Fill the container's width. */
  block?: boolean;
  /**
   * Equal padding on all sides. Defaults to whether the button has a label, so an
   * icon-only button is square without being told.
   */
  square?: boolean;
  disabled?: boolean;
  /** Spins whichever icon slot is showing, and disables the button. */
  loading?: boolean;
  /** Replaces the default spinner. */
  loadingIcon?: F;
  /** Reserve the leading slot even when it holds nothing, to keep labels aligned. */
  leading?: boolean;
  /** Reserve the trailing slot even when it holds nothing, to keep labels aligned. */
  trailing?: boolean;
  leadingIcon?: F;
  trailingIcon?: F;
}

/**
 * Decide which of Button's icon slots render, and where the spinner goes.
 *
 * @param props - `hasLeading` and `hasTrailing` are the adapter's answer to "is there
 * content for this slot": a non-null icon prop in React, an icon prop or a filled slot
 * in Vue.
 * @returns The `leading` and `trailing` variant values, which are also whether to
 * render each slot.
 *
 * @remarks
 * An empty slot still costs width, since the size classes size it and `base` puts a
 * gap between children. So a slot renders only when something fills it or the caller
 * reserved it on purpose.
 *
 * Loading is the one asymmetry. A button already showing a trailing icon and nothing
 * leading spins that trailing icon in place, rather than growing a second icon box on
 * the other side; anything else spins the leading one.
 */
export function resolveButtonIcons(props: {
  loading?: boolean;
  leading?: boolean;
  trailing?: boolean;
  hasLeading?: boolean;
  hasTrailing?: boolean;
}): { leading: boolean; trailing: boolean } {
  const trailing = Boolean(props.trailing || props.hasTrailing);
  const leading = Boolean(props.leading || props.hasLeading || (props.loading && !trailing));

  return { leading, trailing };
}
