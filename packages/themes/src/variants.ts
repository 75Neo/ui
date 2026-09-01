/**
 * A `tailwind-variants` recipe, seen only through the parts every recipe exposes.
 *
 * Recipes are self-describing at runtime: `variants` carries every variant key and
 * its values, `slots` carries every slot name. Nothing built on top of a recipe needs
 * to restate either.
 */
export interface Recipe {
  variants: Record<string, Record<string, unknown>>;
  slots: Record<string, unknown>;
}

/**
 * The values a recipe accepts for one variant, in declaration order.
 *
 * Typed as the literal union rather than `string[]`, so callers can feed the result
 * straight back into the component's props.
 */
export function variantValues<R extends Recipe, K extends keyof R["variants"]>(
  recipe: R,
  key: K,
): (keyof R["variants"][K])[] {
  return Object.keys(recipe.variants[key as string]) as (keyof R["variants"][K])[];
}
