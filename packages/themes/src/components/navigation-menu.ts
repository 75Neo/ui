import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { eachColor } from "../colors";

/**
 * Recipe for the NavigationMenu: a row of triggers, each opening a panel of links.
 *
 * @remarks
 * The Menu's hover-driven sibling. The two share a size scale, a color half and the
 * panel's measurements, because a reader who has learned one should not have to
 * learn the other. What differs is the geometry: a menu's panel is anchored to one
 * trigger by a popper, while each panel here is absolutely positioned against its
 * own item — `top-full` under a horizontal bar, `start-full` beside a vertical one —
 * so no positioning library is involved and the recipe owns every coordinate.
 *
 * A row is one of two things. An item with `links` is a trigger and the panel it
 * opens; an item with `href` and no links is a plain anchor wearing the trigger's
 * neighbours as its own row. Both are addressed by Ark's own parts, so the two read
 * as one list.
 *
 * The accent reaches a link under the pointer or the arrow keys and the link that
 * names the page being read, and nothing else. A bar holding every row in the accent
 * colour is a bar nobody can read.
 *
 * Ark spells disabled two ways here. The trigger is a real button carrying the
 * attribute, so it styles with `disabled:`. The item around it is a `div` carrying
 * only `data-disabled`. A link carries `data-current` while it names the page being
 * read, and a panel that is not showing stays mounted carrying the `hidden`
 * attribute rather than unmounting.
 */
export const navigationMenu = tv({
  slots: {
    base: "relative flex w-full min-w-0",
    list: "flex min-w-0 items-center gap-1",
    item: "relative flex min-w-0 shrink-0",
    trigger:
      "group/trigger inline-flex min-w-0 cursor-pointer items-center justify-center gap-1.5 rounded-md font-medium text-toned transition-colors outline-none select-none hover:bg-elevated hover:text-highlighted disabled:cursor-not-allowed disabled:opacity-75 data-[state=open]:bg-elevated data-[state=open]:text-highlighted",
    leadingIcon: "shrink-0 text-dimmed [&>svg]:size-full",
    trailingIcon:
      "shrink-0 text-dimmed transition-transform duration-200 group-data-[state=open]/trigger:rotate-180 [&>svg]:size-full",
    content:
      "absolute z-50 flex max-w-[min(26rem,calc(100vw-2rem))] min-w-52 flex-col gap-0.5 rounded-md bg-default p-1.5 shadow-lg ring ring-accented outline-none data-[state=closed]:animate-panel-out data-[state=open]:animate-panel-in",
    link: "flex cursor-pointer items-center gap-2.5 rounded-md text-toned no-underline transition-colors outline-none select-none hover:bg-elevated hover:text-highlighted focus-visible:bg-elevated data-current:font-medium data-current:text-highlighted",
    linkIcon: "shrink-0 text-dimmed [&>svg]:size-full",
    linkContent: "flex min-w-0 flex-1 flex-col gap-0.5",
    linkTitle: "truncate font-medium text-highlighted",
    linkDescription: "truncate text-muted",
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
        trigger: "h-8 px-2.5 text-xs",
        leadingIcon: "size-3.5",
        trailingIcon: "size-3.5",
        link: "px-2 py-1.5 text-xs",
        linkIcon: "size-4",
        linkTitle: "text-xs",
        linkDescription: "text-[0.6875rem]",
      },
      md: {
        trigger: "h-9 px-3 text-sm",
        leadingIcon: "size-4",
        trailingIcon: "size-4",
        link: "px-2.5 py-2 text-sm",
        linkIcon: "size-4",
        linkTitle: "text-sm",
        linkDescription: "text-xs",
      },
      lg: {
        trigger: "h-10 px-3.5 text-sm",
        leadingIcon: "size-5",
        trailingIcon: "size-5",
        link: "px-3 py-2.5 text-sm",
        linkIcon: "size-5",
        linkTitle: "text-sm",
        linkDescription: "text-xs",
      },
    },
    /** Which way the bar runs, and which side of its row each panel opens on. */
    orientation: {
      horizontal: {
        list: "flex-row",
        content: "inset-s-0 top-full mt-1.5 origin-top",
      },
      vertical: {
        list: "w-full flex-col items-stretch",
        item: "w-full",
        trigger: "w-full justify-between",
        content: "inset-s-full top-0 ms-1.5 origin-top",
      },
    },
  },
  compoundVariants: [
    ...eachColor((color) => ({
      color,
      class: {
        link: `data-highlighted:bg-${color}/10 data-highlighted:text-${color} data-current:text-${color}`,
      },
    })),
    {
      color: "neutral",
      class: {
        link: "data-current:text-highlighted data-highlighted:bg-elevated data-highlighted:text-highlighted",
      },
    },
  ],
  defaultVariants: {
    color: "primary",
    size: "md",
    orientation: "horizontal",
  },
});

export type NavigationMenuVariants = VariantProps<typeof navigationMenu>;
export type NavigationMenuSlots = keyof ReturnType<typeof navigationMenu>;

export type NavigationMenuUI = TVSlot<NavigationMenuSlots>;

export type NavigationMenuTheme = ThemeOverride<NavigationMenuSlots, NavigationMenuVariants>;

/**
 * One link inside a panel.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 */
export interface NavigationMenuLink<F> {
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
  /** Close the panel when the link is followed. @defaultValue `true` */
  closeOnClick?: boolean;
  /** Called when the link is followed. */
  onSelect?: () => void;
}

/**
 * One row in the bar.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * A row with `links` is a trigger and the panel it opens; a row with `href` and no
 * links is a plain anchor. One flat array holds both, the way `MenuItem` holds every
 * kind of menu row, so a caller building rows from data never has to decide where
 * one shape ends and the next begins.
 */
export interface NavigationMenuItem<F> {
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
  links?: NavigationMenuLink<F>[];
}

/**
 * Everything a NavigationMenu accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * The open row is not here: React spells it `value` with `onValueChange`, Vue spells
 * it `v-model`, so each adapter takes it from Ark's root instead.
 *
 * The variant props are written out by hand because `defineProps` in Vue cannot read
 * them off the recipe. The guard below keeps them in step.
 */
export interface NavigationMenuProps<F> {
  /** Per-slot class overrides. */
  ui?: NavigationMenuUI;
  color?: NavigationMenuVariants["color"];
  size?: NavigationMenuVariants["size"];
  /** Which way the bar runs. @defaultValue `"horizontal"` */
  orientation?: NavigationMenuVariants["orientation"];
  /** The rows to draw. */
  items: NavigationMenuItem<F>[];
  /** Replaces the chevron on a trigger that opens a panel. */
  trailingIcon?: F;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type NavigationMenuVariantsAreExposed = MustBeNever<
  Exclude<keyof NavigationMenuVariants, keyof NavigationMenuProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    navigationMenu: ComponentContract<NavigationMenuSlots, NavigationMenuVariants>;
  }
}
