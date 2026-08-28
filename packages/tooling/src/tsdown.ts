import type { UserConfig } from "tsdown";

/**
 * Shared tsdown configuration for all publishable 75NeoUI packages.
 *
 * @param overrides Merged over the shared config for packages that need customizations
 */
export function defineLibrary(overrides: UserConfig = {}): UserConfig {
  return {
    entry: ["src/index.ts"],
    format: ["esm"],
    platform: "neutral",
    fixedExtension: false,
    dts: true,
    clean: true,
    treeshake: true,
    exports: true,
    ...overrides,
  };
}
