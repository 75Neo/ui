import type { TVSlot } from "./tv";

declare global {
  /**
   * The registry of every themeable component, keyed by registry name.
   *
   * @remarks
   * Empty here on purpose. Each component module in `@75neo/themes` augments this
   * interface with one entry, so a `Theme` is type-checked against the components you
   * actually installed.
   */
  interface Neo75ComponentThemes {}
}

/** Every themeable component, keyed by registry name. */
export type ComponentThemes = Neo75ComponentThemes;

/** The registry name of a themeable component, such as `"button"`. */
export type ComponentKey = keyof ComponentThemes;

/** What a component tells the theme layer about itself. One is registered per component. */
export interface ComponentContract<U extends string = string, P extends object = object> {
  /** The slot names the component renders. */
  slots: U;
  /** The variant props the component accepts. */
  props: P;
}

/** The slot names a registered component declares. */
export type SlotsOf<K extends ComponentKey> =
  ComponentThemes[K] extends ComponentContract<infer U, object> ? U : string;

/** The variant props a registered component accepts. */
export type PropsOf<K extends ComponentKey> =
  ComponentThemes[K] extends ComponentContract<string, infer P> ? P : object;

/**
 * What one theme layer says about one component. Both fields are partial: state only
 * what you want to change.
 */
export type ThemeOverride<U extends string = string, P extends object = object> = {
  /** Extra classes, per slot. */
  ui?: TVSlot<U>;
  /** New defaults for the component's variant props. */
  props?: Partial<P>;
};

/** {@link ThemeOverride} for one particular registered component. */
export type ThemeOverrideOf<K extends ComponentKey> = ThemeOverride<SlotsOf<K>, PropsOf<K>>;

/**
 * A whole theme: an override for any subset of the registered components.
 *
 * @remarks
 * Plain data with no functions or class instances, so a theme stays serializable and
 * safe to reuse across trees.
 *
 * @example
 * ```ts
 * const theme: ThemeConfig = {
 *   button: { ui: { base: "rounded-full" }, props: { color: "neutral" } },
 * };
 * ```
 */
export type ThemeConfig = {
  [K in ComponentKey]?: ThemeOverrideOf<K>;
};

/**
 * Compile-time assertion that `T` is empty.
 *
 * @remarks
 * Component modules use it to turn "the recipe gained a variant, the props interface
 * did not" into a type error naming the missing variant.
 */
export type MustBeNever<T extends never> = T;
