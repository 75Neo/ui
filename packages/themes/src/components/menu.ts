import { componentColors, eachColor, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";
import type { Placement } from "../placement";

/**
 * Menu styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 *
 * @remarks
 * Every row is one of four things and they are four Ark parts, but they share the
 * `item` look. A reader does not see four kinds of row; they see rows, one of which
 * has a tick and one of which opens another panel.
 *
 * A shortcut and a submenu's chevron both sit at the trailing edge with `ms-auto`,
 * and a row has at most one of them. The tick on a checkbox row sits there too,
 * which is where the Select puts its own.
 *
 * The panel is capped by `--available-height`, which Ark measures against the
 * viewport, so a long menu near the bottom of a window scrolls instead of running
 * off it. A submenu is another Menu — one set of classes styles every level.
 */

export type MenuColor = ComponentColor;
export type MenuSize = "sm" | "md" | "lg";

export const menuDefaults = { color: "primary", size: "md" } as const;

export const menuSchema = {
  color: { values: componentColors, defaultValue: "primary" },
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const menuParts = [
  { export: "Menu", file: "menu", contract: "MenuRootProps" },
  { export: "MenuTrigger", file: "trigger", contract: null },
  { export: "MenuContextTrigger", file: "context-trigger", contract: null },
  { export: "MenuTriggerItem", file: "trigger-item", contract: "MenuTriggerItemProps" },
  { export: "MenuIndicator", file: "indicator", contract: null },
  { export: "MenuContent", file: "content", contract: "MenuContentProps" },
  { export: "MenuArrow", file: "arrow", contract: null },
  { export: "MenuItem", file: "item", contract: "MenuItemProps" },
  { export: "MenuCheckboxItem", file: "checkbox-item", contract: "MenuCheckboxItemProps" },
  { export: "MenuRadioItemGroup", file: "radio-item-group", contract: null },
  { export: "MenuRadioItem", file: "radio-item", contract: null },
  { export: "MenuItemText", file: "item-text", contract: null },
  { export: "MenuItemIndicator", file: "item-indicator", contract: null },
  { export: "MenuItemGroup", file: "item-group", contract: null },
  { export: "MenuItemGroupLabel", file: "item-group-label", contract: null },
  { export: "MenuSeparator", file: "separator", contract: null },
] as const satisfies readonly ComponentPart[];

export const menuSizeData = {
  base: {
    sm: "p-1",
    md: "p-1",
    lg: "p-1.5",
  },
  groupLabel: {
    sm: "px-2 pt-1.5 pb-1 text-[0.6875rem]",
    md: "px-2.5 pt-2 pb-1 text-xs",
    lg: "px-3 pt-2 pb-1.5 text-xs",
  },
  item: {
    sm: "gap-1.5 px-2 py-1 text-xs",
    md: "gap-2 px-2.5 py-1.5 text-sm",
    lg: "gap-2 px-3 py-2 text-sm",
  },
  leadingIcon: {
    sm: "size-3.5",
    md: "size-4",
    lg: "size-5",
  },
  shortcut: {
    sm: "ps-3 text-[0.6875rem]",
    md: "ps-4 text-xs",
    lg: "ps-4 text-xs",
  },
  itemIndicator: {
    sm: "size-3.5",
    md: "size-4",
    lg: "size-5",
  },
  trailingIcon: {
    sm: "size-3.5",
    md: "size-4",
    lg: "size-5",
  },
} as const satisfies Record<string, Record<MenuSize, string>>;

/** One colour row, as `cva` compound variants read it. Shared by every row kind. */
export interface MenuItemCompound {
  color?: MenuColor;
  class: string;
}

export const menuItemCompoundData: MenuItemCompound[] = [
  ...eachColor((color) => ({
    color,
    class: `data-highlighted:bg-${color}/10 data-highlighted:text-${color} data-[state=checked]:text-${color}`,
  })),
  {
    color: "neutral",
    class:
      "data-highlighted:bg-elevated data-highlighted:text-highlighted data-[state=checked]:text-highlighted",
  },
];

/** What a row is. */
export type MenuItemType = "item" | "checkbox" | "label" | "separator";

/**
 * One row in a menu.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * Named `Row` because `MenuItem` is the part. One flat array holds every kind of
 * row, rather than an array of groups holding arrays of rows. A group is a `label`
 * row and the rows after it, which is how a menu reads down the page and means a
 * caller building rows from data never has to decide where one array ends and the
 * next begins. `groupMenuItems` turns the flat list back into the nesting Ark's
 * markup wants.
 *
 * A row with `children` opens a submenu, to any depth. A row with `href` is a link,
 * and the whole row is the anchor rather than the text inside it. There is no radio
 * row in the data: a menu offering one answer out of several is a Select wearing a
 * menu's clothes, though the Ark radio parts ship for callers who disagree.
 */
export interface MenuRow<F> {
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
  children?: MenuRow<F>[];
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
  items: MenuRow<F>[];
}

/**
 * How a row is identified when the caller has not said.
 *
 * @param row - The row.
 * @param index - Where it sits among its siblings.
 * @returns The row's own `value`, else its label, else its position.
 *
 * @remarks
 * Ark needs a value on every row for typeahead and for the highlighted state, and a
 * caller writing a menu out by hand should not have to invent one. The position is
 * the last resort rather than the first, so that reordering rows does not silently
 * move which one Ark thinks is highlighted.
 */
export function menuRowValue<F>(row: MenuRow<F>, index: number): string {
  return row.value ?? row.label ?? String(index);
}

/**
 * Turn a flat list of rows into the sections Ark's markup wants.
 *
 * @param rows - Every row, headings included.
 * @returns One section per heading, plus a leading section for the rows before the
 * first one. Sections with no rows in them are dropped.
 *
 * @remarks
 * Lives here rather than in either adapter because both need exactly this rule, and
 * a menu whose React and Vue halves disagreed about where a group ends would be two
 * components. A heading starts a section and belongs to none, so it never renders as a
 * row of its own.
 */
export function groupMenuItems<F>(rows: MenuRow<F>[]): MenuSection<F>[] {
  const sections: MenuSection<F>[] = [{ items: [] }];

  for (const row of rows) {
    if (row.type === "label") {
      sections.push({ label: row.label, items: [] });
    } else {
      sections[sections.length - 1]!.items.push(row);
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
 * rows are data. That is the rule for every component carrying the caller's own
 * content, and the Dialog is where it was settled.
 */
export interface MenuRootProps<F> {
  color?: MenuColor;
  size?: MenuSize;
  /** The rows to draw. */
  items: MenuRow<F>[];
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

/**
 * The panel. Off is for a caller who would rather animate it themselves.
 *
 * @remarks
 * A part prop, not a root one: it is consumed by exactly one part, and only opacity
 * ever animates — enter, exit and slide never ship.
 */
export interface MenuContentProps {
  /** @defaultValue `true` */
  transition?: boolean;
}

/**
 * A row that opens a submenu, for custom composition.
 *
 * @typeParam F - However the framework spells an icon.
 */
export interface MenuTriggerItemProps<F> {
  /** The row to draw. Its `children` are the submenu's rows. */
  row: MenuRow<F>;
  /** Replaces the chevron. */
  trailingIcon?: F;
}

/**
 * One row, for custom composition.
 *
 * @typeParam F - However the framework spells an icon.
 */
export interface MenuItemProps<F> {
  /** The row to draw. */
  row: MenuRow<F>;
}

/**
 * One checkbox row, for custom composition.
 *
 * @typeParam F - However the framework spells an icon.
 */
export interface MenuCheckboxItemProps<F> {
  /** The row to draw. */
  row: MenuRow<F>;
  /** Replaces the tick. */
  checkedIcon?: F;
}
