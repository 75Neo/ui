import { useContext } from "react";
import { type ComponentKey, type Recipe, type ResolvedTheme, resolveTheme } from "@75neo/core";
import { ThemeContext } from "../context/ThemeContext";

/**
 * Resolve a component's classes and variant props against the ambient theme.
 *
 * The whole cascade lives in `resolveTheme`; this reads the theme a `Theme` put in
 * context and hands it over. It is deliberately not memoized -- `resolveTheme` is
 * cheap and stateless, and the props bag is a fresh object on every render anyway.
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
