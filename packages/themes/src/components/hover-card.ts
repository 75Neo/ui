import type { ComponentPart, ComponentSchema } from "../schema";
import type { Placement } from "../placement";

/**
 * HoverCard styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 */

export type HoverCardSize = "sm" | "md" | "lg";

export const hoverCardDefaults = { size: "md" } as const;

export const hoverCardSchema = {
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const hoverCardParts = [
  { export: "HoverCard", file: "hover-card", contract: "HoverCardRootProps" },
  { export: "HoverCardTrigger", file: "trigger", contract: null },
  { export: "HoverCardContent", file: "content", contract: "HoverCardContentProps" },
  { export: "HoverCardArrow", file: "arrow", contract: null },
  { export: "HoverCardTitle", file: "title", contract: null },
  { export: "HoverCardDescription", file: "description", contract: null },
  { export: "HoverCardBody", file: "body", contract: null },
] as const satisfies readonly ComponentPart[];

export const hoverCardSizeData = {
  base: {
    sm: "w-56 gap-1 p-3",
    md: "w-72 gap-1 p-4",
    lg: "w-96 gap-1.5 p-5",
  },
  title: {
    sm: "text-sm",
    md: "text-sm",
    lg: "text-base",
  },
  description: {
    sm: "text-xs/5",
    md: "text-sm/6",
    lg: "text-sm/6",
  },
  body: {
    sm: "text-sm/6",
    md: "text-sm/6",
    lg: "text-base/7",
  },
} as const satisfies Record<string, Record<HoverCardSize, string>>;

/**
 * Everything a HoverCard accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * The open state is not here: React spells it `open` with `onOpenChange`, Vue spells
 * it `v-model:open`, so each adapter takes it from Ark's root instead.
 *
 * The trigger is the component's own children, handed to Ark with `asChild`.
 */
export interface HoverCardRootProps<F> {
  size?: HoverCardSize;
  /** The card's heading. */
  title?: string;
  /** A quieter line under the heading. */
  description?: string;
  /** The card's main content, under the title and description. */
  body?: F;
  /** Point a small triangle back at the trigger. @defaultValue `false` */
  arrow?: boolean;
  /** Which side of the trigger the card prefers. @defaultValue `"bottom"` */
  placement?: Placement;
  /** Gap in pixels between the trigger and the card. @defaultValue `8` */
  offset?: number;
  openDelay?: number;
  closeDelay?: number;
  disabled?: boolean;
  /** Render the card at the end of `body`. @defaultValue `true` */
  portal?: boolean;
  /** Wait until first open to mount the card. @defaultValue `false` */
  lazyMount?: boolean;
  /** Unmount the card again on close. @defaultValue `false` */
  unmountOnExit?: boolean;
}

/**
 * The card. Off is for a caller who would rather animate it themselves.
 *
 * @remarks
 * A part prop, not a root one: it is consumed by exactly one part, and only
 * opacity ever animates.
 */
export interface HoverCardContentProps {
  /** @defaultValue `true` */
  transition?: boolean;
}
