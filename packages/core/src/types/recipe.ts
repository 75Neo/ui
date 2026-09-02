/**
 * A `tailwind-variants` recipe, seen through the parts every recipe exposes.
 *
 * @remarks
 * Recipes describe themselves at runtime, so nothing built on one needs to restate its
 * slots or variants.
 */
export interface Recipe {
  /** Every variant key, with the values it accepts. */
  variants: Record<string, Record<string, unknown>>;
  /** Every slot the recipe renders classes for. */
  slots: Record<string, unknown>;
  /** The variant keys, in declaration order. */
  variantKeys: readonly (string | number)[];
}

/** The slot names a recipe declares. */
export type RecipeSlots<R extends Recipe> = keyof R["slots"] & string;

/** The variant props a recipe accepts, each optional. */
export type RecipeVariants<R extends Recipe> = {
  [K in keyof R["variants"]]?: keyof R["variants"][K];
};

/**
 * List the values a recipe accepts for one variant, in declaration order.
 *
 * @param recipe - The recipe to read.
 * @param key - The variant to list, such as `"color"`.
 * @returns The declared values, typed as literals so they can be passed straight back
 * to the component as props.
 *
 * @example
 * ```ts
 * variantValues(button, "size"); // ["xs", "sm", "md", "lg", "xl"]
 * ```
 */
export function variantValues<R extends Recipe, K extends keyof R["variants"]>(
  recipe: R,
  key: K,
): (keyof R["variants"][K])[] {
  return Object.keys(recipe.variants[key as string]) as (keyof R["variants"][K])[];
}
