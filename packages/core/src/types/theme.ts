import type { TVSlot } from "./tv";

export type ThemeOverride<U extends string, P extends object> = {
  ui: TVSlot<U>;
  props: P;
};
