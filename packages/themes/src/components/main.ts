import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * Main styling data. Nothing here knows a framework.
 *
 * @remarks
 * The single class is the reason this component exists. A page whose content is
 * shorter than the viewport leaves the Footer floating in the middle of the screen
 * unless something claims the remaining height, and the remaining height is the
 * viewport less the header token — nothing the Main could measure.
 *
 * `dvh` rather than `vh`, so the region does not jump when a mobile browser's address
 * bar slides away. A page with no Header still works: the token is set either way, so
 * the Main is merely a little short rather than wrong.
 *
 * The element is a `main`, the landmark a screen reader jumps to, and there is one per
 * page. That is why it is a component rather than a class.
 */

/** The viewport less the header, which the Main and the Error both claim. */
export const mainHeightClass = "min-h-[calc(100dvh-var(--ui-header-height))]";

/** No design axes: the region is a height. */
export const mainSchema = {} as const satisfies ComponentSchema;

export const mainParts = [
  { export: "Main", file: "main", contract: null },
] as const satisfies readonly ComponentPart[];
