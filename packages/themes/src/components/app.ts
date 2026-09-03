import { tv, type VariantProps } from "tailwind-variants";
import type {
  ComponentContract,
  MustBeNever,
  ThemeConfig,
  ThemeOverride,
  TVSlot,
} from "@75neo/core";

/**
 * Recipe for the App: the element every other component sits inside.
 *
 * @remarks
 * `isolate` is the whole recipe, and it is here rather than left to the caller because
 * of what the App is for. It opens a stacking context, so the Header's `z-50` and the
 * Sidebar's `z-10` are ordered against each other and against nothing else on the page.
 * Anything that must escape the ordering is portalled to the body and is outside this
 * element to begin with, which is why a Dialog still covers a Header.
 *
 * No height is set. A page that wants one puts it on the Main, which is the component
 * that knows what the Header leaves behind.
 */
export const app = tv({
  slots: {
    base: "isolate",
  },
});

export type AppVariants = VariantProps<typeof app>;
export type AppSlots = keyof ReturnType<typeof app>;

export type AppUI = TVSlot<AppSlots>;

export type AppTheme = ThemeOverride<AppSlots, AppVariants>;

/**
 * The languages written right to left, by their two- and three-letter subtags.
 *
 * @remarks
 * Kept short on purpose: these are the ones with enough speakers that a component
 * library is likely to meet them, and the list matches the one zag-js uses internally
 * so the App and Ark agree about a given locale. `Intl.Locale`'s `getTextInfo` would
 * answer the same question from the platform, and is deliberately not used because it
 * reached browsers later than this library's own baseline and would answer differently
 * depending on where the page rendered.
 */
const rtlLanguages = new Set([
  "ar",
  "ckb",
  "dv",
  "fa",
  "ha",
  "he",
  "khw",
  "ks",
  "ku",
  "ps",
  "sd",
  "ug",
  "ur",
  "yi",
]);

/**
 * Which way a locale's text runs.
 *
 * @param locale - A BCP 47 tag such as `"en-US"` or `"ar-EG"`.
 * @returns `"rtl"` for a right-to-left language, `"ltr"` otherwise.
 *
 * @remarks
 * Both adapters call this, because both have to write the direction onto the DOM: Ark
 * derives its own from the locale and keeps it in context, where a `rtl:` utility
 * cannot see it. The `dir` attribute is what Tailwind reads, so the App sets it.
 */
export function localeDirection(locale: string): "ltr" | "rtl" {
  return rtlLanguages.has(locale.split("-")[0]?.toLowerCase() ?? "") ? "rtl" : "ltr";
}

/**
 * Everything an App accepts in both frameworks. Each adapter adds its own framework
 * props on top.
 *
 * @remarks
 * One of these wraps an application, and it does three things no component below it
 * can do for itself: it publishes a theme, it tells Ark which locale to format dates
 * and numbers in, and it writes the reading direction onto the DOM where the `rtl:`
 * utilities in every recipe can read it.
 *
 * It is not the same thing as `Theme`, and both exist. `Theme` restyles a subtree and
 * nests, so a section of a page can look different from the rest of it; the App is the
 * one at the top, and adds the locale and the direction that only make sense once.
 * An App with no `theme` publishes nothing and leaves any `Theme` above it alone.
 */
export interface AppProps {
  /** Per-slot class overrides. */
  ui?: AppUI;
  /**
   * Overrides for any subset of the installed components, published to everything
   * below. Keep the object stable: a fresh literal on every render re-folds the chain.
   */
  theme?: ThemeConfig;
  /**
   * The BCP 47 tag Ark formats dates and numbers with, and the one the reading
   * direction is derived from.
   *
   * @defaultValue `"en-US"`
   */
  locale?: string;
  /**
   * Overrides the direction the locale implies, for a page that mixes the two or that
   * has already decided elsewhere.
   */
  dir?: "ltr" | "rtl";
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type AppVariantsAreExposed = MustBeNever<Exclude<keyof AppVariants, keyof AppProps>>;

declare global {
  interface Neo75ComponentThemes {
    app: ComponentContract<AppSlots, AppVariants>;
  }
}
