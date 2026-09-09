import type {
  CssBlock,
  CssValue,
  RegistryFile,
  RegistryIndex,
  RegistryIndexEntry,
  RegistryItem,
} from "./types.js";
import { isItemType } from "./types.js";

export class ParseError extends Error {
  constructor(
    readonly source: string,
    readonly detail: string,
  ) {
    super(`${source} is not a valid ${detail}.`);
    this.name = "ParseError";
  }
}

type Json = Record<string, unknown>;

const isObject = (value: unknown): value is Json =>
  typeof value === "object" && value !== null && !Array.isArray(value);

function field<T>(
  source: string,
  object: Json,
  key: string,
  guard: (value: unknown) => value is T,
  expected: string,
): T {
  const value = object[key];
  if (!guard(value)) throw new ParseError(source, `registry item: "${key}" must be ${expected}`);
  return value;
}

function optional<T>(
  source: string,
  object: Json,
  key: string,
  guard: (value: unknown) => value is T,
  expected: string,
): T | undefined {
  if (object[key] === undefined) return undefined;
  return field(source, object, key, guard, expected);
}

const isString = (value: unknown): value is string => typeof value === "string";

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(isString);

function isCssBlock(value: unknown): value is CssBlock {
  if (!isObject(value)) return false;
  return Object.values(value).every(
    (entry: unknown): entry is CssValue => isString(entry) || isCssBlock(entry),
  );
}

function parseFile(source: string, value: unknown): RegistryFile {
  if (!isObject(value)) throw new ParseError(source, "registry item: every file must be an object");
  return {
    path: field(source, value, "path", isString, "a string"),
    type: field(source, value, "type", isItemType, "a known registry type"),
    content: field(source, value, "content", isString, "a string"),
  };
}

export function parseItem(source: string, value: unknown): RegistryItem {
  if (!isObject(value)) throw new ParseError(source, "registry item: expected an object");

  const files = value["files"];
  if (files !== undefined && !Array.isArray(files)) {
    throw new ParseError(source, 'registry item: "files" must be an array');
  }

  return {
    name: field(source, value, "name", isString, "a string"),
    type: field(source, value, "type", isItemType, "a known registry type"),
    ...opt("title", optional(source, value, "title", isString, "a string")),
    ...opt("description", optional(source, value, "description", isString, "a string")),
    ...opt(
      "dependencies",
      optional(source, value, "dependencies", isStringArray, "an array of strings"),
    ),
    ...opt(
      "registryDependencies",
      optional(source, value, "registryDependencies", isStringArray, "an array of strings"),
    ),
    ...opt("css", optional(source, value, "css", isCssBlock, "a nested object of strings")),
    ...opt("docs", optional(source, value, "docs", isString, "a string")),
    ...opt(
      "files",
      files?.map((file: unknown) => parseFile(source, file)),
    ),
  };
}

function parseIndexEntry(source: string, value: unknown): RegistryIndexEntry {
  if (!isObject(value))
    throw new ParseError(source, "registry index: every item must be an object");
  return {
    name: field(source, value, "name", isString, "a string"),
    type: field(source, value, "type", isItemType, "a known registry type"),
    ...opt("title", optional(source, value, "title", isString, "a string")),
    ...opt("description", optional(source, value, "description", isString, "a string")),
  };
}

export function parseIndex(source: string, value: unknown): RegistryIndex {
  if (!isObject(value)) throw new ParseError(source, "registry index: expected an object");

  const items = value["items"];
  if (!Array.isArray(items))
    throw new ParseError(source, 'registry index: "items" must be an array');

  return {
    name: field(source, value, "name", isString, "a string"),
    ...opt("homepage", optional(source, value, "homepage", isString, "a string")),
    items: items.map((item: unknown) => parseIndexEntry(source, item)),
  };
}

export function parseJson(source: string, text: string): unknown {
  try {
    return JSON.parse(text) as unknown;
  } catch (error) {
    throw new ParseError(source, `JSON document: ${(error as Error).message}`);
  }
}

function opt<K extends string, T>(key: K, value: T | undefined): { [P in K]?: T } {
  return (value === undefined ? {} : { [key]: value }) as { [P in K]?: T };
}
