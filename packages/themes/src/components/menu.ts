import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { eachColor } from "../colors";
import type { Placement } from "../placement";

/**
 * Recipe for the Menu: the panel a trigger drops, and the rows in it.
 *
 * @remarks
 * `base` is the panel, not a root element, for the reason the Dialog's note gives:
 * Ark's `Menu.Root` renders nothing at all. A submenu's panel is the same slot, because
 * a submenu is another Menu — one recipe styles every level, and a caller theming
 * `menu.base` reaches all of them at once.
 *
 * Every row is one of four things and they are four Ark parts, but they share the
 * `item` slot. A reader does not see four kinds of row; they see rows, one of which has
 * a tick and one of which opens another panel. Giving them separate slots would make a
 * caller restate the same padding four times to change it once.
 *
 * A shortcut and a submenu's chevron both sit at the trailing edge with `ms-auto`, and
 * a row has at most one of them, so they never fight. The tick on a checkbox row sits
 * there too, which is where the Select puts its own.
 *
 * The panel is capped by `--available-height`, which Ark measures against the viewport,
 * so a long menu near the bottom of a window scrolls instead of running off it.
 */
export const menu = tv({
  slots: {
    positioner: "z-50",
    base: "relative flex max-h-(--available-height) min-w-40 origin-(--transform-origin) flex-col overflow-y-auto overscroll-contain rounded-md bg-default shadow-lg ring ring-accented outline-none",
    arrow: "[--arrow-background:var(--ui-bg)] [--arrow-size:0.625rem]",
    arrowTip: "",
    group: "flex flex-col",
    groupLabel: "font-medium text-dimmed select-none",
    item: "flex cursor-pointer items-center rounded-md text-toned no-underline outline-none select-none data-disabled:cursor-not-allowed data-disabled:opacity-75",
    leadingIcon: "shrink-0 text-dimmed [&>svg]:size-full",
    itemText: "min-w-0 flex-1 truncate",
    shortcut: "ms-auto shrink-0 font-mono text-dimmed tabular-nums",
    itemIndicator: "ms-auto shrink-0 [&>svg]:size-full",
    trailingIcon: "ms-auto shrink-0 text-dimmed [&>svg]:size-full",
    separator: "-mx-1 my-1 h-px border-0 bg-border",
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
        base: "p-1",
        groupLabel: "px-2 pt-1.5 pb-1 text-[0.6875rem]",
        item: "gap-1.5 px-2 py-1 text-xs",
        leadingIcon: "size-3.5",
        shortcut: "ps-3 text-[0.6875rem]",
        itemIndicator: "size-3.5",
        trailingIcon: "size-3.5",
      },
      md: {
        base: "p-1",
        groupLabel: "px-2.5 pt-2 pb-1 text-xs",
        item: "gap-2 px-2.5 py-1.5 text-sm",
        leadingIcon: "size-4",
        shortcut: "ps-4 text-xs",
        itemIndicator: "size-4",
        trailingIcon: "size-4",
      },
      lg: {
        base: "p-1.5",
        groupLabel: "px-3 pt-2 pb-1.5 text-xs",
        item: "gap-2 px-3 py-2 text-sm",
        leadingIcon: "size-5",
        shortcut: "ps-4 text-xs",
        itemIndicator: "size-5",
        trailingIcon: "size-5",
      },
    },
    /** Off is for a caller who would rather animate the panel themselves. */
    transition: {
      true: {
        base: "data-[state=closed]:animate-panel-out data-[state=open]:animate-panel-in",
      },
      false: {},
    },
  },
  compoundVariants: [
    ...eachColor((color) => ({
      color,
      class: {
        item: `data-highlighted:bg-${color}/10 data-highlighted:text-${color} data-[state=checked]:text-${color}`,
      },
    })),
    {
      color: "neutral",
      class: {
        item: "data-highlighted:bg-elevated data-highlighted:text-highlighted data-[state=checked]:text-highlighted",
      },
    },
  ],
  defaultVariants: {
    color: "primary",
    size: "md",
    transition: true,
  },
});

export type MenuVariants = VariantProps<typeof menu>;
export type MenuSlots = keyof ReturnType<typeof menu>;

export type MenuUI = TVSlot<MenuSlots>;

export type MenuTheme = ThemeOverride<MenuSlots, MenuVariants>;

/** What a row is. */
export type MenuItemType = "item" | "checkbox" | "label" | "separator";

/**
 * One row in a menu.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * One flat array holds every kind of row, rather than an array of groups holding arrays
 * of rows. A group is a `label` row and the rows after it, which is how a menu reads
 * down the page and means a caller building rows from data never has to decide where
 * one array ends and the next begins. `groupMenuItems` turns the flat list back into
 * the nesting Ark's markup wants.
 *
 * A row with `children` opens a submenu, to any depth. A row with `href` is a link, and
 * the whole row is the anchor rather than the text inside it.
 */
export interface MenuItem<F> {
  /** What kind of row this is. @defaultValue `"item"` */
  type?: MenuItemType;
  /** What the row says. */
  label?: string;
  /** Identifies the row. @defaultValue the label */
  value?: string;
  /** Icon before the label. */
  icon?: F;
  /** Printed at the trailing edge, for a keyboard shortcut. */
  shortcut?: string;
  /** Whether a `checkbox` row is ticked. */
  checked?: boolean;
  disabled?: boolean;
  /** Makes the whole row a link to here. */
  href?: string;
  /** Where the link opens, as the anchor's `target`. */
  target?: string;
  /** Rows of the submenu this one opens. */
  children?: MenuItem<F>[];
  /** Close the menu when this row is chosen. @defaultValue `true` */
  closeOnSelect?: boolean;
  /** Called when the row is chosen. */
  onSelect?: () => void;
  /** Called when a `checkbox` row is ticked or unticked. */
  onCheckedChange?: (checked: boolean) => void;
}

/** A run of rows under one optional heading. */
export interface MenuSection<F> {
  /** The heading above the rows, absent for the run before the first heading. */
  label?: string;
  /** The rows themselves, headings excluded. */
  items: MenuItem<F>[];
}

/**
 * How a row is identified when the caller has not said.
 *
 * @param item - The row.
 * @param index - Where it sits among its siblings.
 * @returns The row's own `value`, else its label, else its position.
 *
 * @remarks
 * Ark needs a value on every row for typeahead and for the highlighted state, and a
 * caller writing a menu out by hand should not have to invent one. The position is the
 * last resort rather than the first, so that reordering rows does not silently move
 * which one Ark thinks is highlighted.
 */
export function menuItemValue<F>(item: MenuItem<F>, index: number): string {
  return item.value ?? item.label ?? String(index);
}

/**
 * Turn a flat list of rows into the sections Ark's markup wants.
 *
 * @param items - Every row, headings included.
 * @returns One section per heading, plus a leading section for the rows before the
 * first one. Sections with no rows in them are dropped.
 *
 * @remarks
 * Lives here rather than in either adapter because both need exactly this rule, and a
 * menu whose React and Vue halves disagreed about where a group ends would be two
 * components. A heading starts a section and belongs to none, so it never renders as a
 * row of its own.
 */
export function groupMenuItems<F>(items: MenuItem<F>[]): MenuSection<F>[] {
  const sections: MenuSection<F>[] = [{ items: [] }];

  for (const item of items) {
    if (item.type === "label") {
      sections.push({ label: item.label, items: [] });
    } else {
      sections[sections.length - 1]!.items.push(item);
    }
  }

  return sections.filter((section) => section.items.length > 0);
}

/**
 * Everything a Menu accepts in both frameworks. Each adapter adds its own framework
 * props on top.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * The open state is not here: React spells it `open` with `onOpenChange`, Vue spells it
 * `v-model:open`, so each adapter takes it from Ark's root instead.
 *
 * The trigger is the component's own children, handed to Ark with `asChild`, and the
 * rows are named. That is the rule for every component carrying the caller's own
 * content, and the Dialog is where it was settled.
 *
 * There is no radio row. A menu offering one answer out of several is a Select wearing
 * a menu's clothes, and this library would rather send a caller to the Select than keep
 * two ways of asking the same question.
 */
export interface MenuProps<F> {
  /** Per-slot class overrides. */
  ui?: MenuUI;
  color?: MenuVariants["color"];
  size?: MenuVariants["size"];
  transition?: MenuVariants["transition"];
  /** The rows to draw. */
  items: MenuItem<F>[];
  /** Point a small triangle back at the trigger. @defaultValue `false` */
  arrow?: boolean;
  /** Which side of the trigger the panel prefers. @defaultValue `"bottom-start"` */
  placement?: Placement;
  /** Gap in pixels between the trigger and the panel. @defaultValue `8` */
  offset?: number;
  /** Close the menu when any row is chosen. @defaultValue `true` */
  closeOnSelect?: boolean;
  /** Wrap the arrow keys from the last row round to the first. @defaultValue `false` */
  loopFocus?: boolean;
  /** Let printable characters jump to a row. @defaultValue `true` */
  typeahead?: boolean;
  /** Replaces the chevron on a row that opens a submenu. */
  trailingIcon?: F;
  /** Replaces the tick on a checked row. */
  checkedIcon?: F;
  /** Render the panel at the end of `body`. @defaultValue `true` */
  portal?: boolean;
  /** Wait until first open to mount the panel. @defaultValue `false` */
  lazyMount?: boolean;
  /** Unmount the panel again on close. @defaultValue `false` */
  unmountOnExit?: boolean;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type MenuVariantsAreExposed = MustBeNever<
  Exclude<keyof MenuVariants, keyof MenuProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    menu: ComponentContract<MenuSlots, MenuVariants>;
  }
}
