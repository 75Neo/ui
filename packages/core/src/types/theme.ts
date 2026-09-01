import type { TVSlot } from "./tv";

declare global {
  interface Neo75ComponentThemes {}
}
export type ComponentThemes = Neo75ComponentThemes;
export type ComponentKey = keyof ComponentThemes;

export interface ComponentContract<U extends string = string, P extends object = object> {
  slots: U;
  props: P;
}

export type SlotsOf<K extends ComponentKey> =
  ComponentThemes[K] extends ComponentContract<infer U, object> ? U : string;
export type PropsOf<K extends ComponentKey> =
  ComponentThemes[K] extends ComponentContract<string, infer P> ? P : object;

export type ThemeOverride<U extends string = string, P extends object = object> = {
  ui?: TVSlot<U>;
  props?: Partial<P>;
};

export type ThemeOverrideOf<K extends ComponentKey> = ThemeOverride<SlotsOf<K>, PropsOf<K>>;

export type ThemeConfig = {
  [K in ComponentKey]?: ThemeOverrideOf<K>;
};

/**
 * Compile-time assertion that `T` is empty.
 *
 * Component modules use it to turn "the recipe gained a variant, the props interface
 * did not" into a type error naming the variant that went missing. That check earns
 * its keep because `@vue/compiler-sfc` cannot derive props from a recipe, so every
 * component restates its variant props by hand and can drift from the recipe.
 */
export type MustBeNever<T extends never> = T;
