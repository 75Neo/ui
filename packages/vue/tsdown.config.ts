import { defineLibrary } from "@75neo/tooling/tsdown";
import Vue from "unplugin-vue/rolldown";

/**
 * The SFCs are compiled here, so the package ships plain JavaScript and a consumer needs
 * no Vue plugin of their own to use it.
 *
 * - `unplugin-vue` compiles `.vue` files. `isProduction` drops the dev-only hot-reload
 *   and inspection hooks a published build has no use for.
 * - `dts: { vue: true }` puts `vue-tsc` behind the declaration build, which is what makes
 *   the emitted `.d.ts` describe the components' props and slots rather than `any`.
 *
 * The declarations vue-tsc emits name a couple of `tailwind-variants` types that package
 * keeps in an internal chunk, so they cannot be re-imported and are inlined into
 * `index.d.ts` instead. That is the one thing this package is allowed to bundle; the
 * empty default would fail the build over it.
 */
export default defineLibrary({
  plugins: [Vue({ isProduction: true })],
  dts: { vue: true },
  deps: { onlyBundle: ["tailwind-variants"] },
});
