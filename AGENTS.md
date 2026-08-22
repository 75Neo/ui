# AGENTS.md

This file provides guidance to coding agents (Claude Code and others following the AGENTS.md convention)
when working with code in this repository.

## What this is

75NeoUI: an [Ark UI](https://ark-ui.com) + [Tailwind CSS](https://tailwindcss.com) component library
published for **three frameworks at once** — React, Vue and Svelte — from a single shared set of
styles. `packages/styles` is the design system; `packages/react|vue|svelte` are thin framework
bindings over it; `apps/*` are development surfaces, plus the docs site.

pnpm workspace, Node 24 (see `mise.toml`). Two components so far, and between them they are the
reference implementation for every pattern below: `Button` for single-element components, and
`Accordion` for multi-part ones.

## Commands

```sh
pnpm dev:react        # Storybook for one framework — the usual way to work (also :vue, :svelte)
pnpm dev              # all three Storybooks in parallel
pnpm dev:docs         # Astro docs site

pnpm build            # every package + each Storybook + docs, in dependency order
pnpm check            # tsc / vue-tsc / svelte-check / astro check across all 8 projects
pnpm lint             # oxlint
pnpm format           # oxfmt
pnpm lint:packages    # publint — validates the publishable manifests
pnpm clean            # drop dist, storybook-static, .turbo and framework caches
```

Single project: `turbo run <task> --filter <name>` (`@75neo/react`, `playground-vue`, `docs`, …), or
`pnpm --filter <name> run <script>` to bypass the task graph entirely.

**There is no test framework configured** — no vitest, jest or playwright anywhere. `pnpm check`
(type checking) is the closest thing to a test suite. Don't invent a test command; if tests are
wanted, that's a new setup decision for the user.

**There is no code generation step.** Tailwind reads the design system straight from
`packages/styles/src`. A fresh clone works after `pnpm install` alone.

## Turborepo

`turbo.json` is the task graph. Every root script except `lint`, `format` and `clean` is a thin
`turbo run <task>` delegate — **task logic belongs in the package's own `package.json`**, never in a
root script that loops over directories. `lint` and `format` stay outside it because oxlint and
oxfmt are single repo-wide Rust passes over ~100 files; wrapping them in a task graph would cost
more than it saves.

Four tasks matter:

| Task           | Depends on | Caches                                 |
| -------------- | ---------- | -------------------------------------- |
| `build`        | `^build`   | `dist/**`, `storybook-static/**`       |
| `check`        | `transit`  | nothing (`apps/docs` adds `.astro/**`) |
| `lint:package` | `build`    | nothing — publint only prints          |
| `dev`          | —          | `cache: false`, `persistent: true`     |

### Why `check` depends on `transit`, not `^check`

Nothing in this repo type-checks against a _built_ dependency. The playgrounds resolve
`@75neo/<framework>` to `packages/<framework>/src` through tsconfig `paths`, and `@75neo/styles`
exports `src` directly — so `check` needs a dependency's **source** hashed into its own cache key,
but never needs that dependency compiled first.

`transit` is a task with no script behind it. Depending on it threads the dependency graph through
each package's hash while leaving all eight checks free to run at once:

```json
"transit": { "dependsOn": ["^transit"] },
"check":   { "dependsOn": ["transit"] }
```

Editing `packages/styles/src` invalidates every downstream `check`; none of them waits on another.
`dependsOn: ["^check"]` would give the same correctness and serialise the whole thing; `dependsOn:
[]` would run them in parallel and cache a stale pass.

### Outputs

`build`'s `outputs` is a union — `dist/**` for the four packages and docs, `storybook-static/**` for
the three playgrounds. A glob that matches nothing in a given package is ignored, so one entry in
the root config beats a package configuration per project. Turborepo _does_ warn when a task
produces no output at all, which is why `check` declares none: `tsBuildInfoFile` is set across the
repo without `incremental`, so tsc, vue-tsc and svelte-check write nothing to disk. `astro check`
is the lone exception — it syncs content-collection types into `.astro` — and says so in
`apps/docs/turbo.json`, the only package configuration here.

`tsconfig.base.json` is in `globalDependencies`: six of the eight projects extend it and none of
them owns it, so nothing else would pull it into a hash. Lockfile and per-package manifests are
hashed by Turborepo already; don't add them.

`pnpm lint:packages` filters to `./packages/*`. Without the filter, `lint:package`'s `dependsOn:
["build"]` would build all three Storybooks and the docs site to check four manifests.

## How the styling actually connects

Read this before touching `packages/styles/src/css` — the mechanism is short, but not obvious from
any one file.

1. **`packages/styles/src/css/`** is the design system as plain CSS: tokens, semantic colour
   utilities, intent palettes, base rules. It assumes Tailwind has already been imported.
2. **`packages/styles/src/themes/`** is one `tailwind-variants` theme per component. This is the
   only place component styling lives.
3. **Component packages** resolve a theme and render the class names it produces. They never spell
   a Tailwind class themselves.
4. **Apps** need exactly two lines:

   ```css
   @import "tailwindcss";
   @import "@75neo/styles/css";
   ```

   plus the `@tailwindcss/vite` plugin (or `@tailwindcss/postcss`).

### The one line that makes it work

Tailwind only emits a class it has seen in a scanned file, and it never scans `node_modules`. The
component themes live in `@75neo/styles` — outside every app's project root. `src/css/index.css`
therefore ends with:

```css
@source "../themes";
```

The path is relative to that CSS file, so it resolves identically in a workspace checkout and in a
consumer's `node_modules`. **This is why component packages must not spell Tailwind classes
themselves** — nothing scans `packages/react/src`. A class written there produces no CSS, the app
renders, and the styles are simply absent.

### Consequences for day-to-day work

- **Styling changes belong in the theme, not in components.** One theme in
  `packages/styles/src/themes/` drives all three frameworks. Adding a variant is a one-file change;
  adding it three times in three components is the wrong instinct here.
- Themes style against **semantic utilities** (`bg-surface`, `text-fg-muted`, `border-line`) and
  **intent roles** (`bg-intent-default`, `text-intent-contrast`), which resolve per colour mode and
  per palette. Never write `dark:` inside a theme, and don't reach for a raw ramp (`bg-zinc-800`).
- After adding a **new** theme, register it in `packages/styles/src/registry.ts`. That is what makes
  it themeable from an app's `ThemeConfig`; nothing else is needed.
- **`tailwind-merge` is what makes overrides work.** Every class a caller supplies is merged, not
  appended, so `className="px-8"` replaces the size variant's `px-4`. A new utility family that
  `tailwind-merge` can't classify needs an entry in `twMergeConfig` in `packages/styles/src/tv.ts` —
  otherwise two conflicting classes both survive and CSS source order decides the winner.

## The design system

`packages/styles/src/css/` is the system proper, in layers. Each one may only reference the layer
above it:

1. **`tokens.css`** — raw values, in a `@theme` block. Most of the system's scales _are_ Tailwind's,
   unchanged: the 0.25rem spacing ramp, breakpoints, container widths, line heights, tracking, and
   `--ease-in-out` (already `cubic-bezier(0.4, 0, 0.2, 1)`, the everyday curve). So are five of the
   six palettes — neutrals are `zinc`, danger is `red`, success is `emerald`, warning is `amber`,
   info is `sky`. What this file adds is the `neo` brand ramp, a rounder radius scale, `--text-2xs`,
   three specialised easings, and the animation keyframes.
2. **`semantic.css`** — what those values _mean_, per colour mode. Page chrome as `--ui-*` custom
   properties under `:root` / `.dark`, exposed as utilities through `@theme inline`.
3. **`intents.css`** — the six intent palettes, each an `@utility` re-pointing the same eight
   `--ui-intent-*` roles.
4. **`base.css`** — the handful of global rules: page background, colour-scheme, `::selection`, and
   one focus ring for the whole system.

### `@theme inline` is load-bearing

The semantic utilities are declared as

```css
@theme inline {
  --color-surface: var(--ui-surface);
}
```

Without `inline`, Tailwind emits `background-color: var(--color-surface)` and resolves
`--color-surface` **once, at `:root`** — freezing every element on the light value. With it, the
`var(--ui-surface)` lands in the utility itself and is resolved at the element, where the nearest
`.dark` ancestor has already had its say. The same applies to `--color-intent-*`, whose value
depends on which `intent-*` class an ancestor carries.

### Shape and intent are separate axes

Every intent palette fills the same eight roles (`subtle`, `muted`, `default`, `emphasized`, `line`,
`fg`, `label`, `contrast`), so a theme writes each _shape_ once and gets every _intent_ for free:

```ts
solid: { base: "bg-intent-default text-intent-contrast hover:bg-intent-emphasized" },
```

`Button` has five variants and six palettes; all thirty combinations exist, none are spelled out.
`Accordion` spends only two of the eight roles, but spends them the same way.

An `intent-*` class sets custom properties and nothing else, and custom properties inherit — so the
class goes on the root element and every descendant follows. That is what Panda's `colorPalette`
used to do, expressed in plain CSS.

Adding an intent is one `@utility` block in `intents.css` and one line per theme — never a new
`variant`. If you find yourself writing a `dangerOutline` variant, you've fused the two axes back
together.

### The contrast rule

`contrast` is picked per palette **and per mode** so it clears WCAG AA (4.5:1) against both
`default` and `emphasized`. That is why the palettes aren't symmetric: `accent`/`danger` carry white
text at their solid steps, while `success`/`warning`/`info` invert in dark mode to a vivid 400 fill
with 950 text, because no green, amber or blue is both recognizable _and_ dark enough for white.

**Changing a solid step means re-checking its `contrast` pair.** The current worst pair is 4.83:1.
`fg-subtle` (3.7:1 in dark) and `fg-disabled` are the two deliberate exceptions, documented at their
definitions.

### Multi-part components are one slot theme, not several themes

An accordion's root, item, trigger, indicator and content are **one** `tv({ slots })` — so `size`,
`variant` and `colorPalette` are chosen once and every part follows.

The framework bindings resolve the theme in `Root` and publish the resulting slot functions, plus
whatever `ui` the caller passed, on a per-framework context — React `createContext`, Vue
`provide`/`inject`, Svelte `setContext`/`getContext` (storing a _getter_, so `$derived` stays
reactive across the boundary). Every part below reads its own class from there, so callers set the
variants once on `Root` and never thread props down the tree.

The parts are exported as a namespace (`export * as Accordion`), matching Ark's own anatomy 1:1 so
their docs transfer: `<Accordion.Root>`, `<Accordion.Item>`, `<Accordion.ItemTrigger>`,
`<Accordion.ItemIndicator>`, `<Accordion.ItemContent>`.

Two deliberate departures from a pure pass-through, in all three frameworks:

- `ItemContent` renders the theme's `itemBody` slot around its children. The open/close animation
  interpolates `height`, and a padded element cannot collapse below its own padding — so the
  padding lives one level in and callers never have to know.
- `ItemIndicator` falls back to a Lucide chevron when given no children, so an accordion works
  without the caller wiring up an icon.

## The customization API

Modelled on [Nuxt UI](https://ui.nuxt.com), adapted to a framework-agnostic library. Four levels,
all of which merge through `tailwind-merge` rather than racing in the cascade:

| Mechanism     | Reaches                      | What it can change                                        |
| ------------- | ---------------------------- | --------------------------------------------------------- |
| `class`       | one element                  | the component's root element                              |
| `ui`          | one component instance       | every slot, by name — set on `Root`, reaches every part   |
| `ThemeConfig` | every component of that type | slots, variants, compound variants, default variants      |
| CSS           | anything                     | Ark's own `data-scope` / `data-part`, from your own sheet |

Priority ascends left to right within a call: theme → `ui` → `class`.

`ThemeConfig` is applied through each framework's provider — React `<NeoUIProvider theme={…}>`, Vue
`app.use(createNeoUI({ theme }))` or `<NeoUIProvider>`, Svelte `<NeoUIProvider theme={…}>`. It is
resolved by `resolveTheme` in `packages/styles/src/registry.ts`, which merges the override into the
built-in theme with `tv({ extend })` and memoises the result on the config object's **identity** —
so a config defined inline in a render function rebuilds every theme it touches on every render.

In `ThemeOverride`, `slots` and `defaultVariants` are typed against the component's real names;
`variants` and `compoundVariants` are typed loosely on purpose, because an override is allowed to
introduce variant _values_ the built-in theme has never heard of.

Note that `tailwind-variants` adds an implicit `base` slot to every slotted theme. For a multi-part
component it has no element behind it; ignore it.

## Framework binding conventions

The three packages deliberately differ, each for a reason:

- **React** — `ark.button` from `@ark-ui/react/factory` for `asChild` support; variant props are
  destructured explicitly; `className` is merged through the slot function.
- **Vue** — written with `defineComponent` + `h()`, **not** SFCs. This is intentional: it keeps
  tsdown able to build the package without a Vue SFC plugin. Every component sets
  `inheritAttrs: false` and merges `attrs.class` itself — Vue's own attribute merging would keep
  both `px-4` and a caller's `px-8` and leave source order to decide.
- **Svelte** — `.svelte` source built by `svelte-package`, since Svelte libraries ship source.
  Props narrow `class` to `string` (`Omit<HTMLButtonAttributes, "class">`) because Svelte 5 types it
  as `ClassValue`, which is wider than what a slot function accepts.

React and Vue build with tsdown; both set `fixedExtension: false` so ESM output lands at `.js` and
the exports map stays simple. `@75neo/styles` builds with tsdown too, but only for publishing: its
`exports` point at `src` so nothing in this workspace needs a build, and `publishConfig` swaps in
the built entry on publish. The CSS is always published as source, because the `@source` inside it
resolves relative to its own location. Run `pnpm lint:packages` after touching any `exports` field.

## Dev loop and apps

**Storybook is the only development surface for components.** A playground is a Storybook and
nothing else — there is no demo page, no `index.html`, no app entry. A component is exercised
through its stories in `apps/playground-<framework>/src/*.stories.*`. Ports: React 6006, Vue 6007,
Svelte 6008. Each preview exposes a **colour mode** toolbar global that toggles `.dark` on the
document element.

Each playground keeps a `vite.config.ts`, because Storybook's Vite builder loads it and merges it
into its own. That is where `@tailwindcss/vite` is registered and where `@75neo/<framework>` is
aliased to `packages/<framework>/src` (`resolve.alias`), mirrored by `tsconfig.json` (`paths`).
Editing a component hot-reloads with no build step. Keep those two in sync — changing one alone
produces either a runtime that disagrees with the types or the reverse.

`apps/docs` is an Astro site that documents the library, styled with the design system it
documents. The pages are **markdown in a content collection** — `src/content/docs/**/*.md`, loaded
by the `glob` loader in `src/content.config.ts` and rendered by the single `src/pages/[...slug].astro`
route. An entry's `id` is its path below `content/docs`, which is also its URL; `index.md` is the
site root.

Adding a page is adding a file: the sidebar is built from the collection, sorted on the `order`
frontmatter and grouped by `section`, so there is no nav list to keep in step. Markdown output
carries no classes, so it is styled by element under `.prose` in `src/styles.css` — written against
the design system's own custom properties rather than `@apply`, which is also what proves the
semantic layer resolves colour mode without a single `dark:`.

Each component page follows Nuxt UI's structure — Usage, Anatomy, the shaping props, API, and a
**Theme** section. That last one is the exception to "just markdown": setting `theme: button` in the
frontmatter appends `ThemeBlock.astro`, which prints the component's theme object imported from
`@75neo/styles` at build time. Markdown cannot import, and transcribing the object by hand is
exactly how docs drift out of step with the code.

There are deliberately **no live component demos**. The docs render markdown only until the library
has enough components to be worth demoing.

Svelte stories use `{#snippet template(args)}` rather than bare children. `@storybook/addon-svelte-csf`
needs the meta `component` to be a plain imported identifier when a story passes children directly,
and the accordion's is `Accordion.Root` — a member expression, which it rejects.

## Repo conventions

- **Shared dependency versions live in the `catalog:` block** of `pnpm-workspace.yaml`. The catalog
  holds only what more than one workspace package depends on — `typescript`, `tailwindcss`,
  `storybook`, the framework runtimes and their type packages — so one bump keeps every consumer in
  lockstep. Those manifests say `"catalog:"` instead of a range; bump them there, not in the
  manifest. A dependency with a single consumer (`astro` in `apps/docs`, `@ark-ui/react` in
  `packages/react`, `oxlint` at the root) keeps its range in that package's own `package.json`,
  where it sits next to the code that uses it. Gaining a second consumer is what promotes it to the
  catalog.
- **Tooling is Oxc**: `oxlint` and `oxfmt` (`.oxlintrc.json`, `.oxfmtrc.json`). Do not add Prettier.
  oxfmt covers `.ts/.tsx/.js/.svelte/.vue/.md/.json`; `.astro` files are not formatted by it.
  `.oxlintrc.json` turns `react/rules-of-hooks` off for the Vue package and playground — Vue's
  composables share React's `use*` naming, and the rule has nothing true to say there.
- The npm scope is lowercase `@75neo` — npm rejects capitalized scopes.
- **Icons come from [Lucide](https://github.com/lucide-icons/lucide)**, never hand-written SVG.
  Each package takes its own binding as a regular dependency: `lucide-react`, `@lucide/vue`,
  `@lucide/svelte`. (`lucide-vue-next` and `lucide-svelte` are deprecated in favour of the
  `@lucide/*` scope; there is no `@lucide/react`, so React keeps the unscoped name.) Svelte imports
  one icon at a time — `@lucide/svelte/icons/chevron-down` — which Lucide recommends so Vite's dev
  server does not have to process the whole barrel.
  Size icons from the theme (`[&_svg]:size-[1em]`) rather than through Lucide's `size` prop, so the
  component's `size` variant stays in charge and a caller-supplied icon is sized the same way.

## CI

`.github/workflows/ci.yml` runs on pushes to `master` and on every pull request: format, lint,
types, build, then publint. Each check is guarded with `!cancelled()` so one push reports every
problem at once rather than one per round trip, and on the install step's outcome so they don't all
run against an empty `node_modules`.

Node and pnpm versions are duplicated into the workflow's `env` because nothing reads `mise.toml`
on CI. The first step re-reads `mise.toml` and fails the run if the two have drifted, so the
duplication can't rot silently. Change both together.

`.turbo/cache` is carried between runs by `actions/cache`, keyed on the commit SHA and restored
from the newest `-turbo-` key — so a re-run of the same commit replays from cache and a new commit
reuses every task whose inputs didn't move. Nothing else about the job changed when Turborepo
landed: the five steps still call the same five root scripts.

To reproduce a CI failure locally, run the same five: `pnpm format:check && pnpm lint && pnpm check
&& pnpm build && pnpm lint:packages`. Add `--force` to a `turbo run` (or `pnpm clean`) if you need
to prove a result came from a real execution rather than the cache.
