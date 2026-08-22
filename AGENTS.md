# AGENTS.md

This file provides guidance to coding agents (Claude Code and others following the AGENTS.md convention)
when working with code in this repository.

## What this is

75NeoUI: an [Ark UI](https://ark-ui.com) + [Panda CSS](https://panda-css.com) component library
published for **three frameworks at once** — React, Vue and Svelte — from a single shared set of
styles. `packages/styles` is the design system; `packages/react|vue|svelte` are thin framework
bindings over it; `apps/*` are development surfaces, not products.

pnpm workspace, Node 24 (see `mise.toml`). Two components so far, and between them they are the
reference implementation for every pattern below: `Button` for single-element components, and
`Accordion` for multi-part ones.

## Commands

```sh
pnpm dev:react        # Storybook for one framework — the usual way to work (also :vue, :svelte)
pnpm dev              # styles watcher + all three Storybooks in parallel
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
- Components style against **semantic tokens** (`bg.default`, `fg.muted`, `colorPalette.default`),
  which resolve per color mode. Never branch on `_dark` inside a component, and don't reach for raw
  tokens (`gray.800`) in component code.
- After adding a **new** recipe, `pnpm codegen` must run before the component that imports it will
  typecheck — the import target does not exist until then.
- **`strictTokens` is on.** A raw CSS value (`padding: "13px"`, `color: "#eee"`) is a _type_ error,
  not a lint error, so `pnpm check` is what catches it. Use a token, or the documented escape
  hatch — a `[13px]` bracket value, or `var(--…)` — when you genuinely need one. Panda keyword
  values still work where a utility defines them (`transitionProperty: "colors"`), and `auto` is
  still valid for margins.

## The design system

`packages/styles/src/theme/` is the system proper, in three layers. Each one may only reference the
layer above it:

1. **`colors.ts`** — six raw palettes (`neo`, `gray`, `red`, `green`, `amber`, `sky`), eleven steps
   each, no meaning attached. Nothing outside `semantic-tokens.ts` may import it.
2. **`tokens.ts`** — the non-color scales: `spacing`, `sizes`, `fontSizes`, `radii`, `zIndex`,
   `durations`, `easings` and the rest. These don't vary by color mode, so components use them by
   name. `spacing` and `sizes` share one ramp, so a height and a padding of the same number agree.
3. **`semantic-tokens.ts`** — what the palettes _mean_, resolved per color mode. Page chrome
   (`bg.*`, `fg.*`, `border.*`) plus six **intent palettes** — `accent`, `neutral`, `success`,
   `warning`, `danger`, `info` — each built through the same `intent()` helper so all six end up
   with an identical eight-role shape.

Also here: `text-styles.ts` (named type ramps — `heading.lg`, `body.md`, `label.sm`),
`animations.ts` (keyframes plus duration/easing shorthands), `breakpoints.ts`.

### Shape and intent are separate axes

Because every intent palette has the same eight roles (`subtle`, `muted`, `default`, `emphasized`,
`border`, `fg`, `text`, `contrast`), a recipe writes each _shape_ once against `colorPalette.*` and
gets every _intent_ for free:

```ts
solid: { bg: "colorPalette.default", color: "colorPalette.contrast",
         _hover: { bg: "colorPalette.emphasized" } },
```

`Button` has five variants and six palettes; all thirty combinations exist, none are spelled out.
`Accordion` spends only two of the eight roles, but spends them the same way.
Adding an intent is one entry in `semantic-tokens.ts` and one line per recipe — never a new
`variant`. If you find yourself writing a `dangerOutline` variant, you've fused the two axes back
together.

### Recipes import `defineRecipe` from `./define`, not from `@pandacss/dev`

Panda's own `defineRecipe` is typed against its _generic_ `SystemStyleObject`, which accepts any
raw CSS value — `strictTokens` does not reach it. A stray `padding: "13px"` inside a recipe would
typecheck cleanly, in the one place this repo says styling belongs.

`packages/styles/src/recipes/define.ts` is the same identity function with its parameter re-typed
against the **generated** `RecipeConfig`, which `strictTokens` does apply to. Every recipe must
import from there. Nothing else changes, and the import is type-only so a cold `pnpm codegen` —
before `styled-system/` exists — still works.

`defineSlotRecipe` in the same file is the multi-part counterpart, for the same reason.

### Multi-part components are one slot recipe, not several recipes

An accordion's root, item, trigger, indicator and content are **one** `defineSlotRecipe` with a
`slots` list — so `size`, `variant` and `colorPalette` are chosen once and every part follows.
Two things this changes:

- Slot recipes register under `theme.extend.slotRecipes`, **not** `recipes`. Panda keeps the two
  registries apart; `recipes/index.ts` exports both objects and `preset.ts` passes each to its own
  key. A slot recipe listed under `recipes` silently generates nothing.
- The framework bindings resolve the recipe in `Root` and publish the resulting slot class names
  on a per-framework context — React `createContext`, Vue `provide`/`inject`, Svelte
  `setContext`/`getContext` (storing a _getter_, so `$derived` stays reactive across the
  boundary). Every part below reads its own class from there, so callers set the variants once on
  `Root` and never thread props down the tree.

The parts are exported as a namespace (`export * as Accordion`), matching Ark's own anatomy 1:1 so
their docs transfer: `<Accordion.Root>`, `<Accordion.Item>`, `<Accordion.ItemTrigger>`,
`<Accordion.ItemIndicator>`, `<Accordion.ItemContent>`.

Two deliberate departures from a pure pass-through, in all three frameworks:

- `ItemContent` renders the recipe's `itemBody` slot around its children. The open/close animation
  interpolates `height`, and a padded element cannot collapse below its own padding — so the
  padding lives one level in and callers never have to know.
- `ItemIndicator` falls back to a Lucide chevron when given no children, so an accordion works
  without the caller wiring up an icon.

### The contrast rule

`contrast` is picked per palette **and per mode** so it clears WCAG AA (4.5:1) against both
`default` and `emphasized`. That is why the palettes aren't symmetric: `accent`/`danger` carry white
text at their solid steps, while `success`/`warning`/`info` invert in dark mode to a vivid 400 fill
with 950 text, because no green, amber or blue is both recognizable _and_ dark enough for white.

**Changing a solid step means re-checking its `contrast` pair.** The current worst pair is 4.83:1.
`fg.subtle` (3.7:1 in dark) and `fg.disabled` are the two deliberate exceptions, documented at their
definitions.

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

**Storybook is the only development surface.** A playground is a Storybook and nothing else —
there is no demo page, no `index.html`, no app entry. A component is exercised through its stories
in `apps/playground-<framework>/src/*.stories.*`. Ports: React 6006, Vue 6007, Svelte 6008.

Each playground still keeps a `vite.config.ts`, because Storybook's Vite builder loads it and
merges it into its own. That is where `@75neo/<framework>` is aliased to
`packages/<framework>/src` (`resolve.alias`), mirrored by `tsconfig.json` (`paths`). Editing a
component hot-reloads with no build step. Keep those two in sync — changing one alone produces
either a runtime that disagrees with the types or the reverse.

`apps/docs` is a stub Astro site listing the packages. It is not wired into the design system.

## Repo conventions

- **Dependency versions live in one place**: the `catalog:` block of `pnpm-workspace.yaml`.
  Package manifests say `"catalog:"` instead of a range. Bump versions there, not in manifests.
- **Tooling is Oxc**: `oxlint` and `oxfmt` (`.oxlintrc.json`, `.oxfmtrc.json`). Do not add Prettier.
  oxfmt covers `.ts/.tsx/.js/.svelte/.vue/.md/.json`; `.astro` files are not formatted by it.
- The npm scope is lowercase `@75neo` — npm rejects capitalized scopes.
- **Icons come from [Lucide](https://github.com/lucide-icons/lucide)**, never hand-written SVG.
  Each package takes its own binding as a regular dependency: `lucide-react`, `@lucide/vue`,
  `@lucide/svelte`. (`lucide-vue-next` and `lucide-svelte` are deprecated in favour of the
  `@lucide/*` scope; there is no `@lucide/react`, so React keeps the unscoped name.) Svelte imports
  one icon at a time — `@lucide/svelte/icons/chevron-down` — which Lucide recommends so Vite's dev
  server does not have to process the whole barrel.
  Size icons from the recipe (`& svg { width: 1em; height: 1em }`) rather than through Lucide's
  `size` prop, so the component's `size` variant stays in charge and a caller-supplied icon is
  sized the same way.

## CI

`.github/workflows/ci.yml` runs on pushes to `master` and on every pull request: format, lint,
types, build, then publint. Each check is guarded with `!cancelled()` so one push reports every
problem at once rather than one per round trip.

Two things worth knowing before editing it:

- It runs `pnpm codegen` as an **explicit step**. The root `prepare` script also runs it on install,
  but pnpm skips lifecycle scripts when it decides the install is already up to date — and without
  `styled-system/` every later step fails at once.
- Node and pnpm versions are duplicated into the workflow's `env` because nothing reads `mise.toml`
  on CI. The first step re-reads `mise.toml` and fails the run if the two have drifted, so the
  duplication can't rot silently. Change both together.

To reproduce a CI failure locally, run the same five: `pnpm format:check && pnpm lint && pnpm check
&& pnpm build && pnpm lint:packages`.
