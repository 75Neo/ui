import type { ThemeConfig, ThemeOverride } from "../types/theme";
import type { TVSlot } from "../types/tv";
import { cn } from "tailwind-variants";
import { defu } from "defu";

/**
 * Layer one component's override onto another. Classes merge per slot, props are a
 * plain override. The inner layer wins either way.
 */
function layerOverride(outer: ThemeOverride, inner: ThemeOverride): ThemeOverride {
  const result: ThemeOverride = {};
  const props = defu(inner.props, outer.props);

  if (Object.keys(props).length > 0) result.props = props;

  if (outer.ui || inner.ui) {
    const ui: TVSlot<string> = { ...outer.ui };

    for (const slot of Object.keys(inner.ui ?? {})) {
      ui[slot] = cn(ui[slot], inner.ui?.[slot]);
    }

    result.ui = ui;
  }

  return result;
}

/**
 * Fold a nested theme onto the one it sits inside, producing one flat config.
 *
 * @param outer - The theme already in effect.
 * @param inner - The theme nested inside it, which wins on conflicts.
 * @returns A new config that shares no object with either input, so both stay safe to
 * reuse and to serialize.
 *
 * @remarks
 * Classes merge per slot and tailwind-merge settles conflicts, so the inner layer
 * replaces a conflicting utility and leaves the rest of the outer layer standing. The
 * `Theme` component calls this for you when it mounts.
 */
export function layerTheme(outer: ThemeConfig, inner: ThemeConfig): ThemeConfig {
  const base = outer as Record<string, ThemeOverride | undefined>;
  const overrides = inner as Record<string, ThemeOverride | undefined>;
  const result: Record<string, ThemeOverride | undefined> = {};

  for (const key of Object.keys(base)) {
    const override = base[key];
    if (override) result[key] = layerOverride(override, {});
  }

  for (const key of Object.keys(overrides)) {
    const override = overrides[key];
    if (override) result[key] = layerOverride(result[key] ?? {}, override);
  }

  return result as ThemeConfig;
}
