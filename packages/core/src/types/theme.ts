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

export type ThemeOverride<
  U extends string = string,
  P extends object = object,
> = {
  ui?: TVSlot<U>;
  props?: Partial<P>;
};

export type ThemeOverrideOf<K extends ComponentKey> =
  ThemeOverride<SlotsOf<K>, PropsOf<K>>;

export type ThemeConfig = {
  [K in ComponentKey]?: ThemeOverrideOf<K>;
};
