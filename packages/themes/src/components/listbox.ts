import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { eachColor } from "../colors";

/**
 * Recipe for the Listbox: a list that stays on the page, holding a selection.
 *
 * @remarks
 * The Select's list without the button that opens it. The two share a size scale, a
 * color half and the item's three parts — `item`, `itemText` and `itemIndicator` —
 * because a reader who has learned one should not have to learn the other. What
 * differs is the frame: there is no trigger and no portal, so `content` is an inline
 * box the width of its parent rather than a popup the width of its anchor.
 *
 * The list has no group parts, for the same reason the Combobox and the Select have
 * none: grouping needs a second level of items with its own label and its own key,
 * and a flat list keeps the item prop a single array a caller can build from
 * anything.
 *
 * The empty message is Ark's own `Empty` part, which renders only while the
 * collection has nothing in it, so the message and the rows never appear together.
 *
 * An item is a `div` carrying `data-selected` while it is chosen, `data-highlighted`
 * under the pointer or the arrow keys, and `data-disabled` while it cannot be
 * chosen. The tick beside a chosen row is Ark's `ItemIndicator`, which stays empty
 * until its row is selected.
 */
export const listbox = tv({
  slots: {
    base: "flex w-full min-w-0 flex-col gap-1.5",
    label: "font-medium text-highlighted select-none",
    content:
      "flex max-h-60 w-full min-w-0 flex-col overflow-y-auto overscroll-contain rounded-md bg-default shadow-lg ring ring-accented outline-none data-disabled:opacity-75",
    empty: "text-center text-muted",
    item: "flex cursor-pointer items-center rounded-md text-toned outline-none select-none data-disabled:cursor-not-allowed data-disabled:opacity-75",
    leadingIcon: "shrink-0 text-dimmed [&>svg]:size-full",
    itemText: "min-w-0 flex-1 truncate",
    itemIndicator: "ms-auto shrink-0 [&>svg]:size-full",
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
        content: "p-1",
        empty: "px-2 py-4 text-xs",
        item: "gap-1.5 px-2 py-1 text-xs",
        leadingIcon: "size-3.5",
        itemIndicator: "size-3.5",
      },
      md: {
        label: "text-sm",
        content: "p-1",
        empty: "px-2.5 py-5 text-sm",
        item: "gap-2 px-2.5 py-1.5 text-sm",
        leadingIcon: "size-4",
        itemIndicator: "size-4",
      },
      lg: {
        label: "text-sm",
        content: "p-1.5",
        empty: "px-3 py-6 text-sm",
        item: "gap-2 px-3 py-2 text-sm",
        leadingIcon: "size-5",
        itemIndicator: "size-5",
      },
    },
  },
  compoundVariants: [
    ...eachColor((color) => ({
      color,
      class: {
        item: `data-highlighted:bg-${color}/10 data-highlighted:text-${color} data-selected:text-${color}`,
      },
    })),
    {
      color: "neutral",
      class: {
        item: "data-highlighted:bg-elevated data-highlighted:text-highlighted data-selected:text-highlighted",
      },
    },
  ],
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

export type ListboxVariants = VariantProps<typeof listbox>;
export type ListboxSlots = keyof ReturnType<typeof listbox>;

export type ListboxUI = TVSlot<ListboxSlots>;

export type ListboxTheme = ThemeOverride<ListboxSlots, ListboxVariants>;

/**
 * One option in the list.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The same shape the Combobox and the Select read, and deliberately not the same
 * type: the three components are independent contracts, and a Listbox whose item
 * type moved because a Combobox needed a filter field would be the wrong kind of
 * coupling.
 */
export interface ListboxItem<F> {
  /** Used to identify the option. */
  value: string;
  /** Shown in the list. */
  label: string;
  disabled?: boolean;
  /** Icon shown before this option's label. */
  icon?: F;
}

/** How many options the list collects. Written out rather than imported from Ark. */
export type ListboxSelectionMode = "single" | "multiple" | "extended";

/**
 * Everything a Listbox accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * The selection is not here: React spells it `value` with `onValueChange`, Vue spells
 * it `v-model`, so each adapter takes it from Ark's root instead. It is a `string[]`
 * in both, one entry long unless the selection mode collects more, because Ark's
 * collection is keyed by value and a single-selection API would be a second shape to
 * convert on every change.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface ListboxProps<F> {
  /** Per-slot class overrides. */
  ui?: ListboxUI;
  color?: ListboxVariants["color"];
  size?: ListboxVariants["size"];
  /** The options to offer. */
  items: ListboxItem<F>[];
  /** Caption above the list. */
  label?: string;
  /** Shown in place of the rows when there are none. @defaultValue `"No options."` */
  emptyMessage?: string;
  /** How many options the list collects. @defaultValue `"single"` */
  selectionMode?: ListboxSelectionMode;
  /** Let a second click on the chosen option unchoose it. Single selection only. */
  deselectable?: boolean;
  /** Wrap the arrow keys from the last option round to the first. */
  loopFocus?: boolean;
  disabled?: boolean;
  /** Replaces the tick beside a chosen option. */
  selectedIcon?: F;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type ListboxVariantsAreExposed = MustBeNever<
  Exclude<keyof ListboxVariants, keyof ListboxProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    listbox: ComponentContract<ListboxSlots, ListboxVariants>;
  }
}
