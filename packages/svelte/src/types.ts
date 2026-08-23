import type { Component } from "svelte";

/**
 * Any component that renders an icon — a Lucide one, or your own.
 *
 * Typed by the three attributes the components hand it rather than by the whole of
 * `SVGAttributes`: several of those are `string | null` where Lucide's own props are
 * `string`, and a component's props are checked contravariantly, so the wider type
 * would make every Lucide icon unassignable.
 */
export type IconComponent = Component<{
  class?: string;
  "aria-hidden"?: "true";
  focusable?: "false";
}>;
