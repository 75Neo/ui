import type {
  ComponentKey,
  PropsOf,
  ResolvedComponentTheme,
  ResolvedTheme,
  SlotsOf,
  Theme,
  ThemeConfig,
  ThemeOverride,
  ThemeScope,
} from "../types/theme";
import type { TVClasses, TVSlot } from "../types/tv";

const EMPTY_THEME: ResolvedComponentTheme = {
  ui: new Map<string, readonly TVClasses[]>(),
  props: {},
};

/**
 * Applies one override layer to the classes resolved by every lower-priority layer: a string
 * replaces them outright, a function transforms them.
 */
export function applyTVClasses(classes: string, override: TVClasses | undefined): string {
  if (override === undefined) return classes;
  return typeof override === "function" ? override(classes) : override;
}

/**
 * Links a theme layer to the scope that encloses it. `parent` is the next `<Theme>` outwards.
 *
 * ```ts
 * createThemeScope({
 *   [ButtonKey]: { ui: { base: "p-2" }, props: { size: "lg" } },
 * });
 * ```
 *
 * Each entry is typed by the component its key belongs to, so slot names, prop names and prop
 * values all autocomplete and typo-check.
 *
 * A scope memoises what it resolves, so treat `theme` as immutable: mutating it in place will
 * not invalidate the cache. Passing a different theme object is the supported way to change a
 * scope, which is what both `<Theme>` implementations do.
 */
export function createThemeScope(theme: ThemeConfig, parent?: ThemeScope): ThemeScope {
  return { theme: theme as Theme, parent, cache: new Map<symbol, ResolvedComponentTheme>() };
}

/**
 * Merges the override chain for a single component, outermost scope first, and memoises it on
 * the scope. Only the requested key is ever touched, so a `<Theme>` carrying twenty component
 * overrides costs nothing for the nineteen a subtree never renders.
 */
function componentThemeFor(scope: ThemeScope, key: symbol): ResolvedComponentTheme {
  const cached = scope.cache.get(key);
  if (cached !== undefined) return cached;

  const parent = scope.parent ? componentThemeFor(scope.parent, key) : EMPTY_THEME;
  const own: ThemeOverride | undefined = scope.theme[key];

  let resolved: ResolvedComponentTheme;
  if (own === undefined) {
    resolved = parent;
  } else {
    const ui = new Map<string, readonly TVClasses[]>(parent.ui);
    if (own.ui) {
      for (const [slot, override] of Object.entries(own.ui as TVSlot)) {
        if (override === undefined) continue;
        const lower = ui.get(slot);
        ui.set(slot, lower ? [...lower, override] : [override]);
      }
    }

    const props: Record<string, unknown> = { ...parent.props };
    if (own.props) {
      for (const [name, value] of Object.entries(own.props as Record<string, unknown>)) {
        if (value !== undefined) props[name] = value;
      }
    }

    resolved = { ui, props: Object.freeze(props) };
  }

  scope.cache.set(key, resolved);
  return resolved;
}

/**
 * Resolves one component against the theme chain it is rendered in.
 *
 * Class layers are applied lowest priority first — component default, then each `<Theme>` from
 * the outermost inwards, then the component's own `ui` prop — so a functional override always
 * sees what the layers beneath it produced. Theme props are merged with the nearest scope
 * winning; the caller is responsible for letting explicit props win over `props`.
 */
export function resolveTheme<K extends ComponentKey>(
  scope: ThemeScope | undefined,
  key: K,
  ui?: TVSlot<SlotsOf<K>>,
): ResolvedTheme<SlotsOf<K>, PropsOf<K>> {
  const resolved = scope ? componentThemeFor(scope, key) : EMPTY_THEME;

  return {
    props: resolved.props as Partial<PropsOf<K>>,
    class(slot: SlotsOf<K>, classes: string): string {
      let out = classes;
      const layers = resolved.ui.get(slot);
      if (layers) {
        for (const layer of layers) out = applyTVClasses(out, layer);
      }
      return applyTVClasses(out, ui?.[slot]);
    },
  };
}
