import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { createComponentApiReader, registryComponentNames } from "../scripts/component-api";

const guides = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/guides" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
  }),
});

const components = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/components" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    registryItem: z.string(),
    installNote: z.string().optional(),
  }),
});

const apiProp = z.object({
  name: z.string(),
  type: z.string(),
  required: z.boolean(),
  default: z.string().optional(),
  description: z.string().optional(),
});

const apiMember = z.object({
  name: z.string(),
  type: z.string().optional(),
  description: z.string().optional(),
});

const componentApi = defineCollection({
  loader: {
    name: "component-api",
    load: async ({ store, parseData, generateDigest, logger }) => {
      const readComponentApi = createComponentApiReader();
      const names = registryComponentNames();

      store.clear();
      for (const name of names) {
        const data = await parseData({ id: name, data: { components: readComponentApi(name) } });
        store.set({ id: name, data, digest: generateDigest(data) });
      }

      logger.info(`Extracted the API of ${names.length} registry items`);
    },
  },
  schema: z.object({
    components: z.array(
      z.object({
        name: z.string(),
        react: z
          .object({
            file: z.string(),
            props: z.array(apiProp),
            inherits: z.array(z.string()),
          })
          .nullable(),
        vue: z
          .object({
            file: z.string(),
            props: z.array(apiProp),
            events: z.array(apiMember),
            slots: z.array(apiMember),
          })
          .nullable(),
      }),
    ),
  }),
});

export const collections = { guides, components, componentApi };
