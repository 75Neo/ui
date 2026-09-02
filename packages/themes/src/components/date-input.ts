import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { eachColor } from "../colors";

/**
 * Recipe for the DateInput: a date typed a segment at a time.
 *
 * @remarks
 * This is the keyboard half of a date field with no calendar attached. Ark splits the
 * value into segments — year, month, day, and the time parts when the granularity asks
 * for them — and each one is its own focusable element that takes digits, arrow keys
 * and page keys. So there is no free text to parse and no format to explain: a reader
 * cannot type February the thirtieth.
 *
 * The segments the reader sees are not fixed. `granularity` and `locale` decide how
 * many there are and what order they come in, which is why the recipe styles a
 * `segment` slot rather than a day slot and a month slot. Ark writes `data-type` on
 * each, so a theme that really wants the year wider can still reach it.
 *
 * A literal segment is a separator the format put there, usually a slash or a dot. It
 * is not editable and takes no padding, or the field would read as though the slashes
 * were fields too.
 *
 * `separator` is the other kind, the one between the two halves of a range. It belongs
 * to the component rather than to a format, which is why it is a slot of its own.
 *
 * Focus lives on the control as well as on the segment. The box draws the ring, because
 * the field has to read as one control while the caret is inside one of its parts; the
 * segment tints itself so the reader can see which part the next digit lands in.
 */
export const dateInput = tv({
  slots: {
    base: "flex min-w-0 flex-col gap-1.5",
    label: "font-medium text-highlighted select-none",
    control:
      "flex min-w-0 items-center bg-default ring ring-accented ring-inset data-disabled:cursor-not-allowed data-disabled:opacity-75 data-invalid:ring-error",
    leadingIcon: "shrink-0 text-dimmed [&>svg]:size-full",
    segmentGroup: "flex items-center",
    segment:
      "rounded-sm text-highlighted tabular-nums outline-none data-placeholder-shown:text-dimmed data-[type=literal]:px-0 data-[type=literal]:text-dimmed",
    separator: "shrink-0 text-dimmed",
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
      sm: {
        label: "text-xs",
        control: "h-7 gap-1.5 rounded-md px-2.5 text-xs",
        leadingIcon: "size-3.5",
        segment: "px-0.5",
        separator: "px-1 text-xs",
      },
      md: {
        label: "text-sm",
        control: "h-9 gap-2 rounded-md px-3 text-sm",
        leadingIcon: "size-4",
        segment: "px-0.5",
        separator: "px-1.5 text-sm",
      },
      lg: {
        label: "text-sm",
        control: "h-10 gap-2 rounded-md px-3.5 text-sm",
        leadingIcon: "size-5",
        segment: "px-1",
        separator: "px-2 text-sm",
      },
    },
  },
  compoundVariants: [
    ...eachColor((color) => ({
      color,
      class: {
        control: `focus-within:ring-2 focus-within:ring-${color}`,
        segment: `data-focus:bg-${color}/10 data-focus:text-${color}`,
      },
    })),
    {
      color: "neutral",
      class: {
        control: "focus-within:ring-2 focus-within:ring-inverted",
        segment: "data-focus:bg-elevated data-focus:text-highlighted",
      },
    },
  ],
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

export type DateInputVariants = VariantProps<typeof dateInput>;
export type DateInputSlots = keyof ReturnType<typeof dateInput>;

export type DateInputUI = TVSlot<DateInputSlots>;

export type DateInputTheme = ThemeOverride<DateInputSlots, DateInputVariants>;

/**
 * The smallest unit the field asks for.
 *
 * @remarks
 * Written out rather than imported from Ark, because `@75neo/themes` depends on no
 * framework and so on neither adapter's copy of it. The union is Zag's
 * `DateGranularity`, and a mismatch would fail the adapters' typecheck rather than go
 * unnoticed.
 */
export type DateInputGranularity = "day" | "hour" | "minute" | "second";

/**
 * Settle the whitespace inside a literal segment so a server and a browser agree on it.
 *
 * @param text - The segment text Ark computed from `Intl.DateTimeFormat`.
 * @returns The same text with every exotic space written as a plain one.
 *
 * @remarks
 * ICU changed its mind about the space before AM and PM: recent versions emit a narrow
 * no-break space, U+202F, and older ones a plain U+0020. A page rendered by Node and
 * hydrated by a browser can therefore disagree about a character nobody can see, and
 * both frameworks call that a hydration mismatch — React loudly, Vue in a code path that
 * its own `data-allow-mismatch` escape hatch does not reach. Rewriting the character in
 * both adapters makes the two runs agree instead of asking either to look away.
 *
 * Only literal segments go through this. They are the punctuation the locale puts
 * between the editable parts, they are `aria-hidden`, and nothing reads them back, so
 * flattening a space inside one costs nothing. An editable segment holds digits and is
 * left alone.
 */
export function dateInputLiteralText(text: string): string {
  return text.replace(/[\u00a0\u202f\u2009]/g, " ");
}

/**
 * Everything a DateInput accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The date itself is not here: React spells it `value` with `onValueChange`, Vue spells
 * it `v-model`, so each adapter takes it from Ark's root instead. It is an array of
 * `DateValue` in both, because a range is two dates and one shape for both selection
 * modes beats converting between them. Each adapter re-exports `parseDate` for building
 * one.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface DateInputProps<F> {
  /** Per-slot class overrides. */
  ui?: DateInputUI;
  color?: DateInputVariants["color"];
  size?: DateInputVariants["size"];
  /** Caption above the field. */
  label?: string;
  /** Whether the field takes one date or a start and an end. @defaultValue `"single"` */
  selectionMode?: "single" | "range";
  /** The smallest unit to ask for, which decides whether time segments appear. @defaultValue `"day"` */
  granularity?: DateInputGranularity;
  /** BCP 47 language tag deciding segment order and separators. @defaultValue `"en-US"` */
  locale?: string;
  /** @defaultValue `"UTC"` */
  timeZone?: string;
  /** Pad the month, day and hour to two digits rather than following the locale. */
  shouldForceLeadingZeros?: boolean;
  /** Hide the time-zone segment on a zoned value. */
  hideTimeZone?: boolean;
  /** Shown between the two halves of a range. @defaultValue `"–"` */
  rangeSeparator?: string;
  /** Icon shown before the segments. Nothing is drawn unless one is given. */
  leadingIcon?: F;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Submits the date under this name inside a form. */
  name?: string;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type DateInputVariantsAreExposed = MustBeNever<
  Exclude<keyof DateInputVariants, keyof DateInputProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    dateInput: ComponentContract<DateInputSlots, DateInputVariants>;
  }
}
