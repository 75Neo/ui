import type { UserConfig } from "tsdown";

/**
 * The tsdown configuration every publishable 75NeoUI package builds with.
 *
 * `fixedExtension: false` keeps ESM output at plain `.js` — the packages are all
 * `"type": "module"`, so the exports map stays simple. `platform: "neutral"` is what
 * tsdown recommends for a library that has to run in a browser and in Node alike.
 *
 * `deps.onlyBundle: []` is a guard rather than a setting: every real dependency of these
 * packages is external, so nothing from `node_modules` belongs in the output. A package
 * that legitimately inlines something lists it, and anything else fails the build
 * instead of being silently copied into the bundle.
 *
 * @param overrides merged over the shared config, for a package that needs to differ
 */
export function defineLibrary(overrides: UserConfig = {}): UserConfig {
  return {
    entry: ["src/index.ts"],
    format: ["esm"],
    platform: "neutral",
    fixedExtension: false,
    deps: { onlyBundle: [] },
    dts: true,
    clean: true,
    treeshake: true,
    ...overrides,
  };
}
