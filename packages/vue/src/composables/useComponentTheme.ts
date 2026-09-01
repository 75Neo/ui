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
  type SlotsOf,
  type ThemeConfig,
  type ThemeOverrideOf,
  type TVSlot,
  applyThemeConfigs,
  applyThemeOverrides,
} from "@75neo/core";

const themeConfigKey: InjectionKey<ComputedRef<ThemeConfig>> = Symbol("75neo.theme-config");

export function provideTheme(theme: MaybeRefOrGetter<ThemeConfig>): ComputedRef<ThemeConfig> {
  const parent = useThemeConfig();
  const config = computed(() => {
    const own = toValue(theme);
    return parent ? applyThemeConfigs(parent.value, own) : own;
  });

  provide(themeConfigKey, config);
  return config;
}

export function useThemeConfig(): ComputedRef<ThemeConfig> | undefined {
  return inject(themeConfigKey, undefined);
}

export function useComponentTheme<K extends ComponentKey>(
  key: K,
  ui?: MaybeRefOrGetter<TVSlot<SlotsOf<K>> | undefined>,
): ComputedRef<ThemeOverrideOf<K>> {
  const config = useThemeConfig();
  return computed(() => applyThemeOverrides(config?.value[key] ?? {}, { ui: toValue(ui) }));
}
