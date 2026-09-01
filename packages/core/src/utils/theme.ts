import type { ThemeConfig, ThemeOverride } from "../types/theme";
import type { TVSlot } from "../types/tv";
import { cn } from "tailwind-variants";
import { defu } from "defu";

export function applyThemeOverrides<U extends string, P extends object>(
  a: ThemeOverride<U, P>,
  b: ThemeOverride<U, P>,
): ThemeOverride<U, P> {
  const result: ThemeOverride<U, P> = { props: defu(b.props, a.props) as Partial<P> };

  if (a.ui || b.ui) {
    const ui: TVSlot<U> = { ...a.ui };

    if (b.ui) {
      for (const k of Object.keys(b.ui) as U[]) {
        ui[k] = cn(ui[k], b.ui[k]);
      }
    }

    result.ui = ui;
  }

  return result;
}

export function applyThemeConfigs(a: ThemeConfig, b: ThemeConfig): ThemeConfig {
  const base = a as Record<string, ThemeOverride | undefined>;
  const overrides = b as Record<string, ThemeOverride | undefined>;
  const result: Record<string, ThemeOverride | undefined> = {};

  for (const key of Object.keys(base)) {
    const override = base[key];
    if (override) result[key] = applyThemeOverrides(override, {});
  }

  for (const key of Object.keys(overrides)) {
    const override = overrides[key];
    if (override) result[key] = applyThemeOverrides(result[key] ?? {}, override);
  }

  return result as ThemeConfig;
}
