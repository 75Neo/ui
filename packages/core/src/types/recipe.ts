/**
 * A `tailwind-variants` recipe, seen only through the parts every recipe exposes.
 *
 * Recipes are self-describing at runtime: `variants` carries every variant key and
 * its values, `slots` carries every slot name, `variantKeys` carries the keys in
 * declaration order. Nothing built on top of a recipe needs to restate any of it.
 */
export interface Recipe {
  variants: Record<string, Record<string, unknown>>;
  slots: Record<string, unknown>;
  variantKeys: readonly (string | number)[];
}

/** The slot names a recipe declares. */
export type RecipeSlots<R extends Recipe> = keyof R["slots"] & string;

/** The variant props a recipe accepts, each optional. */
export type RecipeVariants<R extends Recipe> = {
  [K in keyof R["variants"]]?: keyof R["variants"][K];
};

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
