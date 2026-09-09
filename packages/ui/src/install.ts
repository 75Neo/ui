import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Config, RegistryFile, RegistryItem } from "./types.js";

const UI_PREFIX = /^registry\/(?:react|vue)\/ui\//;
const LIB_PREFIX = /^registry\/shared\/lib\//;

export class InstallError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InstallError";
  }
}

export function destinationFor(file: Pick<RegistryFile, "path">, config: Config): string {
  if (UI_PREFIX.test(file.path)) {
    return path.join(config.paths.ui, file.path.replace(UI_PREFIX, ""));
  }
  if (LIB_PREFIX.test(file.path)) {
    return path.join(config.paths.lib, file.path.replace(LIB_PREFIX, ""));
  }
  throw new InstallError(`Cannot place ${file.path}; it is outside the known registry layout.`);
}

export const rewriteImports = (content: string, config: Config): string =>
  content
    .replaceAll("@/registry/react/ui/", `${config.aliases.ui}/`)
    .replaceAll("@/registry/vue/ui/", `${config.aliases.ui}/`)
    .replaceAll("@/registry/shared/lib/", `${config.aliases.lib}/`);

export interface WriteOptions {
  readonly cwd: string;
  readonly overwrite: boolean;
}

export interface WriteResult {
  readonly written: string[];
  readonly skipped: string[];
}

export async function writeFiles(
  items: readonly RegistryItem[],
  config: Config,
  options: WriteOptions,
): Promise<WriteResult> {
  const written: string[] = [];
  const skipped: string[] = [];

  for (const item of items) {
    for (const file of item.files ?? []) {
      const relative = destinationFor(file, config);
      const absolute = path.join(options.cwd, relative);

      if (existsSync(absolute) && !options.overwrite) {
        skipped.push(relative);
        continue;
      }

      await mkdir(path.dirname(absolute), { recursive: true });
      await writeFile(absolute, rewriteImports(file.content, config));
      written.push(relative);
    }
  }

  return { written, skipped };
}
