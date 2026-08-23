# AGENTS.md

This file provides guidance to coding agents (Claude Code and others following the AGENTS.md convention)
when working with code in this repository.

## What this is

75NeoUI: an [Ark UI](https://ark-ui.com) + [Tailwind CSS](https://tailwindcss.com) component library
published for **three frameworks at once** — React, Vue and Svelte — from a single shared set of
styles. `packages/styles` is the design system; `packages/react|vue|svelte` are thin framework
bindings over it; `packages/tooling` holds the TypeScript and tsdown config they all share; `apps/*`
are development surfaces, plus the docs site.

pnpm workspace, Node 24 (see `mise.toml`). Two components so far, and between them they are the
reference implementation for every pattern below: `Button` for single-element components, and
`Accordion` for multi-part ones.

**The API shape is settled, and consistency with it beats invention.** A component is **one
component driven by props, with a named slot for every part a caller might want to replace** — not
Ark's anatomy re-exported as a namespace of sub-components. Ark supplies the headless behaviour
underneath and nothing more; where its anatomy already gives a part somewhere to live, this library
adds no wrapper of its own. When a new component raises a question the existing two have already
answered — how a slot is named, how `ui` and `class` merge, which axes a theme carries — follow
`Button` and `Accordion` rather than reaching for a different shape.

**The default theme is deliberately small.** Every component ships the least it can: the axes it
genuinely needs and no more, on the reasoning that an extra variant is a `ui` prop or a
`ThemeConfig` away for anyone who wants it, while a variant nobody asked for is three frameworks'
worth of surface to keep in step. Adding an axis to a theme is a decision to justify, not a default.

The design system in `packages/styles/src/css` is that theme as **static CSS** — no module to
install, no generator to run, and nothing for an app to configure beyond two `@import` lines.

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

`turbo.json` is the task graph, and every root script except `lint`, `format` and `clean` is a thin
`turbo run <task>` delegate — **task logic belongs in the package's own `package.json`**, never in a
root script that loops over directories.

`check` depends on a scriptless `transit` task rather than on `^check`, because nothing here
type-checks against a _built_ dependency: the playgrounds resolve `@75neo/<framework>` to
`packages/<framework>/src` through tsconfig `paths`, and `@75neo/styles` exports `src` directly.
Editing `packages/styles/src` therefore invalidates every downstream `check`, but none of the eight
waits on another.

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
- Themes style against **semantic utilities** (`bg-elevated`, `text-muted`, `ring-accented`) and
  **the current intent** (`bg-intent`, `text-intent`, and alpha steps of both), which resolve per
  colour mode and per palette. Never write `dark:` inside a theme, and don't reach for a raw ramp
  (`bg-slate-800`).
- After adding a **new** theme, register it in `packages/styles/src/registry.ts`. That is what makes
  it themeable from an app's `ThemeConfig`; nothing else is needed.
- **`tailwind-merge` is what makes overrides work.** Every class a caller supplies is merged, not
  appended, so `className="px-8"` replaces the size variant's `px-2.5`. A new utility family that
  `tailwind-merge` can't classify needs an entry in `twMergeConfig` in `packages/styles/src/tv.ts` —
  otherwise two conflicting classes both survive and CSS source order decides the winner.
- **A `compoundVariants` entry's `class` must be a string or an object keyed by slot.**
  `tailwind-variants` _silently ignores_ an array there, so `class: ["a", "b"]` type-checks,
  compiles and styles nothing. Write `class: { base: ["a", "b"] }`.

## The design system

`packages/styles/src/css/` is the system proper, in layers. Each one may only reference the layer
above it:

1. **`tokens.css`** — raw values. The seven palette ramps as `--ui-color-{name}-{shade}`, the
   radius scale derived from `--ui-radius`, and the animation keyframes. Everything else is
   Tailwind's own scale, unchanged: the 0.25rem spacing ramp, breakpoints, container widths, line
   heights, tracking, easings and the default font stacks.
2. **`semantic.css`** — what those values _mean_, per colour mode: `--ui-{palette}`, and the
   `--ui-text-*` / `--ui-bg-*` / `--ui-border-*` ramps under `:root` / `.dark`, exposed as utilities
   through `@theme inline`.
3. **`intents.css`** — the seven intent palettes, each an `@utility` re-pointing `--ui-intent`.
4. **`base.css`** — the handful of global rules: page background, colour-scheme, and the one
   Chromium link-outline reset. Deliberately **no** global focus ring.

### A palette is one colour, not a ramp

`bg-primary` is step 500 in light mode and step 400 in dark. Every other shade a component needs is
reached with an alpha modifier — `bg-primary/10` for a tint, `ring-primary/50` for a border,
`hover:bg-primary/75` for a hover step. That is why the palettes carry no per-role bookkeeping and
why adding one is a single line.

The seven are `primary` (green), `secondary` (blue), `success` (green), `info` (blue), `warning`
(yellow), `error` (red) and `neutral` (slate). `neutral-*` shadows Tailwind's own neutral ramp;
Tailwind's is kept reachable as `old-neutral-*`, so nothing is lost.

### `@theme inline` is load-bearing

The semantic utilities are declared as

```css
@theme default inline {
  --background-color-elevated: var(--ui-bg-elevated);
}
```

Without `inline`, Tailwind emits `background-color: var(--background-color-elevated)` and resolves
it **once, at `:root`** — freezing every element on the light value. With it, the
`var(--ui-bg-elevated)` lands in the utility itself and is resolved at the element, where the
nearest `.dark` ancestor has already had its say. The same applies to `--color-intent`, whose value
depends on which `intent-*` class an ancestor carries.

Note the **namespaced** theme keys. `--text-color-muted` and `--background-color-muted` are
different values — a mid-grey for secondary copy, and a barely-there tint. Declaring them in
Tailwind's per-utility namespaces rather than the shared `--color-*` one is what lets `text-muted`
and `bg-muted` each mean the right thing.

### Shape and intent are separate axes

The obvious way to colour a component is one compound variant per colour × variant pair, which only
stays manageable if a build step generates them. This library has no build step, so it does the job
the other way round: an `intent-*` class re-points `--ui-intent` and a theme writes each _shape_
once against it.

```ts
solid: { base: "text-inverted bg-intent hover:bg-intent/75" },
```

`Button` has six variants and seven palettes; all forty-two combinations exist, written as six
shapes plus seven one-line palettes, and only the six `neutral` pairs are spelled out.

An `intent-*` class sets one custom property and nothing else, and custom properties inherit — so
the class goes on the root element and every descendant follows.

Adding an intent is one `@utility` block in `intents.css` and one line per theme — never a new
`variant`. If you find yourself writing an `errorOutline` variant, you've fused the two axes back
together.

### Contrast, and why `neutral` is the exception

Contrast is handled by **inverting, not by tuning**. Text on a filled control is `text-inverted`:
white in light mode, near-black in dark. Paired with a palette that is a 500 in light and a lighter
400 in dark, the filled shape reads the same way in both modes for every hue — including the yellows
and greens that cannot carry white text at any recognisable brightness. There is no per-palette
contrast table to keep in step.

`neutral` is the exception to the intent mechanism, in every theme. A neutral control is drawn from
the background ramp (`bg-inverted`, `bg-elevated`, `ring-accented`, `text-default`) so that it
recedes rather than reading as an eighth hue, which cannot be expressed by re-pointing
`--ui-intent`. Themes spell those pairs out in `compoundVariants`.

### Focus is per component, not global

There is no global `:focus-visible` rule. Each component carries its own — a wide, translucent halo
in its own palette, `outline-intent/25 focus-visible:outline-3`. A component with no colour axis
names a palette outright (`outline-primary/25`). Don't reintroduce a system-wide ring; it would
fight every component that already has one.

### Multi-part components are one slot theme, not several themes

An accordion's root, item, trigger, icons, label and content are **one** `tv({ slots })`, so a
variant is chosen once and every part follows. Slot names describe the part, not the framework
primitive behind it.

The accordion's theme carries **no** `size`, `variant` or `color` axis — it is flat dividers and
nothing else. A boxed or tinted accordion is a `ui` prop or a `ThemeConfig` away. Its only variant is `disabled`, applied **per row** by passing
`item.disabled` to the `trigger` slot function rather than to the theme.

### A multi-part component is one component, not a namespace of parts

`<Accordion :items="items">` — one component, driven by a list, with a **named slot for every part
a caller might want to replace**. Ark's five parts are an implementation detail; they are not the
API. That is the shape every multi-part component here takes.

There is no `Accordion.Root` / `Accordion.Item` namespace, and no context passing slot functions
down a tree: one component renders the whole thing, so it simply has the resolved theme in scope.

Each framework spells the slots its own way, and each is handed `{ item, index, open }`:

| Slot       | Vue         | React      | Svelte             |
| ---------- | ----------- | ---------- | ------------------ |
| the label  | `#default`  | `children` | `children` snippet |
| `leading`  | `#leading`  | `leading`  | `leading` snippet  |
| `trailing` | `#trailing` | `trailing` | `trailing` snippet |
| `content`  | `#content`  | `content`  | `content` snippet  |
| `body`     | `#body`     | `body`     | `body` snippet     |

An item may name a `slot`, which gives that row its own pair on top of those — `{slot}` for its
whole panel, `{slot}-body` for what sits inside it. Vue resolves those as real named slots; React
and Svelte take a `slots` record keyed by the same names, because neither has dynamic slot names.

Three deliberate departures from a pure pass-through, in all three frameworks:

- The panel's padding lives in a `body` element rendered inside `content`. The open/close animation
  interpolates `height`, and a padded element cannot collapse below its own padding — so the
  padding lives one level in and callers never have to know.
- `trailing` falls back to a Lucide chevron, so an accordion works without the caller wiring up an
  icon. An item's `icon` and `trailingIcon` are icon _components_, not names — this library has no
  icon resolver, and Lucide ships components. The chevron is a bare icon rather than Ark's
  `ItemIndicator`: the theme rotates it through the trigger's own `group`, so the extra element
  would have nothing to do.
- Only the presentational props are declared. Everything Ark's root accepts (`multiple`,
  `collapsible`, `defaultValue`, …) is passed straight through, so Ark's documentation transfers
  without the library re-declaring its API.

## The customization API

Four levels, all of which merge through `tailwind-merge` rather than racing in the cascade:

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
- **Vue** — `<script setup>` SFCs, compiled by `unplugin-vue` at build time, so the published
  package is plain JavaScript and a consumer needs no Vue plugin of their own. Two things are not
  the idiomatic default:
  - Props are declared **at runtime** (`defineProps(buttonProps)` against an object in a plain
    `.ts` file) rather than with `defineProps<ButtonProps>()`. `ButtonVariants` is
    `VariantProps<typeof button>`, a mapped type the SFC compiler cannot reduce to a list of prop
    names — a type-only declaration compiles to a component with no props at all, and every
    variant arrives as an attribute instead. The runtime object is also what lets `Root` and
    `RootProvider` share one set of props.
  - Every component sets `inheritAttrs: false` and binds `useSplitAttrs()`'s `otherAttrs` rather
    than `$attrs`, because `v-bind="$attrs"` next to a `:class` makes Vue _concatenate_ the two
    class lists — `px-4` and a caller's `px-8` would both survive, leaving source order to decide.
    The caller's class goes through the theme's slot function instead, where `tailwind-merge`
    resolves it.
- **Svelte** — `.svelte` source built by `svelte-package`, since Svelte libraries ship source.
  Props narrow `class` to `string` (`Omit<HTMLButtonAttributes, "class">`) because Svelte 5 types it
  as `ClassValue`, which is wider than what a slot function accepts.

React and Vue build with tsdown, from `defineLibrary()` in `@75neo/tooling` — one shared config,
which is where `fixedExtension: false` comes from, so ESM output lands at `.js` and the exports map
stays simple. Vue adds the two things a component library of SFCs needs: `unplugin-vue` to compile
them, and `dts: { vue: true }` to put `vue-tsc` behind the declaration build so the emitted
`.d.ts` describes props and slots rather than `any`. `@75neo/styles` builds with tsdown too, but
only for publishing: its `exports` point at `src` so nothing in this workspace needs a build, and
`publishConfig` swaps in the built entry on publish. The CSS is always published as source, because
the `@source` inside it resolves relative to its own location. Run `pnpm lint:packages` after
touching any `exports` field.

Nothing from `node_modules` belongs in a published bundle, so the shared config sets
`deps.onlyBundle: []` and anything that lands there fails the build. `packages/vue` is the one
exception, and says so: vue-tsc's declarations name two `tailwind-variants` types that live in an
internal chunk of that package, so they cannot be re-imported and are inlined into `index.d.ts`.

None of the SFCs carry a `<style>` block — styling is the theme's job. Adding one would make tsdown
emit a CSS file the exports map doesn't mention and make `sideEffects: false` a lie, so put the
classes in `packages/styles/src/themes` instead.

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

`apps/docs` is an Astro site that documents the library, styled with the design system it documents.
The pages are **markdown in a content collection** (`src/content/docs/**/*.md`), so adding a page is
adding a file — the sidebar is built from the collection, sorted on the `order` frontmatter and
grouped by `section`, and an entry's path below `content/docs` is its URL. Setting `theme: button`
in the frontmatter appends `ThemeBlock.astro`, which prints the component's theme object imported
from `@75neo/styles` at build time rather than leaving it to be transcribed by hand. There are
deliberately **no live component demos** yet.

Svelte stories use `{#snippet template(args)}` rather than bare children, which keeps every story
in the file uniform and works regardless of what the meta's `component` is.

## Shared config lives in `@75neo/tooling`

`packages/tooling` is a private workspace package — never published, depended on as
`"@75neo/tooling": "workspace:*"` by every other package and app. It ships no build step; both
halves are consumed as source.

- **`tsconfig/`** — `base.json` is the whole workspace's TypeScript baseline. `react.json`,
  `vue.json` and `svelte.json` layer the framework bits on top, the latter two by extending the
  upstream config first (`["@vue/tsconfig/tsconfig.dom.json", "./base.json"]`) so our baseline wins
  the overlap. A consumer extends one of the four and adds only what is genuinely local — its
  `include`, its `tsBuildInfoFile`, an app's `types` and `paths`. A compiler option that would be
  right for every package belongs in `base.json`, not repeated four times.
- **`src/tsdown.ts`** — `defineLibrary(overrides?)` returns the build config each publishable
  package's `tsdown.config.ts` exports. It imports `tsdown` for types only, so there is nothing to
  resolve at runtime beyond the file itself.

The upstream `@vue/tsconfig` and `@tsconfig/svelte` are dependencies of `packages/tooling` alone —
an `extends` resolves from the config file that spells it, which is now inside this package, so no
consumer needs them any more.

## Repo conventions

- **Shared dependency versions live in the `catalog:` block** of `pnpm-workspace.yaml`. The catalog
  holds only what more than one workspace package depends on — `typescript`, `tailwindcss`,
  `storybook`, the framework runtimes and their type packages — so one bump keeps every consumer in
  lockstep. Those manifests say `"catalog:"` instead of a range; bump them there, not in the
  manifest. A dependency with a single consumer (`astro` in `apps/docs`, `@ark-ui/react` in
  `packages/react`, `@vue/tsconfig` in `packages/tooling`, `oxlint` at the root) keeps its range in
  that package's own `package.json`, where it sits next to the code that uses it. Gaining a second
  consumer is what promotes it to the catalog.
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
  Size icons from the theme (`size-4`, `size-5`, … on the icon's own slot) rather than through
  Lucide's `size` prop, so the component's `size` variant stays in charge and a caller-supplied icon
  is sized the same way.

## CI

`.github/workflows/ci.yml` runs the same five root scripts on every push to `master` and every pull
request, each guarded so that one push reports every problem at once rather than one per round trip.
Run the five to reproduce a CI failure locally:

```sh
pnpm format:check && pnpm lint && pnpm check && pnpm build && pnpm lint:packages
```

Add `--force` to a `turbo run` (or `pnpm clean`) if you need to prove a result came from a real
execution rather than the cache. The toolchain comes from `mise.toml` by way of `jdx/mise-action`,
so Node and pnpm are pinned in one place, and `.github/dependabot.yml` batches weekly dependency
updates into one PR per framework.
