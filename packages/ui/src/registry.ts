import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { parseIndex, parseItem, parseJson } from "./parse.js";
import type { Framework, RegistryIndex, RegistryItem } from "./types.js";

const NAMESPACE = /^@75neo\//;

export class RegistryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RegistryError";
  }
}

export const stripNamespace = (name: string): string => name.replace(NAMESPACE, "");

const isRemote = (registry: string): boolean => /^https?:\/\//.test(registry);

async function read(
  registry: string,
  framework: Framework,
  file: string,
): Promise<[string, unknown]> {
  if (isRemote(registry)) {
    const url = `${registry.replace(/\/$/, "")}/${framework}/${file}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new RegistryError(`${url} returned ${String(response.status)} ${response.statusText}.`);
    }
    return [url, parseJson(url, await response.text())];
  }

  const location = path.resolve(registry, framework, file);
  if (!existsSync(location)) throw new RegistryError(`${location} does not exist.`);
  return [location, parseJson(location, await readFile(location, "utf8"))];
}

export async function fetchIndex(registry: string, framework: Framework): Promise<RegistryIndex> {
  const [source, document] = await read(registry, framework, "registry.json");
  return parseIndex(source, document);
}

export async function fetchItem(
  registry: string,
  framework: Framework,
  name: string,
): Promise<RegistryItem> {
  const [source, document] = await read(registry, framework, `${stripNamespace(name)}.json`);
  return parseItem(source, document);
}

export async function resolveItems(
  registry: string,
  framework: Framework,
  names: readonly string[],
): Promise<RegistryItem[]> {
  const resolved = new Map<string, RegistryItem>();
  const queue = names.map(stripNamespace);

  while (queue.length > 0) {
    const name = queue.shift();
    if (name === undefined || resolved.has(name)) continue;

    let item: RegistryItem;
    try {
      item = await fetchItem(registry, framework, name);
    } catch (error) {
      throw new RegistryError(`Could not resolve "${name}". ${(error as Error).message}`);
    }

    resolved.set(name, item);
    for (const dependency of item.registryDependencies ?? [])
      queue.push(stripNamespace(dependency));
  }

  return [...resolved.values()];
}

export const collectDependencies = (items: readonly RegistryItem[]): string[] =>
  [...new Set(items.flatMap((item) => [...(item.dependencies ?? [])]))].sort();
