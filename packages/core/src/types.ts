export type SlotClass = string | ((classes: string) => string);

export type ComponentUI = Record<string, SlotClass>;

export type ThemeUI = {
  [component: string]: ComponentUI | undefined;
};

/**
 * Resolves to `Slots` when the declared slot union matches the theme's slots, and to a
 * `__slotDrift` marker otherwise — which fails the typecheck at every use site, because a
 * non-string can't key a `Partial<Record<…, SlotClass>>`.
 *
 * Each contract spells its slot union out by hand so it reads well on hover and in the
 * generated types; this guard is what stops that copy from drifting away from the theme.
 * `tailwind-variants` adds a synthetic `base` key to every slotted theme, so `base` is
 * allowed to be absent from the declared union (Button is the one component that names a
 * real slot `base`).
 */
export type AssertSlots<Slots extends string, ThemeKeys extends string> = [Slots] extends [
  ThemeKeys,
]
  ? [Exclude<ThemeKeys, "base">] extends [Slots]
    ? Slots
    : {
        __slotDrift: "theme slot is missing from the declared union";
        missing: Exclude<Exclude<ThemeKeys, "base">, Slots>;
      }
  : { __slotDrift: "declared slot is missing from the theme"; missing: Exclude<Slots, ThemeKeys> };
