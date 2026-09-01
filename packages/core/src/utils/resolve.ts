import type { Recipe, RecipeSlots, RecipeVariants } from "../types/recipe";
import type { ThemeOverride } from "../types/theme";
import type { TVSlot } from "../types/tv";

/** A recipe, called. Recipes with slots return one class function per slot. */
type InvokableRecipe = (
  props: Record<string, unknown>,
) => Record<string, (args?: { class?: unknown }) => string>;

export interface ResolvedTheme<R extends Recipe> {
  /** The variant props the recipe was resolved with, after theme defaults. */
  props: RecipeVariants<R>;
  /** One finished class string per slot the recipe declares. */
  class: Record<RecipeSlots<R>, string>;
}

/**
 * Resolve a component's classes and variant props from every layer that can set them.
 *
 * The cascade, weakest first:
 *
 * 1. the recipe's own classes;
 * 2. `override.ui`, the theme layers already folded together by `applyThemeConfigs`;
 * 3. `props.ui`, the component's own per-slot override;
 * 4. `className`, written at the call site, which applies to `base` only.
 *
 * Conflicting utilities are settled by tailwind-merge, so a later layer replaces an
 * earlier one rather than appending to it; non-conflicting utilities from every layer
 * survive.
 *
 * Variant props resolve the same way: whatever the caller passed wins, falling back to
 * the theme's `props` defaults, falling back to the recipe's own `defaultVariants`.
 * Which props those are comes from `recipe.variantKeys`, so a variant added to a recipe
 * flows through without editing this function or its callers.
 *
 * Cheap and free of state: safe to call on every render rather than memoize.
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
    variants[key] = own[key] ?? defaults[key];
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
