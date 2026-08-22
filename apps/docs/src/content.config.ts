import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

/**
 * The docs are markdown, loaded from `src/content/docs` by the glob loader. An entry's
 * `id` is its path below that directory without the extension, which is also its URL —
 * see `src/pages/[...slug].astro`.
 *
 * Adding a page is adding a file. Nothing else is registered anywhere.
 */
const docs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/docs" }),
  schema: z.object({
    /** Rendered as the page's `<h1>`, so the markdown body should not repeat it. */
    title: z.string(),
    /** Sidebar label, when the `<h1>` would read oddly there. Defaults to `title`. */
    navLabel: z.string().optional(),
    /** Rendered as the standfirst under the title, and as the page's meta description. */
    description: z.string(),
    /** Which group the page sits in, in the sidebar. */
    section: z.enum(["Guide", "Components"]),
    /** Sort order within the whole nav. */
    order: z.number(),
    /**
     * Appends a generated "Theme" section printing that component's real theme object,
     * read from `@75neo/styles` at build time. Markdown cannot import, and transcribing
     * the object by hand is exactly how docs drift out of step with the code.
     */
    theme: z.enum(["accordion", "button"]).optional(),
  }),
});

export const collections = { docs };
