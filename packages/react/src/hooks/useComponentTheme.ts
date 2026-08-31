import { useContext, useMemo } from "react";
import {
  type ComponentKey,
  type PropsOf,
  type ResolvedTheme,
  type SlotsOf,
  type TVSlot,
  resolveTheme,
} from "@75neo/core";
import { ThemeScopeContext } from "../context/ThemeContext";

/**
 * Resolves one component against the surrounding theme chain. The component's slot union and
 * themeable props are inferred from `key`, so `ui` is checked against that component's slots.
 */
export function useComponentTheme<K extends ComponentKey>(
  key: K,
  ui?: TVSlot<SlotsOf<K>>,
): ResolvedTheme<SlotsOf<K>, PropsOf<K>> {
  const scope = useContext(ThemeScopeContext);
  return useMemo(() => resolveTheme(scope, key, ui), [scope, key, ui]);
}
