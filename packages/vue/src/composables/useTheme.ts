import { type InjectionKey, type Ref, computed, inject, provide } from "vue";
import { defu } from "defu";
import type { ThemeUI } from "@75neo/core";

export interface ThemeContext {
  ui: Ref<ThemeUI>;
}

const themeKey: InjectionKey<ThemeContext> = Symbol("75neo-theme");

const defaultContext: ThemeContext = {
  ui: computed(() => ({})),
};

export function provideThemeContext(ui: Ref<ThemeUI>): ThemeContext {
  const parent = injectThemeContext();
  const merged = computed(() => defu(ui.value, parent.ui.value) as ThemeUI);

  const ctx: ThemeContext = { ui: merged };
  provide(themeKey, ctx);
  return ctx;
}

export function injectThemeContext(): ThemeContext {
  return inject(themeKey, defaultContext);
}
