import type { ThemeConfig } from "@75neo/styles";
import { defineComponent, type Plugin, type PropType } from "vue";
import { provideNeoUITheme, themeKey } from "./context";

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

/**
 * The same thing scoped to a subtree, for apps that theme one section differently or
 * that would rather not install a plugin.
 */
export const NeoUIProvider = defineComponent({
  name: "NeoUIProvider",
  props: {
    theme: { type: Object as PropType<ThemeConfig>, default: undefined },
  },
  setup(props, { slots }) {
    provideNeoUITheme(() => props.theme ?? null);

    return () => slots.default?.();
  },
});
