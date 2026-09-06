import {
  type InterfaceDeclaration,
  Project,
  type PropertySignature,
  SyntaxKind,
  type TypeNode,
} from "ts-morph";
import type { ComponentPart, ComponentSchema } from "@75neo/themes";
import * as themes from "@75neo/themes";

/**
 * Reads a component's public API out of the source rather than out of prose.
 *
 * @remarks
 * Three files describe one part and none of them repeats another. The shared
 * contract in `@75neo/themes` holds everything both frameworks agree on, and each
 * adapter adds the props only its framework can spell. So the API tables are three
 * extractions stitched together, not one.
 *
 * Variant props are the exception to reading types off the syntax. A contract writes
 * them as plain unions, but a boolean variant is declared as `boolean` with its
 * default living in the schema — so those are answered by the schema object instead,
 * which lists the values that actually resolve.
 */

/**
 * Where the library's sources are, handed down by `astro.config.mjs`.
 *
 * @remarks
 * Not derived from this file's own location, because this file is bundled into a chunk
 * under `dist` before it ever runs and would walk up from the wrong place.
 */
const root = __REPO_ROOT__;

/** One entry in a props table. */
export interface PropDoc {
  name: string;
  /** The written type, with the icon type parameter already resolved. */
  type: string;
  required: boolean;
  /** The JSDoc summary, as Markdown. */
  description: string;
  /** From a `@defaultValue` tag, or from the schema for a variant prop. */
  defaultValue?: string;
}

/** A named slot a Vue adapter exposes, with the scope it passes down. */
export interface SlotDoc {
  name: string;
  description: string;
  /** The scope object the slot receives, or undefined when it receives nothing. */
  scope?: string;
}

/** A root variant, with every value it accepts. */
export interface VariantDoc {
  name: string;
  values: string[];
  defaultValue?: string;
}

/** Everything the docs know about one anatomy part. */
export interface PartApi {
  /** Exported part name, such as `"AccordionItemTrigger"`. */
  name: string;
  /** Props both frameworks share, from the component module. */
  shared: PropDoc[];
  react: {
    /** Props only React can spell. */
    props: PropDoc[];
    /** The attribute types the props interface extends. */
    inherits: string[];
  };
  vue: {
    /** Props only Vue can spell. */
    props: PropDoc[];
    slots: SlotDoc[];
    /** `v-model` names the adapter declares, with `"modelValue"` written as `v-model`. */
    models: string[];
  };
}

/** Everything the docs know about one component. */
export interface ComponentApi {
  /** Exported root name, the same in both adapters. */
  name: string;
  /** Data-module key in `@75neo/themes`. */
  key: string;
  variants: VariantDoc[];
  parts: PartApi[];
}

const project = new Project({
  skipAddingFilesFromTsConfig: true,
  skipFileDependencyResolution: true,
});

/** Collapse a JSDoc block to one Markdown paragraph. */
function describe(node: { getJsDocs(): { getDescription(): string }[] }): string {
  const docs = node.getJsDocs();
  if (docs.length === 0) return "";

  return docs[0]!
    .getDescription()
    .trim()
    .replace(/\s*\n\s*/g, " ");
}

/** Read a `@defaultValue` tag, unwrapping the backticks the tag is written with. */
function taggedDefault(property: PropertySignature): string | undefined {
  for (const doc of property.getJsDocs()) {
    for (const tag of doc.getTags()) {
      if (tag.getTagName() !== "defaultValue") continue;
      const text = tag.getCommentText()?.trim();
      if (text) return text.replace(/^`|`$/g, "");
    }
  }

  return undefined;
}

/**
 * Render a type as a reader needs to see it.
 *
 * @param node - The written type node.
 * @param icon - What the framework calls an icon, substituted for the `F` parameter.
 *
 * @remarks
 * The written text is kept rather than the checker's expansion: `leadingIcon?: F`
 * is the answer to "what do I pass", and the icon type belongs to the framework.
 */
function readType(node: TypeNode | undefined, icon: string): string {
  if (!node) return "unknown";

  return node
    .getText()
    .replace(/\s*\n\s*/g, " ")
    .replace(/\bF\b/g, icon);
}

function readProperty(property: PropertySignature, icon: string): PropDoc {
  return {
    name: property.getName(),
    type: readType(property.getTypeNode(), icon),
    required: !property.hasQuestionToken(),
    description: describe(property),
    defaultValue: taggedDefault(property),
  };
}

/** Every property an interface declares itself, in source order. */
function readInterface(declaration: InterfaceDeclaration, icon: string): PropDoc[] {
  return declaration.getProperties().map((property) => readProperty(property, icon));
}

/**
 * Describe the root's variants from the schema object.
 *
 * @remarks
 * The schema is the honest answer to "what happens when I pass nothing": every
 * value that resolves, plus the default. It is imported, not extracted, because it
 * is already data.
 */
function readSchema(
  schema: Record<string, { values: readonly unknown[]; defaultValue: unknown }>,
): VariantDoc[] {
  return Object.entries(schema).map(([name, entry]) => ({
    name,
    values: entry.values.map((value) => String(value)),
    defaultValue: entry.defaultValue == null ? undefined : String(entry.defaultValue),
  }));
}

/**
 * Fill in a variant prop's type and default from the schema.
 *
 * @remarks
 * A boolean variant such as `block` is declared as `boolean` with its default living
 * in the schema. Both are worth answering from the one place that knows.
 */
function withVariant(prop: PropDoc, variants: VariantDoc[]): PropDoc {
  const variant = variants.find((candidate) => candidate.name === prop.name);
  if (!variant) return prop;

  const quoted = variant.values.map((value) => `"${value}"`).join(" | ");
  const isBoolean = variant.values.every((value) => value === "true" || value === "false");

  return {
    ...prop,
    type: isBoolean ? prop.type : quoted,
    defaultValue:
      prop.defaultValue ?? (variant.defaultValue && `"${variant.defaultValue}"`) ?? undefined,
  };
}

/**
 * One anatomy part: resolved out of the data module, never written out here.
 *
 * @remarks
 * Each data module describes itself (`<name>Schema` plus `<name>Parts`), the way
 * recipes described themselves with `variantKeys` and `slots`. The reader below is
 * fully generic: a new component needs no change here, only its module.
 */
function resolveComponent(key: string): { schema: ComponentSchema; parts: ComponentPart[] } {
  const exported = themes as Record<string, unknown>;
  const schema = exported[`${key}Schema`];
  const parts = exported[`${key}Parts`];

  if (!schema || typeof schema !== "object") {
    throw new Error(`@75neo/themes exports no schema object named "${key}Schema"`);
  }
  if (!Array.isArray(parts)) {
    throw new Error(`@75neo/themes exports no parts descriptor named "${key}Parts"`);
  }

  return { schema: schema as ComponentSchema, parts: parts as ComponentPart[] };
}

/** The shared contract, plus the schema that gives its variant props meaning. */
function readContract(module: string, contract: string | null, variants: VariantDoc[]) {
  if (!contract) return [];

  const source = project.addSourceFileAtPath(`${root}packages/themes/src/components/${module}.ts`);
  const declaration = source.getInterfaceOrThrow(contract);

  return readInterface(declaration, "Icon").map((prop) => withVariant(prop, variants));
}

/**
 * One adapter part's own half.
 *
 * @remarks
 * The heritage clauses are reported rather than expanded. "Everything a `<button>`
 * takes, minus `color`" is the useful sentence; four hundred attribute rows are not.
 */
function readReactPart(dir: string, file: string, name: string) {
  const source = project.addSourceFileAtPath(`${root}packages/react/src/${dir}/${file}.tsx`);
  const declaration = source.getInterfaceOrThrow(`${name}Props`);

  const inherits = declaration
    .getExtends()
    .map((clause) => clause.getText().replace(/\s*\n\s*/g, " "))
    .filter((text) => !/Contract\b/.test(text) && !text.startsWith(`${name}Props`));

  return { props: readInterface(declaration, "React.ReactNode"), inherits };
}

/** Lift the `<script setup>` block out of an SFC so ts-morph can parse it as TypeScript. */
function scriptSetup(dir: string, file: string): string {
  const path = `${root}packages/vue/src/${dir}/${file}.vue`;
  const sfc = project.getFileSystem().readFileSync(path);
  const block = /<script\s+setup[^>]*>([\s\S]*?)<\/script>/.exec(sfc);

  if (!block) throw new Error(`${file}.vue has no <script setup> block`);

  return block[1]!;
}

/** The type argument of a compiler macro such as `defineProps` or `defineSlots`. */
function macroTypeArgument(script: string, macro: string, name: string): TypeNode | undefined {
  const source = project.createSourceFile(`virtual/${name}.vue.ts`, script, { overwrite: true });

  for (const call of source.getDescendantsOfKind(SyntaxKind.CallExpression)) {
    if (call.getExpression().getText() !== macro) continue;

    return call.getTypeArguments()[0];
  }

  return undefined;
}

/**
 * The Vue adapter's own half.
 *
 * @remarks
 * `defineProps<Contract & { … }>()` is the shape every adapter uses, so the framework
 * props are exactly the members of the object literal beside the contract. The
 * intersection is read straight from the syntax, because `@vue/compiler-sfc` resolves
 * these the same way and a type the checker would expand is not what Vue sees.
 * `class` is universal machinery rather than a part prop, so it is not a table row.
 */
function readVuePart(dir: string, file: string) {
  const script = scriptSetup(dir, file);
  const props: PropDoc[] = [];

  const declared = macroTypeArgument(script, "defineProps", file);
  const members = declared?.isKind(SyntaxKind.IntersectionType)
    ? declared.getTypeNodes()
    : declared
      ? [declared]
      : [];

  for (const member of members) {
    if (!member.isKind(SyntaxKind.TypeLiteral)) continue;
    for (const property of member.getProperties()) {
      if (property.getName() === "class") continue;
      props.push(readProperty(property, "Component"));
    }
  }

  const slots: SlotDoc[] = [];
  const declaredSlots = macroTypeArgument(script, "defineSlots", `${file}.slots`);

  if (declaredSlots?.isKind(SyntaxKind.TypeLiteral)) {
    for (const property of declaredSlots.getProperties()) {
      const signature = property.getTypeNode()?.getText() ?? "";
      const scope = /\(\s*props\s*:\s*([\s\S]*)\)\s*=>/.exec(signature);

      slots.push({
        name: property.getName(),
        description: describe(property),
        scope: scope?.[1]?.trim().replace(/\s*\n\s*/g, " "),
      });
    }
  }

  const models = [...script.matchAll(/defineModel<[^>]*>\(\s*(?:"([^"]+)")?/g)].map((match) =>
    match[1] ? `v-model:${match[1]}` : "v-model",
  );

  return { props, slots, models };
}

/** What a documented component has to name so the sources can be found. */
export interface ComponentSource {
  /** Exported root name, such as `"Button"`. */
  name: string;
  /** Data-module key in `@75neo/themes`, such as `"button"`. */
  key: string;
  /** Component directory in each adapter and module in themes, such as `"button"`. */
  module: string;
}

/**
 * Read one component's API out of the files that describe it.
 *
 * @throws If a named file, interface or part is missing, which is the point: a
 * renamed export fails the docs build rather than quietly dropping a table.
 */
export function componentApi({ name, key, module }: ComponentSource): ComponentApi {
  const { schema, parts } = resolveComponent(key);
  const variants = readSchema(schema);

  return {
    name,
    key,
    variants,
    parts: parts.map((part) => ({
      name: part.export,
      shared: readContract(module, part.contract, variants),
      react: readReactPart(module, part.file, part.export),
      vue: readVuePart(module, part.file),
    })),
  };
}
