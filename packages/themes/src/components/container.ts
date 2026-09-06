import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * Container styling data. Nothing here knows a framework.
 *
 * @remarks
 * One part and no axes, which is the point. A Container is a horizontal constraint and
 * a gutter, so every other layout component can be written without repeating either.
 *
 * The measure is `max-w-page`, which is the container token behind a utility name, so
 * a site that wants a narrower page changes one custom property and every Container
 * follows — including the rows inside the Header and the Footer that a caller never
 * renders itself. The gutter grows at two breakpoints, so content clears the edge on a
 * phone without being pushed around on a wide screen.
 *
 * There is no `as` prop, and no other layout component here has one. Nuxt UI gives
 * every layout component one because a Nuxt page is a tree of them and the semantics
 * have to be spelled somewhere; this library ships the elements that carry the
 * semantics instead, so a Container is free to stay the `div` it always is.
 */

/** The measure and gutters every layout row restates. */
export const containerClass = "mx-auto w-full max-w-page px-5 sm:px-8 lg:px-12";

/** No design axes: a container is one measure. */
export const containerSchema = {} as const satisfies ComponentSchema;

export const containerParts = [
  { export: "Container", file: "container", contract: null },
] as const satisfies readonly ComponentPart[];
