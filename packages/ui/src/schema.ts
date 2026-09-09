import { z } from "zod";

export const FRAMEWORKS = ["react", "vue"] as const;
export const ITEM_TYPES = ["registry:ui", "registry:lib", "registry:theme"] as const;

export const frameworkSchema = z.enum(FRAMEWORKS);
export const itemTypeSchema = z.enum(ITEM_TYPES);

const cssValueSchema: z.ZodType<CssValue> = z.lazy(() =>
  z.union([z.string(), z.record(z.string(), cssValueSchema)]),
);

export const cssBlockSchema = z.record(z.string(), cssValueSchema);

const FILE_PATH = /^registry\/(?:(?:react|vue)\/ui\/[^/]+|shared\/lib)\/[^/]+$/;

export const registryFilePathSchema = z.string().regex(FILE_PATH, {
  message:
    "must be registry/<framework>/ui/<item>/<file> or registry/shared/lib/<file>, so the installer knows where to put it",
});

export const registryFileSchema = z.object({
  path: registryFilePathSchema,
  type: itemTypeSchema,
  content: z.string(),
});

export const registryFileEntrySchema = registryFileSchema.omit({ content: true });

export const registryItemSchema = z
  .object({
    name: z.string().min(1),
    type: itemTypeSchema,
    title: z.string().optional(),
    description: z.string().optional(),
    dependencies: z.array(z.string()).optional(),
    registryDependencies: z.array(z.string()).optional(),
    css: cssBlockSchema.optional(),
    docs: z.string().optional(),
    files: z.array(registryFileSchema).optional(),
  })
  .refine((item) => item.type === "registry:theme" || (item.files?.length ?? 0) > 0, {
    message: "only a registry:theme item may ship without files",
    path: ["files"],
  })
  .refine((item) => item.type !== "registry:ui" || item.css === undefined, {
    message: "component CSS belongs in @75neo/ui, not in a registry item",
    path: ["css"],
  });

export const registryIndexEntrySchema = z.object({
  name: z.string().min(1),
  type: itemTypeSchema,
  title: z.string().optional(),
  description: z.string().optional(),
});

export const registryIndexSchema = z.object({
  name: z.string().min(1),
  homepage: z.string().optional(),
  items: z.array(registryIndexEntrySchema),
});

export const pathsSchema = z.object({ ui: z.string().min(1), lib: z.string().min(1) });

export const configSchema = z.object({
  framework: frameworkSchema,
  css: z.string().min(1),
  registry: z.string().min(1),
  paths: pathsSchema,
  aliases: pathsSchema,
});

export type CssValue = string | { [selector: string]: CssValue };
export type CssBlock = z.infer<typeof cssBlockSchema>;
export type Framework = z.infer<typeof frameworkSchema>;
export type ItemType = z.infer<typeof itemTypeSchema>;
export type RegistryFile = z.infer<typeof registryFileSchema>;
export type RegistryItem = z.infer<typeof registryItemSchema>;
export type RegistryIndex = z.infer<typeof registryIndexSchema>;
export type RegistryIndexEntry = z.infer<typeof registryIndexEntrySchema>;
export type Paths = z.infer<typeof pathsSchema>;
export type Aliases = Paths;
export type Config = z.infer<typeof configSchema>;

export class ValidationError extends Error {
  constructor(
    readonly source: string,
    readonly issues: readonly z.core.$ZodIssue[],
  ) {
    const detail = issues
      .map((issue) => {
        const location = issue.path.map(String).join(".");
        return location === "" ? issue.message : `${location}: ${issue.message}`;
      })
      .join("\n  ");
    super(`${source} is not valid:\n  ${detail}`);
    this.name = "ValidationError";
  }
}

export function validate<T>(schema: z.ZodType<T>, source: string, value: unknown): T {
  const result = schema.safeParse(value);
  if (!result.success) throw new ValidationError(source, result.error.issues);
  return result.data;
}

export function parseJson(source: string, text: string): unknown {
  try {
    return JSON.parse(text) as unknown;
  } catch (error) {
    throw new Error(`${source} is not valid JSON: ${(error as Error).message}`);
  }
}

export const jsonSchemas = () => ({
  "registry.json": z.toJSONSchema(registryIndexSchema, { io: "input" }),
  "registry-item.json": z.toJSONSchema(registryItemSchema, { io: "input" }),
});
