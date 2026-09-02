import type { TVSlot } from "./tv";

declare global {
  /**
   * The registry of every themeable component, keyed by its registry name.
   *
   * Empty here on purpose: each component module in `@75neo/themes` augments this
   * interface with one entry, so `ThemeConfig` and everything derived from it grow a
   * key as soon as a component exists. That is what lets a `Theme` be checked against
   * the components actually installed, without `@75neo/core` knowing any of them.
   */
  interface Neo75ComponentThemes {}
}

/** Every themeable component, keyed by registry name. */
export type ComponentThemes = Neo75ComponentThemes;

/** The registry name of a themeable component, e.g. `"button"`. */
export type ComponentKey = keyof ComponentThemes;

/**
 * What a component tells the theme layer about itself: the slots it renders and the
 * variant props it accepts. One of these is registered per component.
 */
export interface ComponentContract<U extends string = string, P extends object = object> {
  slots: U;
  props: P;
}

/** The slot names a registered component declares. */
export type SlotsOf<K extends ComponentKey> =
  ComponentThemes[K] extends ComponentContract<infer U, object> ? U : string;

/** The variant props a registered component accepts. */
export type PropsOf<K extends ComponentKey> =
  ComponentThemes[K] extends ComponentContract<string, infer P> ? P : object;

/**
 * What one `Theme` layer says about one component: extra classes per slot, and new
 * defaults for its variant props.
 *
 * Both are partial. A layer states only what it changes; `resolveTheme` folds it into
 * whatever the layers above and below it said.
 */
export type ThemeOverride<U extends string = string, P extends object = object> = {
  ui?: TVSlot<U>;
  props?: Partial<P>;
};

/** `ThemeOverride` with the slots and props of a particular registered component. */
export type ThemeOverrideOf<K extends ComponentKey> = ThemeOverride<SlotsOf<K>, PropsOf<K>>;

/**
 * A whole `Theme`: an override for any subset of the registered components.
 *
 * Plain data with no functions or class instances, so a theme stays serializable and
 * safe to reuse across trees.
 */
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
