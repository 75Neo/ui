import type { UserConfig } from "tsdown";

/**
 * Shared tsdown configuration for every publishable 75NeoUI packages
 *
 * @param overrides Merged over the shared config, for a package that needs to differ
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
