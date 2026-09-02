import { useContext } from "react";
import { type ComponentKey, type Recipe, type ResolvedTheme, resolveTheme } from "@75neo/core";
import { ThemeContext } from "../context/ThemeContext";

/**
 * Resolve a component's classes and variant props against the ambient theme.
 *
 * @param recipe - The component's recipe.
 * @param key - The component's registry name, such as `"button"`.
 * @param props - The props the caller passed, including its `ui`.
 * @param className - A call-site class string. It reaches the `base` slot only.
 * @returns One finished class string per slot, plus the variant props actually used.
 *
 * @remarks
 * The cascade itself lives in `resolveTheme`. Not memoized on purpose: resolving is
 * cheap, and the props bag is a fresh object on every render anyway.
 */
export function useResolvedTheme<R extends Recipe, K extends ComponentKey>(
  recipe: R,
  key: K,
  props: object,
  className?: string,
): ResolvedTheme<R> {
  const config = useContext(ThemeContext);

  return resolveTheme(recipe, config?.[key], props, className);
}
