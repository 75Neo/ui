import {
  type ComputedRef,
  type InjectionKey,
  type MaybeRefOrGetter,
  computed,
  inject,
  provide,
  toValue,
} from "vue";
import {
  type ComponentKey,
  type PropsOf,
  type ResolvedTheme,
  type SlotsOf,
  type TVSlot,
  type ThemeConfig,
  type ThemeScope,
  createThemeScope,
  resolveTheme,
} from "@75neo/core";

const themeScopeKey: InjectionKey<ComputedRef<ThemeScope>> = Symbol("75neo.theme-scope");

/**
 * Opens a new theme scope below the one already in scope, if any. Each `<Theme>` provides its
 * own link in the chain and never mutates a shared store, so sibling subtrees stay independent
 * and a scope is only rebuilt when its own theme changes.
 */
export function provideThemeScope(theme: MaybeRefOrGetter<ThemeConfig>): ComputedRef<ThemeScope> {
  const parent = injectThemeScope();
  const scope = computed(() => createThemeScope(toValue(theme), parent?.value));

  provide(themeScopeKey, scope);
  return scope;
}

/** The nearest theme scope, or `undefined` outside any `<Theme>`. */
export function injectThemeScope(): ComputedRef<ThemeScope> | undefined {
  return inject(themeScopeKey, undefined);
}

/**
 * Resolves one component against the surrounding theme chain. The component's slot union and
 * themeable props are inferred from `key`, so `ui` is checked against that component's slots.
 */
export function useComponentTheme<K extends ComponentKey>(
  key: K,
  ui?: MaybeRefOrGetter<TVSlot<SlotsOf<K>> | undefined>,
): ComputedRef<ResolvedTheme<SlotsOf<K>, PropsOf<K>>> {
  const scope = injectThemeScope();
  return computed(() => resolveTheme(scope?.value, key, toValue(ui)));
}
