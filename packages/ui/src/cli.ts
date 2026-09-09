#!/usr/bin/env node
import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  CONFIG_FILE,
  ConfigError,
  DEFAULT_ALIASES,
  DEFAULT_REGISTRY,
  configPath,
  detectCssEntry,
  detectFramework,
  detectPaths,
  readConfig,
  writeConfig,
} from "./config.js";
import { withImport, withTheme } from "./css.js";
import { InstallError, writeFiles } from "./install.js";
import { detectPackageManager, install } from "./pm.js";
import {
  RegistryError,
  collectDependencies,
  fetchIndex,
  fetchItem,
  resolveItems,
} from "./registry.js";
import { FRAMEWORKS, ValidationError } from "./schema.js";
import type { Config, Framework } from "./schema.js";

const PACKAGE = "@75neo/ui";
const ANIMATIONS = `${PACKAGE}/animations.css`;
const THEME_MARKER = "/* 75NeoUI theme */";

const green = (text: string): string => `\x1b[32m${text}\x1b[0m`;
const red = (text: string): string => `\x1b[31m${text}\x1b[0m`;
const dim = (text: string): string => `\x1b[2m${text}\x1b[0m`;
const bold = (text: string): string => `\x1b[1m${text}\x1b[0m`;

interface SharedArgs {
  readonly cwd: string;
  readonly registry: string | undefined;
}

interface InitArgs extends SharedArgs {
  readonly framework: Framework | undefined;
  readonly css: string | undefined;
  readonly overwrite: boolean;
  readonly install: boolean;
}

interface AddArgs extends SharedArgs {
  readonly items: readonly string[];
  readonly all: boolean;
  readonly overwrite: boolean;
  readonly install: boolean;
}

interface ListArgs extends SharedArgs {
  readonly framework: Framework | undefined;
}

async function updateStylesheet(cwd: string, config: Config, css: Parameters<typeof withTheme>[1]) {
  const stylesheet = path.join(cwd, config.css);
  const source = await readFile(stylesheet, "utf8");
  const next = withTheme(withImport(source, ANIMATIONS), css, THEME_MARKER);
  if (next === source) return false;
  await writeFile(stylesheet, next);
  return true;
}

async function runInit(args: InitArgs): Promise<void> {
  const cwd = path.resolve(args.cwd);

  if (existsSync(configPath(cwd)) && !args.overwrite) {
    throw new ConfigError(`${CONFIG_FILE} already exists. Pass --overwrite to replace it.`);
  }

  const framework = args.framework ?? (await detectFramework(cwd));
  if (framework === null || framework === undefined) {
    throw new ConfigError(
      `Could not tell whether this is a React or Vue project. Pass --framework ${FRAMEWORKS.join(" or --framework ")}.`,
    );
  }

  const css = args.css ?? (await detectCssEntry(cwd));
  if (css === null || css === undefined) {
    throw new ConfigError(
      'Could not find a stylesheet importing "tailwindcss". Pass --css with the path to it.',
    );
  }

  const config: Config = {
    framework,
    css,
    registry: args.registry ?? DEFAULT_REGISTRY,
    paths: detectPaths(cwd),
    aliases: DEFAULT_ALIASES,
  };

  await writeConfig(cwd, config);
  console.log(`${green("done")} wrote ${CONFIG_FILE}`);

  const theme = await fetchItem(config.registry, framework, "theme");
  if (theme.css === undefined) {
    throw new RegistryError("The theme item carries no CSS, so there are no tokens to write.");
  }

  await updateStylesheet(cwd, config, theme.css);
  console.log(`${green("done")} updated ${css}`);

  if (!args.install) return;
  const manager = detectPackageManager(cwd);
  console.log(dim(`${manager} add ${PACKAGE}`));
  await install([PACKAGE], { cwd, manager });
}

async function runAdd(args: AddArgs): Promise<void> {
  const cwd = path.resolve(args.cwd);
  const config = await readConfig(cwd);
  const registry = args.registry ?? config.registry;

  let names: readonly string[] = args.items;
  if (args.all) {
    const index = await fetchIndex(registry, config.framework);
    names = index.items.filter((item) => item.type === "registry:ui").map((item) => item.name);
  }

  if (names.length === 0) throw new RegistryError("Name at least one component, or pass --all.");

  const items = await resolveItems(registry, config.framework, names);
  const { written, skipped } = await writeFiles(items, config, { cwd, overwrite: args.overwrite });

  for (const file of written) console.log(`${green("done")} ${file}`);
  for (const file of skipped) console.log(dim(`kept ${file}, pass --overwrite to replace it`));

  const theme = items.find((item) => item.type === "registry:theme");
  if (theme?.css !== undefined && (await updateStylesheet(cwd, config, theme.css))) {
    console.log(`${green("done")} updated ${config.css}`);
  }

  if (!args.install) return;
  const dependencies = collectDependencies(items);
  if (dependencies.length === 0) return;
  const manager = detectPackageManager(cwd);
  console.log(dim(`${manager} add ${dependencies.join(" ")}`));
  await install(dependencies, { cwd, manager });
}

async function runList(args: ListArgs): Promise<void> {
  const cwd = path.resolve(args.cwd);
  const framework = args.framework ?? (await readConfig(cwd)).framework;
  const index = await fetchIndex(args.registry ?? DEFAULT_REGISTRY, framework);

  for (const item of index.items) {
    if (item.type !== "registry:ui") continue;
    console.log(`${bold(item.name.padEnd(18))}${item.description ?? ""}`);
  }
}

function fail(error: unknown): void {
  const known =
    error instanceof ConfigError ||
    error instanceof RegistryError ||
    error instanceof InstallError ||
    error instanceof ValidationError;
  const message =
    error instanceof Error
      ? known
        ? error.message
        : (error.stack ?? error.message)
      : String(error);
  console.error(red(message));
  process.exitCode = 1;
}

const run =
  <T>(handler: (args: T) => Promise<void>) =>
  (args: T): void => {
    void handler(args).catch(fail);
  };

await yargs(hideBin(process.argv))
  .scriptName("75neoui")
  .usage("$0 <command> [options]")
  .options({
    cwd: { type: "string", default: process.cwd(), describe: "Project directory to work in" },
    registry: { type: "string", describe: "Registry base URL or local directory" },
  })
  .command(
    "init",
    "Set the project up for 75NeoUI",
    (builder) =>
      builder.options({
        framework: {
          type: "string",
          choices: FRAMEWORKS,
          describe: "Framework to install for",
        },
        css: { type: "string", describe: "Path to the Tailwind entry stylesheet" },
        overwrite: {
          type: "boolean",
          default: false,
          describe: `Replace an existing ${CONFIG_FILE}`,
        },
        install: { type: "boolean", default: true, describe: "Install npm dependencies" },
      }),
    run(runInit),
  )
  .command(
    "add [items..]",
    "Add components to the project",
    (builder) =>
      builder
        .positional("items", { type: "string", array: true, default: [] as string[] })
        .options({
          all: { type: "boolean", default: false, describe: "Add every component" },
          overwrite: {
            type: "boolean",
            default: false,
            describe: "Replace files that already exist",
          },
          install: { type: "boolean", default: true, describe: "Install npm dependencies" },
        }),
    run(runAdd),
  )
  .command(
    "list",
    "List the components in the registry",
    (builder) =>
      builder.options({
        framework: { type: "string", choices: FRAMEWORKS, describe: "Framework to list" },
      }),
    run(runList),
  )
  .demandCommand(1, "Name a command. Try `75neoui --help`.")
  .strict()
  .help()
  .alias("h", "help")
  .version()
  .wrap(Math.min(100, process.stdout.columns ?? 100))
  .parseAsync();
