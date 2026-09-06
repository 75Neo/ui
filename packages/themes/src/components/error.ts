import { byColor, componentColors, type ComponentColor } from "../colors";
import type { ComponentPart, ComponentSchema } from "../schema";
import { mainHeightClass } from "./main";

/**
 * Error styling data: plain class strings both adapters feed into their own `cva`
 * calls, one per part. Nothing here knows a framework.
 *
 * @remarks
 * It fills what the Header leaves, from the same token the Main uses, so a 404 sitting
 * under a bar is centred in the space below it rather than in the viewport. Nothing
 * here assumes a Header exists: with none, the region is the full viewport less a
 * bar's worth of height, which is close enough that the page still reads as centred.
 *
 * The colour reaches the status code and the icon above it, and nothing else. The
 * status message and the body stay in the text tokens, because an error page is
 * already loud and colouring the sentence people are meant to read makes it harder.
 * `error` is not the default: a 404 is not a failure, and a caller who wants the page
 * to look like one asks for it.
 */

export type ErrorColor = ComponentColor;

/** What the root publishes and every part reads. Lives in each adapter. */
export interface ErrorVariants {
  color: ErrorColor;
}

export const errorDefaults = { color: "primary" } as const;

export const errorSchema = {
  color: { values: componentColors, defaultValue: "primary" },
} as const satisfies ComponentSchema;

export const errorParts = [
  { export: "Error", file: "error", contract: "ErrorRootProps" },
  { export: "ErrorIcon", file: "icon", contract: null },
  { export: "ErrorStatusCode", file: "status-code", contract: null },
  { export: "ErrorStatusMessage", file: "status-message", contract: null },
  { export: "ErrorMessage", file: "message", contract: null },
  { export: "ErrorLinks", file: "links", contract: null },
] as const satisfies readonly ComponentPart[];

/** The viewport less the header, centred. Shared with the Main. */
export const errorRootClass = `flex ${mainHeightClass} flex-col items-center justify-center px-5 text-center`;

export const errorColorData = {
  icon: {
    ...byColor((color) => `text-${color}`),
    neutral: "text-highlighted",
  },
  statusCode: {
    ...byColor((color) => `text-${color}`),
    neutral: "text-highlighted",
  },
} as const satisfies Record<string, Record<ErrorColor, string>>;

/**
 * Everything the Error root accepts in both frameworks.
 *
 * @typeParam F - However the framework spells an icon.
 *
 * @remarks
 * The three pieces of text are props rather than parts' children, because they are
 * strings in every case this component was written for: a status code, the phrase that
 * goes with it, and whatever the server said. Each row disappears when its prop is
 * absent, so the same component serves a bare 404 and a full stack of detail.
 *
 * There is no button, and no prop to draw one. Nuxt UI's Error can offer to clear the
 * error because it runs inside a framework that owns the router; this one has no
 * router, so the links are the caller's and go in the part named for them.
 */
export interface ErrorRootProps<F> {
  color?: ErrorColor;
  /** Drawn above the status code, usually a warning glyph. */
  icon?: F;
  /** The HTTP status, such as `404`. */
  statusCode?: number | string;
  /** The phrase that goes with the status, such as `"Page not found"`. */
  statusMessage?: string;
  /**
   * What actually happened, in a sentence. Skipped when it merely repeats the status
   * message, so a server that sends the same string twice renders one line.
   */
  message?: string;
}
