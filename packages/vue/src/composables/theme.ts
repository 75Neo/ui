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
  type Recipe,
  type ResolvedTheme,
  type ThemeConfig,
  layerTheme,
  resolveTheme,
} from "@75neo/core";

const themeConfigKey: InjectionKey<ComputedRef<ThemeConfig>> = Symbol("75neo.theme-config");

/**
 * Publish a theme to every component below this one, folded onto any theme already
 * provided above it.
 *
 * @param theme - The theme to publish. Refs and getters are tracked.
 * @returns The folded theme, as provided to descendants.
 *
 * @remarks
 * `Theme.vue` is the only caller. Everything else reaches the theme through
 * `useResolvedTheme`.
 */
export function provideTheme(theme: MaybeRefOrGetter<ThemeConfig>): ComputedRef<ThemeConfig> {
  const parent = useThemeConfig();
  const config = computed(() => {
    const own = toValue(theme);
    return parent ? layerTheme(parent.value, own) : own;
  });

  provide(themeConfigKey, config);
  return config;
}

/** The theme provided above this component, or `undefined` if there is none. */
export function useThemeConfig(): ComputedRef<ThemeConfig> | undefined {
  return inject(themeConfigKey, undefined);
}

/**
 * Resolve a component's classes and variant props against the ambient theme.
 *
 * @param recipe - The component's recipe.
 * @param key - The component's registry name, such as `"button"`.
 * @param props - The props the caller passed, including its `ui`.
 * @param className - A call-site class string. It reaches the `base` slot only.
 * @returns One finished class string per slot, plus the variant props actually used.
 * It re-runs when the theme or the props change.
 *
 * @remarks
 * The cascade itself lives in `resolveTheme`.
 */
export function useResolvedTheme<R extends Recipe, K extends ComponentKey>(
  recipe: R,
  key: K,
  props: MaybeRefOrGetter<object>,
  className?: MaybeRefOrGetter<string | undefined>,
): ComputedRef<ResolvedTheme<R>> {
  const config = useThemeConfig();

  return computed(() =>
    resolveTheme(recipe, config?.value[key], toValue(props), toValue(className)),
  );
}
