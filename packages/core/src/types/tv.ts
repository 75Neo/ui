/**
 * A per-slot class override: any subset of a component's slots, each mapped to a
 * class string.
 *
 * This is the shape of a `ui` prop and of a `ThemeOverride`'s `ui` field. `S` is the
 * component's slot union, so a typo in a slot name is a type error rather than a
 * silently ignored key.
 */
export type TVSlot<S extends string> = Partial<Record<S, string>>;
