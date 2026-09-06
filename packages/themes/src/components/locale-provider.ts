import type { ComponentPart, ComponentSchema } from "../schema";

/**
 * LocaleProvider styling data. Nothing here knows a framework.
 *
 * @remarks
 * One element wraps an application and does two things no component below it can do
 * for itself: it tells Ark which locale to format dates and numbers in, and it writes
 * the reading direction onto the DOM where every `rtl:` utility in the library can
 * read it. Ark keeps its own direction in context, where Tailwind cannot see it.
 *
 * `isolate` is the whole of the styling. It opens a stacking context, so the Header's
 * layer and the Sidebar's are ordered against each other and against nothing else on
 * the page. Anything that must escape the ordering is portalled to the body and is
 * outside this element to begin with, which is why a Dialog still covers a Header.
 *
 * No height is set. A page that wants one puts it on the Main, which is the component
 * that knows what the Header leaves behind.
 */

export const localeProviderDefaults = { locale: "en-US" } as const;

/** No design axes: the provider looks like nothing. */
export const localeProviderSchema = {} as const satisfies ComponentSchema;

export const localeProviderParts = [
  {
    export: "LocaleProvider",
    file: "locale-provider",
    contract: "LocaleProviderRootProps",
  },
] as const satisfies readonly ComponentPart[];

/**
 * The languages written right to left, by their two- and three-letter subtags.
 *
 * @remarks
 * Kept short on purpose: these are the ones with enough speakers that a component
 * library is likely to meet them, and the list matches the one zag-js uses internally
 * so this provider and Ark agree about a given locale. `Intl.Locale`'s `getTextInfo`
 * would answer the same question from the platform, and is deliberately not used
 * because it reached browsers later than this library's baseline and would answer
 * differently depending on where the page rendered.
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
 */
export function localeDirection(locale: string): "ltr" | "rtl" {
  return rtlLanguages.has(locale.split("-")[0]?.toLowerCase() ?? "") ? "rtl" : "ltr";
}

/** Everything the LocaleProvider accepts in both frameworks. */
export interface LocaleProviderRootProps {
  /**
   * The BCP 47 tag Ark formats dates and numbers with, and the one the reading
   * direction is derived from.
   *
   * @defaultValue `"en-US"`
   */
  locale?: string;
  /**
   * Overrides the direction the locale implies, for a page that mixes the two or has
   * already decided elsewhere.
   */
  dir?: "ltr" | "rtl";
}
