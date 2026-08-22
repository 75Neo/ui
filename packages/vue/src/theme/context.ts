import { resolveTheme, type ThemeConfig, type ThemeName, type Themes } from "@75neo/styles";
import { computed, type ComputedRef, inject, type InjectionKey, provide } from "vue";

/**
 * A *getter* is provided rather than the config itself, so a provider whose `theme` prop
 * changes re-resolves the components below it. `resolveTheme` memoises on the config
 * object's identity, so reading it on every render costs a `WeakMap` lookup.
 */
type ThemeSource = () => ThemeConfig | null;

/** Exported for the plugin, which provides on the app rather than from a `setup`. */
export const themeKey: InjectionKey<ThemeSource> = Symbol("neo-ui-theme");

export const provideNeoUITheme = (theme: ThemeSource) => {
  provide(themeKey, theme);
};

/**
 * The theme a component should style itself with: the built-in one, or the app's
 * override merged over it if a provider or the plugin supplied one.
 */
export const useComponentTheme = <K extends ThemeName>(name: K): ComputedRef<Themes[K]> => {
  const source = inject(themeKey, null);

  return computed(() => resolveTheme(name, source?.()));
};
