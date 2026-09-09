export const FRAMEWORKS = ["react", "vue"] as const;
export const PACKAGE_MANAGERS = ["npm", "pnpm", "yarn", "bun"] as const;
export const ITEM_TYPES = ["registry:ui", "registry:lib", "registry:theme"] as const;

export type Framework = (typeof FRAMEWORKS)[number];
export type PackageManager = (typeof PACKAGE_MANAGERS)[number];
export type ItemType = (typeof ITEM_TYPES)[number];

export type CssValue = string | CssBlock;
export interface CssBlock {
  readonly [selector: string]: CssValue;
}

export interface RegistryFile {
  readonly path: string;
  readonly type: ItemType;
  readonly content: string;
}

export interface RegistryItem {
  readonly name: string;
  readonly type: ItemType;
  readonly title?: string;
  readonly description?: string;
  readonly dependencies?: readonly string[];
  readonly registryDependencies?: readonly string[];
  readonly css?: CssBlock;
  readonly docs?: string;
  readonly files?: readonly RegistryFile[];
}

export interface RegistryIndexEntry {
  readonly name: string;
  readonly type: ItemType;
  readonly title?: string;
  readonly description?: string;
}

export interface RegistryIndex {
  readonly name: string;
  readonly homepage?: string;
  readonly items: readonly RegistryIndexEntry[];
}

export interface Paths {
  readonly ui: string;
  readonly lib: string;
}

export interface Aliases {
  readonly ui: string;
  readonly lib: string;
}

export interface Config {
  readonly framework: Framework;
  readonly css: string;
  readonly registry: string;
  readonly paths: Paths;
  readonly aliases: Aliases;
}

export const isFramework = (value: unknown): value is Framework =>
  FRAMEWORKS.includes(value as Framework);

export const isPackageManager = (value: unknown): value is PackageManager =>
  PACKAGE_MANAGERS.includes(value as PackageManager);

export const isItemType = (value: unknown): value is ItemType =>
  ITEM_TYPES.includes(value as ItemType);
