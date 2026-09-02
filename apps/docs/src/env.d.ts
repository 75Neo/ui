/// <reference types="astro/client" />

/**
 * The repository root, defined by `astro.config.mjs` at build time.
 *
 * @remarks
 * Only the API extraction uses it, and only on the server: it is the path ts-morph
 * reads `packages/*` from.
 */
declare const __REPO_ROOT__: string;
