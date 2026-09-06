import { componentColors, eachColor, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * Tabs styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 *
 * @remarks
 * The indicator snaps rather than slides: positional transitions never ship. It
 * positions from the custom properties Ark measures, differently per variant — a
 * pill behind the trigger, a rule under it.
 */

export type TabsVariant = "pill" | "link";
export type TabsColor = ComponentColor;
export type TabsSize = "sm" | "md" | "lg";

export const tabsDefaults = { variant: "pill", color: "primary", size: "md" } as const;

export const tabsSchema = {
  variant: { values: ["pill", "link"], defaultValue: "pill" },
  color: { values: componentColors, defaultValue: "primary" },
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const tabsParts = [
  { export: "Tabs", file: "tabs", contract: "TabsRootProps" },
  { export: "TabsList", file: "list", contract: null },
  { export: "TabsIndicator", file: "indicator", contract: null },
  { export: "TabsTrigger", file: "trigger", contract: "TabsTriggerProps" },
  { export: "TabsContent", file: "content", contract: "TabsContentProps" },
] as const satisfies readonly ComponentPart[];

export const tabsVariantData = {
  list: {
    pill: "gap-1 rounded-lg bg-elevated p-1",
    link: "gap-1 border-muted group-data-[orientation=horizontal]/tabs:border-b group-data-[orientation=vertical]/tabs:border-e",
  },
  indicator: {
    pill: "rounded-md bg-default shadow-sm group-data-[orientation=horizontal]/tabs:inset-y-1 group-data-[orientation=horizontal]/tabs:w-(--width) group-data-[orientation=vertical]/tabs:inset-x-1 group-data-[orientation=vertical]/tabs:h-(--height)",
    link: "group-data-[orientation=horizontal]/tabs:bottom-0 group-data-[orientation=horizontal]/tabs:h-0.5 group-data-[orientation=horizontal]/tabs:w-(--width) group-data-[orientation=vertical]/tabs:inset-s-0 group-data-[orientation=vertical]/tabs:h-(--height) group-data-[orientation=vertical]/tabs:w-0.5",
  },
  trigger: {
    pill: "justify-center rounded-md text-muted hover:text-highlighted",
    link: "text-muted hover:text-highlighted",
  },
} as const satisfies Record<string, Record<TabsVariant, string>>;

export const tabsSizeData = {
  trigger: {
    sm: "min-h-7 px-2.5 text-xs",
    md: "min-h-8 px-3 text-sm",
    lg: "min-h-10 px-4 text-base",
  },
  leadingIcon: {
    sm: "size-3.5",
    md: "size-4",
    lg: "size-5",
  },
  content: {
    sm: "text-sm group-data-[orientation=horizontal]/tabs:pt-2 group-data-[orientation=vertical]/tabs:ps-3",
    md: "text-sm group-data-[orientation=horizontal]/tabs:pt-3 group-data-[orientation=vertical]/tabs:ps-4",
    lg: "text-base group-data-[orientation=horizontal]/tabs:pt-4 group-data-[orientation=vertical]/tabs:ps-5",
  },
} as const satisfies Record<string, Record<TabsSize, string>>;

/** One colour row, as `cva` compound variants read it. */
export interface TabsTriggerCompound {
  color?: TabsColor;
  class: string;
}

export const tabsTriggerCompoundData: TabsTriggerCompound[] = [
  ...eachColor((color) => ({
    color,
    class: `outline-${color}/25 data-selected:text-${color}`,
  })),
  {
    color: "neutral",
    class: "outline-inverted/25 data-selected:text-highlighted",
  },
];

/** One colour row, as `cva` compound variants read it. Link only; pills stay neutral. */
export interface TabsIndicatorCompound {
  variant?: TabsVariant;
  color?: TabsColor;
  class: string;
}

export const tabsIndicatorCompoundData: TabsIndicatorCompound[] = [
  ...eachColor((color) => ({
    variant: "link" as const,
    color,
    class: `bg-${color}`,
  })),
  { variant: "link", color: "neutral", class: "bg-inverted" },
];

/**
 * One tab: the trigger that selects it and the panel it shows.
 *
 * @typeParam F - However the framework spells an icon.
 */
export interface TabsTab<F> {
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
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * The selected value is not here: React spells it `value` with `onValueChange`, Vue
 * spells it `v-model`, so each adapter takes it from Ark's root instead.
 *
 * Either `items` or caller composition feeds the tabs. `items` renders the default
 * triggers and panels; anything richer composes `TabsTrigger` and `TabsContent`
 * directly, each naming its tab by `value`.
 */
export interface TabsRootProps<F> {
  variant?: TabsVariant;
  color?: TabsColor;
  size?: TabsSize;
  /** The tabs to offer. */
  items?: TabsTab<F>[];
  activationMode?: "automatic" | "manual";
  /** @defaultValue `"horizontal"` */
  orientation?: "horizontal" | "vertical";
  unmountOnExit?: boolean;
  lazyMount?: boolean;
}

/**
 * One trigger, for custom composition.
 */
export interface TabsTriggerProps {
  /** The tab this trigger selects. */
  value: string;
  disabled?: boolean;
}

/**
 * One panel, for custom composition.
 */
export interface TabsContentProps {
  /** The tab this panel shows. */
  value: string;
}
