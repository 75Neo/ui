/**
 * Per-slot class overrides: any subset of a component's slots, each mapped to a class
 * string. This is the shape of a `ui` prop and of a theme override's `ui` field.
 *
 * @typeParam S - The component's slot union, so a misspelled slot is a type error.
 *
 * @example
 * ```ts
 * <Button ui={{ base: "rounded-full", label: "tracking-wide" }} />
 * ```
 */
export type TVSlot<S extends string> = Partial<Record<S, string>>;
