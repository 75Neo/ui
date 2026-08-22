import type { RecipeConfig } from "@pandacss/dev";
import type {
  RecipeConfig as StrictRecipeConfig,
  RecipeVariantRecord,
} from "../../styled-system/types/recipe";

/**
 * `defineRecipe` from `@pandacss/dev` is typed against Panda's *generic*
 * `SystemStyleObject`, which accepts any raw CSS value. `strictTokens` never reaches it,
 * so a stray `padding: "13px"` in a recipe would typecheck cleanly — in the one place
 * this repo says styling belongs.
 *
 * This is the same identity function, but its *parameter* is the *generated*
 * `RecipeConfig`, which `strictTokens` does apply to. That is where the enforcement
 * happens. The return type is widened back to Panda's own `RecipeConfig` because the
 * preset's `theme.extend.recipes` expects that shape and the two are not mutually
 * assignable.
 *
 * Recipes must import from here, not from `@pandacss/dev`.
 *
 * Both imports are type-only, so nothing here depends on `styled-system/` at runtime and
 * a cold `pnpm codegen` — before that directory exists — still works.
 */
export const defineRecipe = <T extends RecipeVariantRecord>(
  config: StrictRecipeConfig<T>,
): RecipeConfig => config as RecipeConfig;
