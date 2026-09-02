import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { eachColor } from "../colors";

/**
 * Recipe for the DatePicker: a field with a calendar behind it.
 *
 * @remarks
 * The calendar is one grid rendered three times over. Ark's day, month and year views
 * share a table, a header row and a cell trigger, and swap only what fills them, so the
 * recipe styles the parts once and each view carries `data-view` for a theme that wants
 * to tell them apart. A view that is not showing is hidden with the `hidden` attribute
 * rather than unmounted, which a `display` class would otherwise beat — hence the
 * `[&[hidden]]:hidden` on the view slot.
 *
 * The calendar is portalled to the document body, the same choice the Combobox makes and
 * for the same reason: a field goes into cards, dialogs and toolbars, and any one of
 * them may clip its overflow. Both adapters delay the move until mount, so the server
 * pass and the first client render are identical.
 *
 * A day cell carries a small vocabulary of states and they overlap: today is also
 * selectable, a range endpoint is also selected, an out-of-range day is still rendered.
 * The recipe leans on that rather than fighting it — `data-today` sets weight and
 * color, `data-in-range` a tinted fill, `data-selected` a solid one — and every cell
 * keeps the same rounding, so an endpoint and a middle day differ in fill and not in
 * shape. Ranges drawn with square middles need the cell padding to vanish too, which is
 * a table-layout problem rather than a color one.
 *
 * Ark spells disabled two ways here. The navigation triggers and the clear button are
 * real buttons and carry the attribute, so they style with `disabled:`. A cell trigger
 * is a `div` and carries `data-disabled`, alongside `data-unavailable` for a date the
 * caller ruled out rather than one outside the bounds.
 */
export const datePicker = tv({
  slots: {
    base: "flex w-full min-w-0 flex-col gap-1.5",
    label: "font-medium text-highlighted select-none",
    control:
      "flex w-full min-w-0 items-center bg-default ring ring-accented ring-inset data-disabled:cursor-not-allowed data-disabled:opacity-75 data-invalid:ring-error",
    input:
      "min-w-0 flex-1 bg-transparent text-highlighted outline-none placeholder:text-dimmed disabled:cursor-not-allowed",
    separator: "shrink-0 text-dimmed",
    trigger:
      "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm text-dimmed transition-colors outline-none hover:text-default disabled:cursor-not-allowed [&>svg]:size-full",
    clearTrigger:
      "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm text-dimmed transition-colors outline-none hover:text-default disabled:cursor-not-allowed [&>svg]:size-full",
    positioner: "z-50",
    content: "rounded-md bg-default shadow-lg ring ring-accented outline-none",
    view: "flex flex-col [&[hidden]]:hidden",
    viewControl: "flex items-center justify-between",
    prevTrigger:
      "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors outline-none hover:bg-elevated hover:text-default disabled:cursor-not-allowed disabled:opacity-50 [&>svg]:size-full",
    viewTrigger:
      "inline-flex flex-1 cursor-pointer items-center justify-center rounded-md font-medium text-highlighted transition-colors outline-none hover:bg-elevated",
    nextTrigger:
      "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed transition-colors outline-none hover:bg-elevated hover:text-default disabled:cursor-not-allowed disabled:opacity-50 [&>svg]:size-full",
    table: "w-full border-separate border-spacing-0.5",
    tableHead: "",
    tableRow: "",
    tableHeader: "font-medium text-dimmed",
    tableBody: "",
    tableCell: "p-0",
    tableCellTrigger:
      "flex w-full cursor-pointer items-center justify-center rounded-md text-toned tabular-nums transition-colors outline-none select-none focus-visible:outline-3 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-outside-range:text-dimmed data-unavailable:cursor-not-allowed data-unavailable:line-through data-unavailable:opacity-50",
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
        control: "h-7 gap-1 rounded-md ps-2.5 pe-1.5",
        input: "text-xs",
        separator: "px-0.5 text-xs",
        trigger: "size-4",
        clearTrigger: "size-3.5",
        content: "w-64 p-2.5",
        view: "gap-2",
        viewControl: "gap-1",
        prevTrigger: "size-6 p-1.5",
        viewTrigger: "h-6 px-2 text-xs",
        nextTrigger: "size-6 p-1.5",
        tableHeader: "pb-1 text-[0.6875rem]",
        tableCellTrigger: "h-7 text-xs",
      },
      md: {
        label: "text-sm",
        control: "h-9 gap-1.5 rounded-md ps-3 pe-2",
        input: "text-sm",
        separator: "px-1 text-sm",
        trigger: "size-4",
        clearTrigger: "size-4",
        content: "w-72 p-3",
        view: "gap-2.5",
        viewControl: "gap-1",
        prevTrigger: "size-7 p-1.5",
        viewTrigger: "h-7 px-2.5 text-sm",
        nextTrigger: "size-7 p-1.5",
        tableHeader: "pb-1 text-xs",
        tableCellTrigger: "h-8 text-sm",
      },
      lg: {
        label: "text-sm",
        control: "h-10 gap-2 rounded-md ps-3.5 pe-2.5",
        input: "text-sm",
        separator: "px-1 text-sm",
        trigger: "size-5",
        clearTrigger: "size-4",
        content: "w-80 p-3.5",
        view: "gap-3",
        viewControl: "gap-1.5",
        prevTrigger: "size-8 p-2",
        viewTrigger: "h-8 px-3 text-sm",
        nextTrigger: "size-8 p-2",
        tableHeader: "pb-1.5 text-xs",
        tableCellTrigger: "h-9 text-sm",
      },
    },
  },
  compoundVariants: [
    ...eachColor((color) => ({
      color,
      class: {
        control: `focus-within:ring-2 focus-within:ring-${color}`,
        tableCellTrigger: `outline-${color}/25 hover:bg-${color}/10 data-today:font-semibold data-today:text-${color} data-in-range:bg-${color}/10 data-in-range:text-${color} data-selected:bg-${color} data-selected:font-medium data-selected:text-inverted`,
      },
    })),
    {
      color: "neutral",
      class: {
        control: "focus-within:ring-2 focus-within:ring-inverted",
        tableCellTrigger:
          "outline-inverted/25 hover:bg-elevated data-in-range:bg-elevated data-in-range:text-highlighted data-selected:bg-inverted data-selected:font-medium data-selected:text-inverted data-today:font-semibold data-today:text-highlighted",
      },
    },
  ],
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

export type DatePickerVariants = VariantProps<typeof datePicker>;
export type DatePickerSlots = keyof ReturnType<typeof datePicker>;

export type DatePickerUI = TVSlot<DatePickerSlots>;

export type DatePickerTheme = ThemeOverride<DatePickerSlots, DatePickerVariants>;

/**
 * How many dates the calendar collects.
 *
 * @remarks
 * Written out rather than imported from Ark, because `@75neo/themes` depends on no
 * framework and so on neither adapter's copy of it. The union is Zag's `SelectionMode`,
 * and a mismatch would fail the adapters' typecheck rather than go unnoticed.
 */
export type DatePickerSelectionMode = "single" | "multiple" | "range";

/**
 * Everything a DatePicker accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The date itself is not here: React spells it `value` with `onValueChange`, Vue spells
 * it `v-model`, so each adapter takes it from Ark's root instead. It is an array of
 * `DateValue` in both, whatever the selection mode, because a range is two dates and a
 * multiple selection is many and one shape beats converting between three. Each adapter
 * re-exports `parseDate` for building one.
 *
 * `min` and `max` are adapter props for the same reason: they are `DateValue` too, and
 * that type comes from each framework's own copy of Ark.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface DatePickerProps<F> {
  /** Per-slot class overrides. */
  ui?: DatePickerUI;
  color?: DatePickerVariants["color"];
  size?: DatePickerVariants["size"];
  /** Caption above the field. */
  label?: string;
  /** Placeholder for the empty field. */
  placeholder?: string;
  /** How many dates the calendar collects. @defaultValue `"single"` */
  selectionMode?: DatePickerSelectionMode;
  /** BCP 47 language tag deciding the month names and the first day of the week. @defaultValue `"en-US"` */
  locale?: string;
  /** @defaultValue `"UTC"` */
  timeZone?: string;
  /** Months shown side by side. @defaultValue `1` */
  numOfMonths?: number;
  /** First day of the week, `0` for Sunday, overriding the locale. */
  startOfWeek?: number;
  /** Always draw six weeks, so the calendar does not change height month to month. */
  fixedWeeks?: boolean;
  /** Shown between the two fields of a range. @defaultValue `"–"` */
  rangeSeparator?: string;
  /** Close the calendar once the selection is complete. @defaultValue `true` */
  closeOnSelect?: boolean;
  /** Open the calendar when the field is clicked, rather than only from the button. */
  openOnClick?: boolean;
  /** Show the button that empties the field. @defaultValue `true` */
  clearable?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Submits the date under this name inside a form. */
  name?: string;
  /** Replaces the calendar glyph on the button that opens the popup. */
  trailingIcon?: F;
  /** Replaces the cross that empties the field. */
  clearIcon?: F;
  /** Replaces the arrow to the previous month. */
  prevIcon?: F;
  /** Replaces the arrow to the next month. */
  nextIcon?: F;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type DatePickerVariantsAreExposed = MustBeNever<
  Exclude<keyof DatePickerVariants, keyof DatePickerProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    datePicker: ComponentContract<DatePickerSlots, DatePickerVariants>;
  }
}
