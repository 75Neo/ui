import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * Tour styling data: plain class strings both adapters feed into their own
 * `cva` calls. Nothing here knows a framework.
 *
 * @remarks
 * The steps live in `useTour`, not here: the tour object carries the current
 * title, description and actions, and the parts render them the way Toast's do.
 * The `useTour` hook is re-exported from each adapter, so a caller adds no new
 * dependency.
 */

export type TourSize = "sm" | "md" | "lg";

export const tourDefaults = { size: "md" } as const;

export const tourSchema = {
  size: { values: ["sm", "md", "lg"], defaultValue: "md" },
} as const satisfies ComponentSchema;

export const tourParts = [
  { export: "Tour", file: "tour", contract: "TourRootProps" },
  { export: "TourBackdrop", file: "backdrop", contract: null },
  { export: "TourSpotlight", file: "spotlight", contract: null },
  { export: "TourPositioner", file: "positioner", contract: null },
  { export: "TourContent", file: "content", contract: null },
  { export: "TourArrow", file: "arrow", contract: null },
  { export: "TourProgressText", file: "progress-text", contract: null },
  { export: "TourTitle", file: "title", contract: null },
  { export: "TourDescription", file: "description", contract: null },
  { export: "TourControl", file: "control", contract: null },
  { export: "TourActions", file: "actions", contract: null },
  { export: "TourActionTrigger", file: "action-trigger", contract: null },
  { export: "TourCloseTrigger", file: "close-trigger", contract: null },
] as const satisfies readonly ComponentPart[];

export const tourSizeData = {
  base: {
    sm: "w-64 gap-1 p-3",
    md: "w-80 gap-1 p-4",
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
  progressText: {
    sm: "text-[0.6875rem]",
    md: "text-xs",
    lg: "text-xs",
  },
  actionTrigger: {
    sm: "h-7 px-2.5 text-xs",
    md: "h-8 px-3 text-sm",
    lg: "h-9 px-3.5 text-sm",
  },
  closeTrigger: {
    sm: "size-6 p-1",
    md: "size-7 p-1.5",
    lg: "size-8 p-1.5",
  },
} as const satisfies Record<string, Record<TourSize, string>>;

/**
 * Everything a Tour accepts in both frameworks. Each adapter adds its own
 * framework props on top.
 *
 * @typeParam F - However the framework spells an icon.
 * @typeParam T - However the framework spells the tour object.
 *
 * @remarks
 * The open state is the tour object's: `tour.start()` opens it, `dismiss`
 * closes it, so there is no `open` prop here.
 */
export interface TourRootProps<F, T> {
  size?: TourSize;
  /** The tour object returned by `useTour`. */
  tour: T;
  /** Point a small triangle back at the target. @defaultValue `true` */
  arrow?: boolean;
  /** Show the cross beside the progress text. @defaultValue `true` */
  close?: boolean;
  /** Replaces the cross. */
  closeIcon?: F;
  /** Render the tour at the end of `body`. @defaultValue `true` */
  portal?: boolean;
  /** Wait until first open to mount the tour. @defaultValue `false` */
  lazyMount?: boolean;
  /** Unmount the tour again on close. @defaultValue `false` */
  unmountOnExit?: boolean;
}
