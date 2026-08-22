import type { ThemeConfig } from "@75neo/styles";
import type { Plugin } from "vue";
import { themeKey } from "./context";

export interface NeoUIOptions {
  /** Per-component class overrides, merged into the built-in themes. */
  theme?: ThemeConfig;
}

/**
 * Applies an app-wide theme to every 75NeoUI component.
 *
 * ```ts
 * app.use(createNeoUI({ theme: { button: { slots: { base: "rounded-full" } } } }));
 * ```
 *
 * Components work without it — the plugin is only needed to change their defaults.
 */
export const createNeoUI = (options: NeoUIOptions = {}): Plugin => ({
  install(app) {
    const theme = options.theme ?? null;

    // App-level `provide`, not the composable: `install` runs outside any `setup`.
    app.provide(themeKey, () => theme);
  },
});
