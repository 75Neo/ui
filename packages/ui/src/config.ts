import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { configSchema, parseJson, validate } from "./schema.js";
import type { Aliases, Config, Framework, Paths } from "./schema.js";

export const CONFIG_FILE = "75neoui.json";
export const DEFAULT_REGISTRY = "https://75neo-ui.pages.dev/r";
export const DEFAULT_ALIASES: Aliases = { ui: "@/components/ui", lib: "@/lib" };

const SRC_PATHS: Paths = { ui: "src/components/ui", lib: "src/lib" };
const ROOT_PATHS: Paths = { ui: "components/ui", lib: "lib" };

const CSS_CANDIDATES = [
  "src/styles/global.css",
  "src/styles/globals.css",
  "src/app.css",
  "src/index.css",
  "src/style.css",
  "src/assets/css/main.css",
  "app/globals.css",
  "styles/globals.css",
] as const;

export class ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigError";
  }
}

export const configPath = (cwd: string): string => path.join(cwd, CONFIG_FILE);

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export async function readConfig(cwd: string): Promise<Config> {
  const file = configPath(cwd);
  if (!existsSync(file)) {
    throw new ConfigError(`No ${CONFIG_FILE} found in ${cwd}. Run \`75neoui init\` first.`);
  }

  const document = parseJson(CONFIG_FILE, await readFile(file, "utf8"));
  const withDefaults = isObject(document)
    ? {
        registry: DEFAULT_REGISTRY,
        paths: SRC_PATHS,
        aliases: DEFAULT_ALIASES,
        ...document,
      }
    : document;

  return validate(configSchema, CONFIG_FILE, withDefaults);
}

export async function writeConfig(cwd: string, config: Config): Promise<void> {
  await writeFile(configPath(cwd), `${JSON.stringify(config, null, 2)}\n`);
}

export async function detectFramework(cwd: string): Promise<Framework | null> {
  const file = path.join(cwd, "package.json");
  if (!existsSync(file)) return null;

  let document: unknown;
  try {
    document = JSON.parse(await readFile(file, "utf8")) as unknown;
  } catch {
    return null;
  }
  if (!isObject(document)) return null;

  const dependencies = isObject(document["dependencies"]) ? document["dependencies"] : {};
  const devDependencies = isObject(document["devDependencies"]) ? document["devDependencies"] : {};
  const all = { ...dependencies, ...devDependencies };

  if ("vue" in all) return "vue";
  if ("react" in all) return "react";
  return null;
}

export async function detectCssEntry(cwd: string): Promise<string | null> {
  for (const candidate of CSS_CANDIDATES) {
    const file = path.join(cwd, candidate);
    if (!existsSync(file)) continue;
    const source = await readFile(file, "utf8");
    if (source.includes('@import "tailwindcss"') || source.includes("@import 'tailwindcss'")) {
      return candidate;
    }
  }
  return null;
}

export const detectPaths = (cwd: string): Paths =>
  existsSync(path.join(cwd, "src")) ? SRC_PATHS : ROOT_PATHS;
