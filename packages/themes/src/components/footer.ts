import type { ComponentPart, ComponentSchema } from "../schema";
import { containerClass } from "./container";

/**
 * Footer styling data: plain class strings both adapters feed into their own parts.
 * Nothing here knows a framework.
 *
 * @remarks
 * The row restates the Container's measure and gutters rather than rendering one,
 * for the reason the Header does: composing the component would put the container's
 * own part name on the row instead of the footer's, and part-name identity is what
 * every test selects on. The measure is the same token either way, so the Footer, the
 * Header and a Container around the page body all still move together.
 *
 * The three regions go into the DOM in the order end, center, start and are put back
 * into reading order by their own order classes. That is deliberate rather than an
 * accident of the flex direction: stacked on a phone, the links people came for should
 * be above the copyright, and reversing the source is the only way to get that without
 * duplicating the markup. Reading order returns the moment there is a row to sit in.
 *
 * The two bands are full-bleed and unpadded horizontally, so a caller can put a
 * newsletter strip or a wide grid of columns there and let it run to the edge.
 */

/** No design axes: a footer is one arrangement. */
export const footerSchema = {} as const satisfies ComponentSchema;

export const footerParts = [
  { export: "Footer", file: "footer", contract: null },
  { export: "FooterTop", file: "top", contract: null },
  { export: "FooterRow", file: "row", contract: null },
  { export: "FooterStart", file: "start", contract: null },
  { export: "FooterCenter", file: "center", contract: null },
  { export: "FooterEnd", file: "end", contract: null },
  { export: "FooterBottom", file: "bottom", contract: null },
] as const satisfies readonly ComponentPart[];

export const footerClasses = {
  band: "py-8 lg:py-12",
  row: `${containerClass} py-8 lg:flex lg:items-center lg:justify-between lg:gap-x-3 lg:py-4`,
  start:
    "mt-3 flex items-center justify-center gap-x-1.5 text-sm text-muted lg:order-1 lg:mt-0 lg:flex-1 lg:justify-start",
  center: "mt-3 flex items-center justify-center lg:order-2 lg:mt-0",
  end: "flex items-center justify-center gap-x-1.5 lg:order-3 lg:flex-1 lg:justify-end",
} as const;
