import { z } from "zod";

export const FRAMEWORKS = ["react", "vue"] as const;
export const ITEM_TYPES = ["registry:ui", "registry:lib", "registry:theme"] as const;

export const frameworkSchema = z.enum(FRAMEWORKS).meta({
  title: "Framework",
  description: "Framework the registry item or project targets.",
});

export const itemTypeSchema = z.enum(ITEM_TYPES).meta({
  title: "Registry item type",
  description: "Kind of registry item. Only theme items may ship without files.",
});

const cssValueSchema: z.ZodType<CssValue> = z.lazy(() =>
  z.union([z.string(), z.record(z.string(), cssValueSchema)]),
);

export const cssBlockSchema = z.record(z.string(), cssValueSchema).meta({
  title: "CSS block",
  description: "Nested CSS declarations keyed by selector, Variable, or at-rule.",
});

const FILE_PATH = /^registry\/(?:(?:react|vue)\/ui\/[^/]+|shared\/lib)\/[^/]+$/;

export const registryFilePathSchema = z
  .string()
  .regex(FILE_PATH, {
    message:
      "must be registry/<framework>/ui/<item>/<file> or registry/shared/lib/<file>, so the installer knows where to put it",
  })
  .describe("Source path in the registry repo layout.");

export const registryFileSchema = z
  .object({
    path: registryFilePathSchema,
    type: itemTypeSchema.describe("Kind of file payload."),
    content: z.string().describe("File content to write into the consumer project."),
  })
  .meta({ title: "Registry file", description: "A single published file with content." });

export const registryFileEntrySchema = registryFileSchema.omit({ content: true }).meta({
  title: "Registry file entry",
  description: "Authoring form of a registry file, without content.",
});

const itemBase = {
  $schema: z
    .string()
    .optional()
    .describe('Optional JSON Schema pointer, e.g. "./registry-item.json".'),
  name: z.string().min(1).describe("Machine name of the item, e.g. button."),
  title: z.string().optional().describe("Human-readable title."),
  description: z.string().optional().describe("Short description shown by the list command."),
  dependencies: z.array(z.string()).optional().describe("npm packages the consumer must install."),
  registryDependencies: z
    .array(z.string())
    .optional()
    .describe("Other registry items required first, e.g. @75neo/theme."),
  docs: z.string().optional().describe("Usage notes for the item."),
};

export const uiItemSchema = z
  .object({
    ...itemBase,
    type: z.literal("registry:ui").describe("UI component item."),
    files: z
      .array(registryFileSchema)
      .min(1, "only a registry:theme item may ship without files")
      .describe("Component files to copy. At least one is required."),
    css: z.never().optional().describe("Must not be present: component CSS belongs in @75neo/ui."),
  })
  .meta({ title: "UI registry item", description: "A component. Files required, css forbidden." });

export const libItemSchema = z
  .object({
    ...itemBase,
    type: z.literal("registry:lib").describe("Shared library item."),
    files: z
      .array(registryFileSchema)
      .min(1, "only a registry:theme item may ship without files")
      .describe("Library files to copy. At least one is required."),
    css: cssBlockSchema.optional().describe("Optional CSS tokens shipped with the item."),
  })
  .meta({ title: "Library registry item", description: "Shared code. Files required." });

export const themeItemSchema = z
  .object({
    ...itemBase,
    type: z.literal("registry:theme").describe("Theme token item."),
    files: z
      .array(registryFileSchema)
      .optional()
      .describe("Theme items usually ship CSS only and no files."),
    css: cssBlockSchema.optional().describe("Theme tokens injected into the CSS entry."),
  })
  .meta({ title: "Theme registry item", description: "Design tokens. May ship without files." });

export const registryItemSchema = z
  .discriminatedUnion("type", [uiItemSchema, libItemSchema, themeItemSchema])
  .meta({
    title: "Registry item",
    description: "A published registry item with file contents.",
  });

export const registryMetaSchema = z
  .object({
    $schema: z
      .string()
      .optional()
      .describe('Optional JSON Schema pointer, e.g. "./registry-meta.json".'),
    type: itemTypeSchema,
    title: z.string().optional().describe("Human-readable title."),
    description: z.string().optional().describe("Short description shown by the list command."),
    dependencies: z
      .array(z.string())
      .optional()
      .describe("npm packages, {framework} and {icons} placeholders allowed when authoring."),
    registryDependencies: z.array(z.string()).optional(),
    css: cssBlockSchema.optional().describe("Theme tokens (usually theme items only)."),
    cssVars: z
      .record(z.string(), z.record(z.string(), z.string()))
      .optional()
      .describe("Legacy authoring input compiled into the docs stylesheet, not published."),
    docs: z.string().optional(),
    files: z
      .array(registryFileEntrySchema)
      .optional()
      .describe("Explicit file list. Omit to auto-discover from the component folders."),
  })
  .meta({
    title: "Registry meta",
    description: "Authoring form of registry/meta/*.json. No name or content on disk.",
  });

export const registryIndexEntrySchema = z
  .object({
    name: z.string().min(1),
    type: itemTypeSchema,
    title: z.string().optional(),
    description: z.string().optional(),
  })
  .meta({ title: "Registry index entry", description: "Minimal pointer listed in the index." });

export const registryIndexSchema = z
  .object({
    $schema: z
      .string()
      .optional()
      .describe('Optional JSON Schema pointer, e.g. "./registry.json".'),
    name: z.string().min(1).describe("Registry name."),
    homepage: z.string().optional().describe("Registry homepage URL."),
    items: z.array(registryIndexEntrySchema).describe("Items in the registry."),
  })
  .meta({ title: "Registry index", description: "Framework registry manifest." });

export const pathsSchema = z
  .object({
    ui: z.string().min(1).describe("Directory for UI components."),
    lib: z.string().min(1).describe("Directory for shared lib files."),
  })
  .meta({ title: "Paths", description: "Install locations relative to the project root." });

export const configSchema = z
  .object({
    $schema: z.string().optional().describe('Optional JSON Schema pointer, e.g. "./75neoui.json".'),
    framework: frameworkSchema,
    css: z.string().min(1).describe("Path to the Tailwind entry stylesheet."),
    registry: z.string().min(1).describe("Registry base URL or local directory."),
    paths: pathsSchema,
    aliases: pathsSchema.describe("Import aliases matching paths."),
  })
  .meta({ title: "75neoui config", description: "Project configuration written by init." });

export type CssValue = string | { [selector: string]: CssValue };
export type CssBlock = z.infer<typeof cssBlockSchema>;
export type Framework = z.infer<typeof frameworkSchema>;
export type ItemType = z.infer<typeof itemTypeSchema>;
export type RegistryFile = z.infer<typeof registryFileSchema>;
export type UiRegistryItem = z.infer<typeof uiItemSchema>;
export type LibRegistryItem = z.infer<typeof libItemSchema>;
export type ThemeRegistryItem = z.infer<typeof themeItemSchema>;
export type RegistryItem = z.infer<typeof registryItemSchema>;
export type RegistryMeta = z.infer<typeof registryMetaSchema>;
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

const withId = (schema: Record<string, unknown>, id: string): Record<string, unknown> => ({
  $id: id,
  ...schema,
});

export const jsonSchemas = (): Record<string, Record<string, unknown>> => ({
  "registry.json": withId(z.toJSONSchema(registryIndexSchema, { io: "input" }), "./registry.json"),
  "registry-item.json": withId(
    z.toJSONSchema(registryItemSchema, { io: "input" }),
    "./registry-item.json",
  ),
  "registry-meta.json": withId(
    z.toJSONSchema(registryMetaSchema, { io: "input" }),
    "./registry-meta.json",
  ),
  "75neoui.json": withId(z.toJSONSchema(configSchema, { io: "input" }), "./75neoui.json"),
});
