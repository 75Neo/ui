import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { ParseError, parseJson } from "./parse.js";
import type { Aliases, Config, Framework, Paths } from "./types.js";
import { FRAMEWORKS, isFramework } from "./types.js";

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

function segment(value: unknown, fallback: string): string {
  return typeof value === "string" && value.length > 0 ? value : fallback;
}

function readPair(value: unknown, fallback: Paths | Aliases): { ui: string; lib: string } {
  const source = isObject(value) ? value : {};
  return { ui: segment(source["ui"], fallback.ui), lib: segment(source["lib"], fallback.lib) };
}

export async function readConfig(cwd: string): Promise<Config> {
  const file = configPath(cwd);
  if (!existsSync(file)) {
    throw new ConfigError(`No ${CONFIG_FILE} found in ${cwd}. Run \`75neoui init\` first.`);
  }

  let document: unknown;
  try {
    document = parseJson(CONFIG_FILE, await readFile(file, "utf8"));
  } catch (error) {
    throw new ConfigError(error instanceof ParseError ? error.message : String(error));
  }

  if (!isObject(document)) throw new ConfigError(`${CONFIG_FILE} must contain an object.`);

  const framework = document["framework"];
  if (!isFramework(framework)) {
    throw new ConfigError(`${CONFIG_FILE} needs a "framework" of ${FRAMEWORKS.join(" or ")}.`);
  }

  const css = document["css"];
  if (typeof css !== "string" || css.length === 0) {
    throw new ConfigError(`${CONFIG_FILE} needs a "css" path to your Tailwind entry file.`);
  }

  return {
    framework,
    css,
    registry: segment(document["registry"], DEFAULT_REGISTRY),
    paths: readPair(document["paths"], SRC_PATHS),
    aliases: readPair(document["aliases"], DEFAULT_ALIASES),
  };
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
