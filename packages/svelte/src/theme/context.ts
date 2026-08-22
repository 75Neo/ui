import { resolveTheme, type ThemeConfig, type ThemeName, type Themes } from "@75neo/styles";
import { getContext, setContext } from "svelte";

const key = Symbol("neo-ui-theme");

/**
 * A getter is stored rather than the config itself: `$derived`/`$props` state read
 * through a function stays reactive across the context boundary, whereas the snapshot
 * taken at `setContext` time would not be.
 */
export const setNeoUITheme = (theme: () => ThemeConfig | null) => {
  setContext(key, theme);
};

/**
 * The theme a component should style itself with: the built-in one, or the app's
 * override merged over it if a `<NeoUIProvider>` supplied one.
 *
 * Returns a getter for the same reason — call it inside a `$derived` and the component
 * re-styles when the provider's theme changes.
 */
export const useComponentTheme = <K extends ThemeName>(name: K): (() => Themes[K]) => {
  const source = getContext<(() => ThemeConfig | null) | undefined>(key);

  return () => resolveTheme(name, source?.());
};
