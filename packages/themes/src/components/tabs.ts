import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { eachColor } from "../colors";

/**
 * Recipe for the Tabs: a row of triggers and the panel the selected one shows.
 *
 * @remarks
 * Orientation is not a variant. Every slot styles itself off the `data-orientation`
 * attribute Ark sets, which keeps the variant matrix at forty two rather than eighty
 * four, and is what the Accordion does for the same reason.
 *
 * The indicator is the part worth reading twice. Ark measures the selected trigger and
 * writes `--left`, `--top`, `--width` and `--height` onto the indicator, but only sets
 * one axis itself: `left` when the tabs are horizontal, `top` when they are vertical.
 * The other axis is the recipe's, which is what lets one element be a pill behind the
 * trigger in one variant and a line along the list's edge in the other.
 *
 * `-z-10` puts it behind the triggers, and the `isolate` on the list is what keeps it
 * from falling behind the page as well.
 *
 * The two variants spend the color differently. A pill is a raised surface, so the
 * color goes on the selected label and the pill stays neutral; a link has no surface,
 * so the color is the line.
 */
export const tabs = tv({
  slots: {
    base: "group/tabs flex min-w-0 data-[orientation=horizontal]:flex-col data-[orientation=vertical]:flex-row",
    list: "relative isolate flex min-w-0 shrink-0 group-data-[orientation=vertical]/tabs:flex-col",
    indicator: "absolute -z-10 transition-all duration-200",
    trigger:
      "inline-flex min-w-0 cursor-pointer items-center gap-2 font-medium whitespace-nowrap transition-colors select-none group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-75",
    leadingIcon: "shrink-0 [&>svg]:size-full",
    label: "min-w-0 truncate",
    content: "min-w-0 outline-none",
  },
  variants: {
    variant: {
      pill: {
        list: "gap-1 rounded-lg bg-elevated p-1",
        indicator:
          "rounded-md bg-default shadow-sm group-data-[orientation=horizontal]/tabs:inset-y-1 group-data-[orientation=horizontal]/tabs:w-(--width) group-data-[orientation=vertical]/tabs:inset-x-1 group-data-[orientation=vertical]/tabs:h-(--height)",
        trigger: "justify-center rounded-md text-muted hover:text-highlighted",
      },
      link: {
        list: "gap-1 border-muted group-data-[orientation=horizontal]/tabs:border-b group-data-[orientation=vertical]/tabs:border-e",
        indicator:
          "group-data-[orientation=horizontal]/tabs:bottom-0 group-data-[orientation=horizontal]/tabs:h-0.5 group-data-[orientation=horizontal]/tabs:w-(--width) group-data-[orientation=vertical]/tabs:inset-s-0 group-data-[orientation=vertical]/tabs:h-(--height) group-data-[orientation=vertical]/tabs:w-0.5",
        trigger: "text-muted hover:text-highlighted",
      },
    },
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
        trigger: "min-h-7 px-2.5 text-xs",
        leadingIcon: "size-3.5",
        content:
          "text-sm group-data-[orientation=horizontal]/tabs:pt-2 group-data-[orientation=vertical]/tabs:ps-3",
      },
      md: {
        trigger: "min-h-8 px-3 text-sm",
        leadingIcon: "size-4",
        content:
          "text-sm group-data-[orientation=horizontal]/tabs:pt-3 group-data-[orientation=vertical]/tabs:ps-4",
      },
      lg: {
        trigger: "min-h-10 px-4 text-base",
        leadingIcon: "size-5",
        content:
          "text-base group-data-[orientation=horizontal]/tabs:pt-4 group-data-[orientation=vertical]/tabs:ps-5",
      },
    },
  },
  compoundVariants: [
    ...eachColor((color) => ({
      color,
      class: { trigger: `outline-${color}/25 data-selected:text-${color}` },
    })),
    {
      color: "neutral",
      class: { trigger: "outline-inverted/25 data-selected:text-highlighted" },
    },
    ...eachColor((color) => ({
      variant: "link" as const,
      color,
      class: { indicator: `bg-${color}` },
    })),
    { variant: "link", color: "neutral", class: { indicator: "bg-inverted" } },
  ],
  defaultVariants: {
    variant: "pill",
    color: "primary",
    size: "md",
  },
});

export type TabsVariants = VariantProps<typeof tabs>;
export type TabsSlots = keyof ReturnType<typeof tabs>;

export type TabsUI = TVSlot<TabsSlots>;

export type TabsTheme = ThemeOverride<TabsSlots, TabsVariants>;

/** One tab: the trigger that selects it and the panel it shows. */
export interface TabsItem<F> {
  /** Identifies the tab. Pass it to `defaultValue` to select it up front. */
  value: string;
  /** Trigger text. */
  label: string;
  /** Panel text, shown while the tab is selected. */
  content?: string;
  disabled?: boolean;
  /** Icon shown before this tab's label. */
  icon?: F;
}

/**
 * Everything a Tabs accepts in both frameworks. Each adapter adds its own framework
 * props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The selected value is not here: React spells it `value` with `onValueChange`, Vue
 * spells it `v-model`, so each adapter takes it from Ark's root instead.
 *
 * A tab's panel is a string on the item, and anything richer goes through the adapter's
 * own escape hatch: `renderContent` in React, the scoped `content` slot in Vue. The
 * Carousel takes slides the same way.
 */
export interface TabsProps<F> {
  /** Per-slot class overrides. */
  ui?: TabsUI;
  variant?: TabsVariants["variant"];
  color?: TabsVariants["color"];
  size?: TabsVariants["size"];
  /** The tabs to render, in order. */
  items: TabsItem<F>[];
  /** Whether arrowing onto a trigger selects it. @defaultValue `"automatic"` */
  activationMode?: "automatic" | "manual";
  /** @defaultValue `"horizontal"` */
  orientation?: "horizontal" | "vertical";
  /** Take the panels out of the DOM while their tab is not selected. */
  unmountOnExit?: boolean;
  /** Wait until first selection to mount a panel. */
  lazyMount?: boolean;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type TabsVariantsAreExposed = MustBeNever<
  Exclude<keyof TabsVariants, keyof TabsProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    tabs: ComponentContract<TabsSlots, TabsVariants>;
  }
}
