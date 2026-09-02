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
 * provided above it. `Theme.vue` is the only caller -- everything else reaches the
 * theme through `useResolvedTheme`.
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
 * The whole cascade lives in `resolveTheme`; this reads the theme a `Theme` provided
 * and hands it over, re-running when either the theme or the component's props change.
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
