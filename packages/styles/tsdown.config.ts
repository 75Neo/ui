import { defineLibrary } from "@75neo/tooling/tsdown";

/**
 * Only the JS half is built. The CSS is published as source, because the `@source`
 * directive inside it resolves relative to its own location — see `src/css/index.css`.
 *
 * In this workspace nothing consumes `dist`: the package's `exports` point at `src`, so
 * a typecheck needs no build. `publishConfig` swaps them for the built entry on publish,
 * which is what `prepack` produces.
 */
export default defineLibrary();
