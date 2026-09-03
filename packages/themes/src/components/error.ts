import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentContract, MustBeNever, ThemeOverride, TVSlot } from "@75neo/core";
import { byColor } from "../colors";

/**
 * Recipe for the Error: the page shown when there is nothing else to show.
 *
 * @remarks
 * It fills what the Header leaves, the same way the Main does and from the same token,
 * so a 404 sitting under a bar is centred in the space below it rather than in the
 * viewport. Nothing here assumes a Header exists: with none, the region is the full
 * viewport less a bar's worth of height, which is close enough that a page with no
 * Header still reads as centred.
 *
 * The color variant reaches the status code and the icon above it, and nothing else.
 * The status message and the body stay in the text tokens, because an error page is
 * already loud and colouring the sentence people are meant to read makes it harder,
 * not easier. `error` is not the default: a 404 is not a failure, and a caller who
 * wants the page to look like one asks for it.
 *
 * `text-balance` on the two headings and `text-pretty` on the body, so a short sentence
 * breaks across lines evenly instead of leaving one word alone underneath.
 */
export const error = tv({
  slots: {
    base: "flex min-h-[calc(100dvh-var(--ui-header-height))] flex-col items-center justify-center px-5 text-center",
    leading: "mb-4 flex items-center justify-center",
    leadingIcon: "size-10 shrink-0 [&>svg]:size-full",
    statusCode: "text-base font-semibold",
    statusMessage: "mt-2 text-4xl font-bold text-balance text-highlighted sm:text-5xl",
    message: "mt-4 text-lg text-pretty text-muted",
    links: "mt-8 flex flex-wrap items-center justify-center gap-3",
  },
  variants: {
    color: {
      ...byColor((color) => ({
        leadingIcon: `text-${color}`,
        statusCode: `text-${color}`,
      })),
      neutral: {
        leadingIcon: "text-highlighted",
        statusCode: "text-highlighted",
      },
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

export type ErrorVariants = VariantProps<typeof error>;
export type ErrorSlots = keyof ReturnType<typeof error>;

export type ErrorUI = TVSlot<ErrorSlots>;

export type ErrorTheme = ThemeOverride<ErrorSlots, ErrorVariants>;

/**
 * Everything an Error accepts in both frameworks. Each adapter adds its own framework
 * props on top.
 *
 * @typeParam F - However the framework spells an icon: `ReactNode` in React,
 * `Component` in Vue.
 *
 * @remarks
 * The three pieces of text are props rather than slots, because they are strings in
 * every case this component was written for: a status code, the phrase that goes with
 * it, and whatever the server said. Each row disappears when its prop is absent, so the
 * same component serves a bare 404 and a full stack of detail.
 *
 * There is no button, and no `clear` prop to draw one. Nuxt UI's Error can offer to
 * clear the error because it is running inside a framework that owns the router and
 * knows what clearing means; this one has no router, so the links are the caller's and
 * go in the region named for them. That is the only real difference between the two.
 */
export interface ErrorProps<F> {
  /** Per-slot class overrides. */
  ui?: ErrorUI;
  color?: ErrorVariants["color"];
  /** Drawn above the status code, usually a warning glyph. */
  icon?: F;
  /** The HTTP status, such as `404`. */
  statusCode?: number | string;
  /** The phrase that goes with the status, such as `"Page not found"`. */
  statusMessage?: string;
  /**
   * What actually happened, in a sentence. Skipped when it merely repeats
   * `statusMessage`, so a server that sends the same string twice renders one line.
   */
  message?: string;
}

/** Compile-time guard: a recipe variant with no matching prop above is a type error. */
export type ErrorVariantsAreExposed = MustBeNever<
  Exclude<keyof ErrorVariants, keyof ErrorProps<unknown>>
>;

declare global {
  interface Neo75ComponentThemes {
    error: ComponentContract<ErrorSlots, ErrorVariants>;
  }
}
