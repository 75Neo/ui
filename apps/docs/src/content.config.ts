import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * Prose lives in Markdown; the API tables do not. An entry carries the writing and the
 * three coordinates `componentApi` needs to find the source. Props, types, variant
 * values and slot names are read out of `packages/*` at build time.
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
