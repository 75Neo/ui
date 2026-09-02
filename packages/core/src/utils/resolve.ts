import type { Recipe, RecipeSlots, RecipeVariants } from "../types/recipe";
import type { ThemeOverride } from "../types/theme";
import type { TVSlot } from "../types/tv";

/** A recipe, called: recipes with slots return one class function per slot. */
type InvokableRecipe = (
  props: Record<string, unknown>,
) => Record<string, (args?: { class?: unknown }) => string>;

/**
 * What a component renders with. Nothing is left to merge: each string goes straight
 * onto the element carrying that slot's `data-slot`.
 */
export interface ResolvedTheme<R extends Recipe> {
  /** The variant props the recipe was resolved with, after theme defaults. */
  props: RecipeVariants<R>;
  /** One finished class string per slot the recipe declares. */
  class: Record<RecipeSlots<R>, string>;
}

/**
 * Resolve a component's classes and variant props from every layer that can set them.
 *
 * The cascade runs weakest to strongest: the recipe's own classes, then `override.ui`,
 * then `props.ui`, then `className`. Tailwind-merge settles conflicts, so a later layer
 * replaces a conflicting utility and everything non-conflicting survives. Variant props
 * resolve the same way, with the recipe's `defaultVariants` as the last fallback.
 *
 * @param recipe - The component's recipe.
 * @param override - The theme layers, already folded together by `layerTheme`.
 * @param props - The props the caller passed, including its `ui`.
 * @param className - A call-site class string. It reaches the `base` slot only.
 * @returns One finished class string per slot, plus the variant props actually used.
 *
 * @remarks
 * Cheap and stateless, so call it on every render rather than memoize it. Which props
 * count as variants comes from `recipe.variantKeys`, so a new variant flows through
 * with no change here or in any component.
 */
export function resolveTheme<R extends Recipe>(
  recipe: R,
  override: ThemeOverride | undefined,
  props: object = {},
  className?: string,
): ResolvedTheme<R> {
  const own = props as Record<string, unknown>;
  const defaults = (override?.props ?? {}) as Record<string, unknown>;
  const variants: Record<string, unknown> = {};

  for (const key of recipe.variantKeys) {
    const k = String(key);
    variants[k] = own[k] ?? defaults[k];
  }

  const themeUI = override?.ui;
  const propUI = own.ui as TVSlot<string> | undefined;
  const slots = (recipe as unknown as InvokableRecipe)(variants);
  const classes: Record<string, string> = {};

  for (const slot of Object.keys(recipe.slots)) {
    classes[slot] = slots[slot]({
      class: [themeUI?.[slot], propUI?.[slot], slot === "base" ? className : undefined],
    });
  }

  return {
    props: variants as RecipeVariants<R>,
    class: classes as Record<RecipeSlots<R>, string>,
  };
}
