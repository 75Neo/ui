# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

75NeoUI: an [Ark UI](https://ark-ui.com) + [Panda CSS](https://panda-css.com) component library
published for **three frameworks at once** — React, Vue and Svelte — from a single shared set of
styles. `packages/styles` is the design system; `packages/react|vue|svelte` are thin framework
bindings over it; `apps/*` are development surfaces, not products.

pnpm workspace, Node 24 (see `mise.toml`). `Button` is currently the only component, and is the
reference implementation for every pattern below.

## Commands

```sh
pnpm dev:react        # Storybook for one framework — the usual way to work (also :vue, :svelte)
pnpm dev              # styles watcher + all three Storybooks in parallel
pnpm dev:app:react    # the Vite demo page instead of Storybook (also :vue, :svelte)
pnpm dev:docs         # Astro docs site

pnpm build            # every package + each Storybook + docs, in dependency order (~10s)
pnpm check            # tsc / vue-tsc / svelte-check / astro check across all 8 projects
pnpm lint             # oxlint
pnpm format           # oxfmt
pnpm lint:packages    # publint — validates the publishable manifests
pnpm codegen          # regenerate packages/styles/styled-system
pnpm clean            # drop dist, storybook-static, styled-system, caches
```

Single project: `pnpm --filter <name> run <script>` (`@75neo/react`, `playground-vue`, `docs`, …).

**There is no test framework configured** — no vitest, jest or playwright anywhere. `pnpm check`
(type checking) is the closest thing to a test suite. Don't invent a test command; if tests are
wanted, that's a new setup decision for the user.

## The one thing that will break first

`packages/styles/styled-system/` is **generated and git-ignored**. Every package imports its
runtime from there via `@75neo/styles/css` and `@75neo/styles/recipes`. If it is missing, all
three framework packages fail to resolve and every typecheck and build collapses at once.

The root `prepare` script regenerates it on `pnpm install`. After a `pnpm clean`, or on a fresh
clone where install was skipped, run `pnpm codegen` before anything else.

## How the styling actually connects

Read this before touching Panda config — the mechanism spans four files and is not obvious from
any one of them.

1. **`packages/styles/src/preset.ts`** is the design system: tokens, semantic tokens, recipes,
   exported as a Panda preset. `panda.config.ts` in that package runs codegen only — it emits the
   runtime and deliberately extracts no CSS (`include: []`, `preflight: false`).
2. **Component packages** import that runtime and apply recipe class names. They never run Panda.
3. **Apps** load the same preset and run the real Panda extraction via `postcss.config.cjs`.
   That is what emits CSS. Two settings in each app's `panda.config.ts` make it work:
   - `importMap: "@75neo/styles"` — tells Panda that `@75neo/styles/css` imports are its own
     runtime rather than an unknown third-party module.
   - `include: [..., "../../packages/<framework>/src/**"]` — scans the **library** sources, or the
     component recipes never reach the app's CSS.
   - `dependencies: ["../../packages/styles/src/**/*.ts"]` restarts extraction when the preset changes.
4. **`staticCss: { recipes: "*" }`** in the preset ships every recipe variant. Panda extracts
   statically, so a runtime-chosen variant (`<Button variant={someState} />`) produces class names
   that would otherwise have no CSS behind them. Removing this silently breaks all non-default
   variants — the app renders, the styles are just absent.

### Consequences for day-to-day work

- **Styling changes belong in the recipe, not in components.** One recipe in
  `packages/styles/src/recipes/` drives all three frameworks. Adding a variant is a one-file
  change; adding it three times in three components is the wrong instinct here.
- Components style against **semantic tokens** (`bg.surface`, `fg.muted`, `border.accent`), which
  resolve per color mode. Never branch on `_dark` inside a component, and don't reach for raw
  tokens (`gray.800`) in component code.
- After adding a **new** recipe, `pnpm codegen` must run before the component that imports it will
  typecheck — the import target does not exist until then.

## Framework binding conventions

The three packages deliberately differ, each for a reason:

- **React** — `ark.button` from `@ark-ui/react/factory` for `asChild` support; `button.splitVariantProps`
  separates recipe variants from DOM props; `cx()` merges the caller's `className`.
- **Vue** — written with `defineComponent` + `h()`, **not** SFCs. This is intentional: it keeps
  tsdown able to build the package without a Vue SFC plugin. Variant props are declared; everything
  else falls through as attrs, and Vue merges the caller's `class` automatically.
- **Svelte** — `.svelte` source built by `svelte-package`, since Svelte libraries ship source.
  `ButtonProps` narrows `class` to `string` (`Omit<HTMLButtonAttributes, "class">`) because Svelte 5
  types it as `ClassValue`, which `cx()` won't accept.

React and Vue build with tsdown; both set `fixedExtension: false` so ESM output lands at `.js` and
the exports map stays simple. Run `pnpm lint:packages` after touching any `exports` field.

## Dev loop and apps

Each playground aliases `@75neo/<framework>` to `packages/<framework>/src` in **both**
`vite.config.ts` (`resolve.alias`) and `tsconfig.json` (`paths`). Editing a component hot-reloads
with no build step. Keep those two in sync — changing one alone produces either a runtime that
disagrees with the types or the reverse.

**Storybook is the development space.** A component is exercised through its stories in
`apps/playground-<framework>/src/*.stories.*`; wiring it into the playground's `App` page is
optional. Ports: React 6006, Vue 6007, Svelte 6008 (Vite demo apps on 5173/5174/5175).

`apps/docs` is a stub Astro site listing the packages. It is not wired into the design system.

## Repo conventions

- **Dependency versions live in one place**: the `catalog:` block of `pnpm-workspace.yaml`.
  Package manifests say `"catalog:"` instead of a range. Bump versions there, not in manifests.
- **Tooling is Oxc**: `oxlint` and `oxfmt` (`.oxlintrc.json`, `.oxfmtrc.json`). Do not add Prettier.
  oxfmt covers `.ts/.tsx/.js/.svelte/.vue/.md/.json`; `.astro` files are not formatted by it.
- The npm scope is lowercase `@75neo` — npm rejects capitalized scopes.
