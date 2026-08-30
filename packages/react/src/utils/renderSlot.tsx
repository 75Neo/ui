import type { ReactNode } from "react";

/**
 * The React counterpart of a Vue named slot: either static content, or a function of the
 * slot's scope bag. Every `Slot` prop here is named after the Vue slot it mirrors.
 */
export type Slot<Bag = void> = ReactNode | ((bag: Bag) => ReactNode);

/**
 * Mirrors `<slot name="x" v-bind="bag">fallback</slot>`: the fallback is used only when no
 * content was supplied at all, so an explicit `false` or `""` still renders nothing.
 */
export function renderSlot<Bag = void>(
  slot: Slot<Bag> | undefined,
  bag?: Bag,
  fallback?: ReactNode,
): ReactNode {
  if (slot == null) return fallback;
  if (typeof slot === "function") return (slot as (bag: Bag) => ReactNode)(bag as Bag);
  return slot;
}
