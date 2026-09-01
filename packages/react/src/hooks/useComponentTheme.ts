import { useContext, useMemo } from "react";
import {
  type ComponentKey,
  type SlotsOf,
  type ThemeOverrideOf,
  type TVSlot,
  applyThemeOverrides,
} from "@75neo/core";
import { ThemeContext } from "../context/ThemeContext";

export function useComponentTheme<K extends ComponentKey>(
  key: K,
  ui?: TVSlot<SlotsOf<K>>,
): ThemeOverrideOf<K> {
  const config = useContext(ThemeContext);

  return useMemo(() => applyThemeOverrides(config?.[key] ?? {}, { ui }), [config, key, ui]);
}
