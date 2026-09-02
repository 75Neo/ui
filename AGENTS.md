# AGENTS.md

This guide is for AI agents working in this repo. `CLAUDE.md` is a symlink to this file.

75NeoUI is a component library that ships the same components for React and Vue from one
set of styles. Requires Node 24 and pnpm 11 (`mise install` gets both).

## Commands

| Command                             | What it does                                             |
| ----------------------------------- | -------------------------------------------------------- |
| `pnpm build`                        | Build every package and app                              |
| `pnpm typecheck`                    | Typecheck everything — **depends on `build`**            |
| `pnpm test`                         | Run every package's tests                                |
| `pnpm lint` / `pnpm lint:fix`       | oxlint at the repo root                                  |
| `pnpm format` / `pnpm format:check` | oxfmt                                                    |
| `pnpm dev:play`                     | Playground — every component, React and Vue side by side |
| `pnpm dev:docs`                     | Astro docs site                                          |

Scoped to one package:

```sh
pnpm --filter @75neo/core test
pnpm --filter @75neo/core exec vitest run src/utils/__tests__/resolve.test.ts
pnpm --filter @75neo/core exec vitest run -t "lets class beat the ui prop"
pnpm --filter @75neo/react dev            # tsdown --watch
```

CI runs, in order: `format:check`, `build`, `test`, `lint`, `typecheck`.

`@75neo/react` and `@75neo/vue` test in a real Chromium through
`@vitest/browser-playwright`; the first run needs
`pnpm exec playwright install --with-deps chromium`. `@75neo/core` is node-only and fast —
prefer putting a test there when the behaviour doesn't need a DOM. `@75neo/themes` carries
no tests: it is Tailwind classes, not logic.

## Architecture

Four packages. The dependency direction is `core` → `themes` → `react`/`vue`.

- **`@75neo/core`** — the cascade, and nothing else. Depends on no other package in the
  repo. Holds `resolveTheme`, `layerTheme`, the recipe types, and the theme-registry types.
  Knows nothing about any particular component.
- **`@75neo/themes`** — design tokens (`src/tokens/*.css`) plus one **component module**
  per component in `src/components/`. That module owns everything about the component that
  isn't framework-specific: the `tailwind-variants` recipe, its slot and variant types, the
  props type, the registry augmentation, and any shared behaviour rule.
- **`@75neo/react`** / **`@75neo/vue`** — adapters. Each is a `Theme` component, one hook
  or composable, and one file per component. They contain no styling logic.

`apps/playground` aliases `@75neo/*` straight to `packages/*/src` in `astro.config.mjs`, so
it hot-reloads against source with no build. Everything else resolves through `dist`.

**`typecheck` depends on `build`.** After changing a package that another one imports,
stale `dist` output produces type errors that point at the wrong place. Run `pnpm build`.

### The cascade

The one thing to understand before touching anything. Four layers can set a component's
classes; `resolveTheme` in `@75neo/core` folds them, weakest first:

1. the recipe's own classes;
2. `Theme` layers above the component, already folded into one config by `layerTheme`;
3. the component's own `ui` prop;
4. `class` / `className` at the call site, which reaches the **`base` slot only**.

Conflicting utilities are settled by tailwind-merge, so a later layer replaces an earlier
one and non-conflicting utilities from every layer survive. This order is asserted in
`packages/core/src/utils/__tests__/resolve.test.ts` — that file is the specification.

`resolveTheme` returns finished per-slot strings, so a component renders
`theme.class.base` and has no merging to do. Test cascade behaviour there, in node, not
through a rendered DOM.

### Recipes describe themselves

A `tv()` result exposes `variants`, `slots`, `variantKeys` and `defaultVariants` at
runtime. Nothing built on a recipe should restate them:

- `resolveTheme` reads `variantKeys`, so a variant added to a recipe resolves with no
  change to the resolver or to any component;
- `variantValues(recipe, "color")` returns the declared values as a literal-typed array —
  the playground previews read the matrix from it.

### Slot-name identity

For a given component, the recipe slot name, the `data-slot` attribute and the `ui` object
key are the same word. One vocabulary, three uses. Every rendered part carries `data-slot`;
tests select on it.

## Adding a component

One file per component per package. No component folders, no per-component `index.ts`, no
per-component context.

1. **`packages/themes/src/components/<name>.ts`** — the recipe, its `<Name>Slots` and
   `<Name>Variants` types, `<Name>UI`, `<Name>Theme`, the `<Name>Props<F>` interface (`F`
   is the framework's icon type), the `declare global` registry augmentation, and any rule
   both adapters would otherwise duplicate. Re-export from `src/index.ts`.
2. **`packages/react/src/components/<Name>.tsx`** and
   **`packages/vue/src/components/<Name>.vue`** — call `useResolvedTheme`, then render
   `theme.class.<slot>` onto elements carrying `data-slot`. Export from each package's
   `src/index.ts`.
3. **`apps/playground/src/previews/`** — a `.tsx` and a `.vue` preview, plus an entry in
   `src/routes.ts` and a page under `src/pages/`.

Registry keys are plain inline strings (`"button"`). There are no exported key constants.

Ark UI (`@ark-ui/react`, `@ark-ui/vue`) is a dependency for components that need
behaviour. When wrapping it, its anatomy stays hidden: ship one component with one prop
API, never export `<Name>Root` / `<Name>Trigger` or wire parts through a per-component
context.

## Constraints worth knowing before you fight them

**`defineProps` cannot consume a derived type.** `@vue/compiler-sfc` resolves types from
source alone and cannot evaluate a recipe's inferred type, so neither
`VariantProps<typeof recipe>` nor a mapped type over `recipe.variants` reaches it as finite
keys — both fail the Vue build. Component props are written out by hand. The
`ButtonVariantsAreExposed` guard in the button module turns "recipe gained a variant, props
didn't" into a typecheck failure naming the variant; copy that pattern.

**Merge helpers must not alias their inputs.** `layerTheme` copies nested objects rather
than assigning references, so a `ThemeConfig` stays safe to reuse and to serialize. There
are tests for both.

**Tokens, not hardcoded colors.** `oxlint` enforces this
(`tailwindcss/no-hardcoded-colors`), along with class sorting and conflict rules, against
`packages/themes/src/tokens/lint.css`. Recipes need no `dark:` classes — the tokens flip,
not the classes. See `packages/themes/README.md` for the token vocabulary.

## MCP servers

`.mcp.json` provides **ArkUI** (component docs and examples) and **Astro docs**. Use them
rather than guessing at either API.
