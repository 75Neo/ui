import { componentColors, eachColor, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * NavigationMenu styling data: plain class strings both adapters feed into their own
 * `cva` calls, one per anatomy part. Nothing here knows a framework.
 *
 * @remarks
 * The Menu's hover-driven sibling. The two share a size scale, a colour half and the
 * panel's measurements, because a reader who has learned one should not have to learn
 * the other. What differs is the geometry: a menu's panel is anchored to one trigger
 * by a popper, while each panel here is absolutely positioned against its own item, so
 * no positioning library is involved and these classes own every coordinate.
 *
 * A row is one of two things. A row with links is a trigger and the panel it opens; a
 * row with an address and no links is a plain anchor wearing the trigger's neighbours
 * as its own row. Both are addressed by Ark's own parts, so the two read as one list.
 *
 * The accent reaches a link under the pointer or the arrow keys and the link naming
 * the page being read, and nothing else. A bar holding every row in the accent colour
 * is a bar nobody can read.
 *
 * Ark spells disabled two ways here. The trigger is a real button carrying the
 * attribute, so it styles with `disabled:`; the item around it is a `div` carrying
 * only `data-disabled`.
 */

export type NavigationMenuSize = "sm" | "md" | "lg";
export type NavigationMenuColor = ComponentColor;
export type NavigationMenuOrientation = "horizontal" | "vertical";

/** What the root publishes and every part reads. Lives in each adapter. */
export interface NavigationMenuVariants {
  color: NavigationMenuColor;
  size: NavigationMenuSize;
  orientation: NavigationMenuOrientation;
}

export const navigationMenuDefaults = {
  color: "primary",
  size: "md",
  orientation: "horizontal",
} as const;

export const navigationMenuSchema = {
  color: { values: componentColors, defaultValue: "primary" },
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
  orientation: { values: ["horizontal", "vertical"], defaultValue: "horizontal" },
} as const satisfies ComponentSchema;

export const navigationMenuParts = [
  { export: "NavigationMenu", file: "navigation-menu", contract: "NavigationMenuRootProps" },
  { export: "NavigationMenuList", file: "list", contract: null },
  { export: "NavigationMenuItem", file: "item", contract: "NavigationMenuItemProps" },
  { export: "NavigationMenuTrigger", file: "trigger", contract: "NavigationMenuTriggerProps" },
  { export: "NavigationMenuContent", file: "content", contract: null },
  { export: "NavigationMenuLink", file: "link", contract: "NavigationMenuLinkProps" },
] as const satisfies readonly ComponentPart[];

export const navigationMenuSizeData = {
  trigger: {
    sm: "h-8 px-2.5 text-xs",
    md: "h-9 px-3 text-sm",
    lg: "h-10 px-3.5 text-sm",
  },
  leadingIcon: {
    sm: "size-3.5",
    md: "size-4",
    lg: "size-5",
  },
  trailingIcon: {
    sm: "size-3.5",
    md: "size-4",
    lg: "size-5",
  },
  link: {
    sm: "px-2 py-1.5 text-xs",
    md: "px-2.5 py-2 text-sm",
    lg: "px-3 py-2.5 text-sm",
  },
  linkIcon: {
    sm: "size-4",
    md: "size-4",
    lg: "size-5",
  },
  linkTitle: {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-sm",
  },
  linkDescription: {
    sm: "text-[0.6875rem]",
    md: "text-xs",
    lg: "text-xs",
  },
} as const satisfies Record<string, Record<NavigationMenuSize, string>>;

export const navigationMenuOrientationData = {
  list: {
    horizontal: "flex-row",
    vertical: "w-full flex-col items-stretch",
  },
  item: {
    horizontal: "",
    vertical: "w-full",
  },
  trigger: {
    horizontal: "",
    vertical: "w-full justify-between",
  },
  content: {
    horizontal: "inset-s-0 top-full mt-1.5 origin-top",
    vertical: "inset-s-full top-0 ms-1.5 origin-top",
  },
} as const satisfies Record<string, Record<NavigationMenuOrientation, string>>;

/** One colour row, as `cva` compound variants read it. */
export interface NavigationMenuLinkCompound {
  color?: NavigationMenuColor;
  class: string;
}

export const navigationMenuLinkCompoundData: NavigationMenuLinkCompound[] = [
  ...eachColor((color) => ({
    color,
    class: `data-highlighted:bg-${color}/10 data-highlighted:text-${color} data-current:text-${color}`,
  })),
  {
    color: "neutral",
    class:
      "data-current:text-highlighted data-highlighted:bg-elevated data-highlighted:text-highlighted",
  },
];

/**
 * One link inside a panel.
 *
 * @typeParam F - However the framework spells an icon.
 */
export interface NavigationMenuLinkData<F> {
  /** Where the link goes. */
  href: string;
  /** The link's heading. */
  title: string;
  /** A quieter second line under the heading. */
  description?: string;
  /** Icon before the heading. */
  icon?: F;
  /** Whether the link names the page being read. */
  current?: boolean;
}

/**
 * One row in the bar.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * A row with links is a trigger and the panel it opens; a row with an address and no
 * links is a plain anchor. One flat array holds both, so a caller building rows from
 * data never has to decide where one shape ends and the next begins.
 */
export interface NavigationMenuItemData<F> {
  /** Identifies the row. */
  value: string;
  /** What the trigger or the plain link says. */
  label?: string;
  /** Icon before the trigger's label. */
  icon?: F;
  disabled?: boolean;
  /** Makes the row a plain link to here, with no panel. */
  href?: string;
  /** Whether the plain link names the page being read. */
  current?: boolean;
  /** The links in the panel this row opens. */
  links?: NavigationMenuLinkData<F>[];
}

/** Everything a NavigationMenu row accepts in both frameworks. */
export interface NavigationMenuItemProps {
  /** Identifies the row. */
  value: string;
  disabled?: boolean;
}

/**
 * Everything a NavigationMenu trigger accepts in both frameworks.
 *
 * @typeParam F - However the framework spells an icon.
 */
export interface NavigationMenuTriggerProps<F> {
  /** Icon before the label. */
  leadingIcon?: F;
  /** Replaces the chevron. */
  trailingIcon?: F;
}

/**
 * Everything a NavigationMenu link accepts in both frameworks.
 *
 * @typeParam F - However the framework spells an icon.
 */
export interface NavigationMenuLinkProps<F> {
  /** Where the link goes. */
  href: string;
  /** The link's heading. Falls back to the link's own children. */
  title?: string;
  /** A quieter second line under the heading. */
  description?: string;
  /** Icon before the heading. */
  leadingIcon?: F;
  /** Whether the link names the page being read. */
  current?: boolean;
}

/**
 * Everything the NavigationMenu root accepts in both frameworks.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * The open row is not here: React spells it `value` with `onValueChange`, Vue spells
 * it `v-model`, so each adapter takes it from Ark's root instead.
 */
export interface NavigationMenuRootProps<F> {
  color?: NavigationMenuColor;
  size?: NavigationMenuSize;
  /** Which way the bar runs. @defaultValue `"horizontal"` */
  orientation?: NavigationMenuOrientation;
  /** The rows to draw. */
  items?: NavigationMenuItemData<F>[];
  /** Replaces the chevron on a trigger that opens a panel. */
  trailingIcon?: F;
}
