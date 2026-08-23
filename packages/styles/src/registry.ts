import type { ClassValue, VariantProps } from "tailwind-variants";
import { accordion } from "./themes/accordion";
import { button } from "./themes/button";
import { tv } from "./tv";

/**
 * Every component theme in the system, by name.
 *
 * This is the registry an app overrides against: the keys here are exactly the keys of
 * {@link ThemeConfig}, so adding a component makes it themeable with no further wiring.
 */
export const themes = { accordion, button };

export type Themes = typeof themes;
export type ThemeName = keyof Themes;

/** The slot names of a component's theme — `"root" | "item" | …` for the accordion. */
export type SlotName<T extends Themes[ThemeName]> = keyof ReturnType<T> & string;

/**
 * A per-slot bag of classes. This is the shape of the `ui` prop every multi-part
 * component takes, and of the `slots` key in a theme override.
 */
export type SlotClasses<T extends Themes[ThemeName]> = Partial<Record<SlotName<T>, ClassValue>>;

/**
 * What an app may change about one component, mirroring the `tailwind-variants` config
 * it will be merged into.
 *
 * `slots` and `defaultVariants` are typed against the component's real slot and variant
 * names. `variants` and `compoundVariants` are typed loosely on purpose: an override is
 * allowed to introduce variant *values* the built-in theme has never heard of, and
 * pinning them to the built-in union would make that impossible.
 *
 * One trap the types cannot catch: a `compoundVariants` entry's `class` must be a string
 * or an object keyed by slot. `tailwind-variants` *silently ignores* an array there, so
 * `class: ["a", "b"]` type-checks, compiles and styles nothing. Write
 * `class: { base: ["a", "b"] }` instead.
 */
export interface ThemeOverride<K extends ThemeName> {
  slots?: SlotClasses<Themes[K]>;
  variants?: Record<string, Record<string, ClassValue | SlotClasses<Themes[K]>>>;
  compoundVariants?: Array<
    Record<string, unknown> & { class?: ClassValue | SlotClasses<Themes[K]> }
  >;
  defaultVariants?: Partial<VariantProps<Themes[K]>>;
}

/**
 * An app's theme, as passed to each framework's provider.
 *
 * ```ts
 * const theme: ThemeConfig = {
 *   button: {
 *     slots: { base: "rounded-full" },
 *     defaultVariants: { color: "neutral" },
 *   },
 * };
 * ```
 *
 * Overrides *merge*: the classes above are appended after the built-in ones, and
 * `tailwind-merge` drops whichever of the two loses — so `rounded-full` replaces the
 * size variant's `rounded-md` without the caller having to know it was there.
 */
export type ThemeConfig = { [K in ThemeName]?: ThemeOverride<K> };

/**
 * Two levels of memoisation, both keyed on the config object's identity.
 *
 * Rebuilding a theme means re-running `tv()` and re-resolving every class through
 * `tailwind-merge`, and a component asks for its theme on every render. Caching per
 * config object also keeps the returned theme referentially stable, which is what lets
 * React skip re-rendering the tree below a provider whose theme has not changed.
 */
const cache = new WeakMap<ThemeConfig, Partial<Record<ThemeName, unknown>>>();

/** `tv` is heavily overloaded; the registry hands it a config it has already validated. */
const build = tv as unknown as (options: Record<string, unknown>) => unknown;

/**
 * The built-in theme for `name`, with the app's override merged in if there is one.
 *
 * Returns the built-in theme itself when nothing overrides it, so the common case costs
 * one property read.
 */
export const resolveTheme = <K extends ThemeName>(
  name: K,
  config?: ThemeConfig | null,
): Themes[K] => {
  const override = config?.[name];

  if (!config || !override) {
    return themes[name];
  }

  let bucket = cache.get(config);

  if (!bucket) {
    bucket = {};
    cache.set(config, bucket);
  }

  const { slots, compoundVariants = [], ...rest } = override;

  return (bucket[name] ??= build({
    extend: themes[name],
    ...rest,
    /*
     * `slots` is carried as an unconditional compound variant rather than passed
     * through as `slots`.
     *
     * `tailwind-variants` resolves in the order base → slots → variants →
     * compoundVariants, so an override placed in `slots` would land *before* the
     * built-in variants and lose every conflict to them: `{ slots: { base:
     * "rounded-full" } }` would be beaten by the `size` variant's `rounded-md`. A
     * compound variant with no conditions always matches and is appended last, which
     * gives the word "override" its ordinary meaning.
     *
     * It also lines the two override paths up: the `ui` prop is applied at call time,
     * after everything, so it already wins. There is no reason for the app-wide form of
     * the same override to behave differently.
     *
     * The override's own `compoundVariants` come after, so a conditional override still
     * beats a blanket one.
     */
    compoundVariants: [...(slots ? [{ class: slots }] : []), ...compoundVariants],
  })) as Themes[K];
};
