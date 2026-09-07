import { globSync } from "node:fs";
import path from "node:path";
import {
  Node,
  Project,
  SymbolFlags,
  ts,
  type InterfaceDeclaration,
  type Symbol,
  type Type,
} from "ts-morph";
import { createChecker, type PropertyMeta } from "vue-component-meta";

const TSCONFIG = "tsconfig.json";
const REACT_DIR = "registry/react/ui";
const VUE_DIR = "registry/vue/ui";
const HOST_TYPE_SOURCES = ["@types/react", "node_modules/react/", "node_modules/csstype"];
const SCHEMA_IGNORE = ["ClassValue", "TocItem", "HTMLElement", "ScrollBehavior"];

export interface ApiProp {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description?: string;
}

export interface ApiMember {
  name: string;
  type?: string;
  description?: string;
}

export interface ReactApi {
  file: string;
  props: ApiProp[];
  inherits: string[];
}

export interface VueApi {
  file: string;
  props: ApiProp[];
  events: ApiMember[];
  slots: ApiMember[];
}

export interface ComponentApi {
  name: string;
  react: ReactApi | null;
  vue: VueApi | null;
}

const toPosix = (file: string) => file.split(path.sep).join("/");
const isHostType = (file: string) => HOST_TYPE_SOURCES.some((source) => file.includes(source));
const pascal = (name: string) =>
  name.replace(/(^|-)([a-z])/g, (_, __, letter) => letter.toUpperCase());

const stripUndefined = (text: string) =>
  text
    .replace(/^undefined \| /, "")
    .replace(/ \| undefined$/, "")
    .trim();

function componentNames(registryName: string) {
  const react = globSync(`${REACT_DIR}/${registryName}/*.tsx`).map((file) =>
    path.basename(String(file), ".tsx"),
  );
  const vue = globSync(`${VUE_DIR}/${registryName}/*.vue`).map((file) =>
    path.basename(String(file), ".vue"),
  );
  const root = pascal(registryName);

  return [...new Set([...react, ...vue])].sort((a, b) => {
    if (a === root) return -1;
    if (b === root) return 1;
    return a.localeCompare(b);
  });
}

function literalUnion(type: Type) {
  if (!type.isUnion()) return null;

  const members = type
    .getUnionTypes()
    .filter((member) => !member.isUndefined() && !member.isNull());
  if (members.length < 2 || !members.every((member) => member.isLiteral())) return null;
  if (members.every((member) => member.isBooleanLiteral())) return "boolean";

  return [...new Set(members.map((member) => member.getText()))].join(" | ");
}

function reactTypeText(symbol: Symbol, node: InterfaceDeclaration) {
  const type = symbol.getTypeAtLocation(node);

  const expanded = literalUnion(type);
  if (expanded) return stripUndefined(expanded);

  const declared = symbol.getDeclarations()[0];
  const declaredType =
    declared && (Node.isPropertySignature(declared) || Node.isPropertyDeclaration(declared))
      ? declared.getTypeNode()
      : undefined;
  if (declaredType) return stripUndefined(declaredType.getText());

  return stripUndefined(type.getText(node, ts.TypeFormatFlags.NoTruncation));
}

function vueTypeText(prop: PropertyMeta) {
  const schema = prop.schema;
  const members =
    typeof schema === "object" && schema.kind === "enum"
      ? schema.schema?.filter(
          (entry): entry is string => typeof entry === "string" && entry !== "undefined",
        )
      : undefined;

  const isLiteral = (entry: string) => /^["'`\d]|^(true|false|null)$/.test(entry);
  if (members && members.length > 1 && members.every(isLiteral)) {
    if ([...members].sort().join(" | ") === "false | true") return "boolean";
    return stripUndefined(members.join(" | "));
  }

  return stripUndefined(prop.type);
}

function jsDocs(symbol: Symbol) {
  const declaration = symbol.getDeclarations()[0];
  return declaration && Node.isJSDocable(declaration) ? declaration.getJsDocs() : [];
}

function description(symbol: Symbol) {
  return jsDocs(symbol)
    .map((doc) => doc.getCommentText()?.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join(" ");
}

function documentedDefault(symbol: Symbol) {
  const tag = jsDocs(symbol)
    .flatMap((doc) => doc.getTags())
    .find((entry) => entry.getTagName() === "default");

  return tag?.getCommentText()?.trim() || undefined;
}

function reactDefaults(project: Project, filePath: string) {
  const sourceFile = project.getSourceFile(filePath);
  const parameter = sourceFile?.getFunction((fn) => fn.isDefaultExport())?.getParameters()[0];
  const binding = parameter?.getNameNode();

  const defaults: Record<string, string> = {};
  if (!binding || !ts.isObjectBindingPattern(binding.compilerNode)) return defaults;

  for (const element of binding.compilerNode.elements) {
    if (element.initializer && ts.isIdentifier(element.name)) {
      defaults[element.name.text] = element.initializer.getText();
    }
  }
  return defaults;
}

function reactApi(project: Project, registryName: string, componentName: string): ReactApi | null {
  const filePath = `${REACT_DIR}/${registryName}/${componentName}.tsx`;
  const sourceFile = project.getSourceFile(filePath);
  if (!sourceFile) return null;

  const propsInterface = sourceFile.getInterface(`${componentName}Props`);
  if (!propsInterface) return { file: toPosix(filePath), props: [], inherits: [] };

  const defaults = reactDefaults(project, filePath);
  const props = propsInterface
    .getType()
    .getProperties()
    .filter((symbol) =>
      symbol.getDeclarations().every((d) => !isHostType(d.getSourceFile().getFilePath())),
    )
    .map((symbol) => ({
      name: symbol.getName(),
      type: reactTypeText(symbol, propsInterface),
      required: !symbol.hasFlags(SymbolFlags.Optional),
      default: defaults[symbol.getName()] ?? documentedDefault(symbol),
      description: description(symbol),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return {
    file: toPosix(filePath),
    props,
    inherits: propsInterface.getExtends().map((clause) => clause.getText()),
  };
}

function vueApi(
  checker: ReturnType<typeof createChecker>,
  registryName: string,
  componentName: string,
): VueApi | null {
  const filePath = `${VUE_DIR}/${registryName}/${componentName}.vue`;
  if (globSync(filePath).length === 0) return null;

  const meta = checker.getComponentMeta(filePath);

  return {
    file: toPosix(filePath),
    props: meta.props
      .filter((prop) => !prop.global || prop.name === "class")
      .map((prop) => ({
        name: prop.name,
        type: vueTypeText(prop),
        required: prop.required,
        default: prop.default,
        description: prop.description,
      }))
      .sort((a, b) => a.name.localeCompare(b.name)),
    events: meta.events.map((event) => ({
      name: event.name,
      type: event.type,
      description: event.description,
    })),
    slots: meta.slots.map((slot) => ({ name: slot.name, description: slot.description })),
  };
}

export function registryComponentNames() {
  return globSync(`${VUE_DIR}/*`)
    .map((dir) => path.basename(String(dir)))
    .sort();
}

export function createComponentApiReader() {
  const project = new Project({ tsConfigFilePath: TSCONFIG });
  const checker = createChecker(TSCONFIG, {
    schema: { ignore: SCHEMA_IGNORE },
    printer: { newLine: 1 },
  });

  return (registryName: string): ComponentApi[] =>
    componentNames(registryName).map((componentName) => ({
      name: componentName,
      react: reactApi(project, registryName, componentName),
      vue: vueApi(checker, registryName, componentName),
    }));
}
