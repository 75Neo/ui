import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * Prose lives in Markdown; the API tables do not.
 *
 * @remarks
 * A component entry carries the writing a reader needs and the three coordinates
 * `componentApi` needs to find its source. Everything mechanical — props, types,
 * variant values, slot names — is read back out of `packages/*` at build time, so a
 * renamed prop cannot go stale here.
 */

const guides = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/guides" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const components = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/components" }),
  schema: z.object({
    /** Exported component name, the same in both adapters. */
    name: z.string(),
    /** Registry key, which is also the recipe export and the theme override key. */
    key: z.string(),
    /** File name of the component module under `packages/themes/src/components`. */
    module: z.string(),
    /** One line for the index — what the component is. */
    summary: z.string(),
  }),
});

export const collections = { guides, components };
