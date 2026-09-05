# AGENTS.md

Guidance for AI agents working in this repo. `CLAUDE.md` is a symlink to this file.

75NeoUI is a component library for React and Vue, built on Ark UI, Tailwind CSS and
Tailwind Variants. `mise install` gets the Node 24 and pnpm 11 the repo expects.

## Gates

Five commands, and the work is done when all five pass:

```sh
pnpm format:check && pnpm lint && pnpm build && pnpm typecheck && pnpm test
```

Build before typecheck: packages resolve each other through `dist`, so stale output
fails the typecheck in the wrong place. `pnpm test` drives real Chromium for both
adapters, and the first run needs `pnpm exec playwright install --with-deps chromium`.

CI runs the same five as parallel jobs, and picks which from the paths a commit touched.
`CI` is the job to require in branch protection: it is the one name that does not move
with the test matrix.

Scoped to one package:

```sh
pnpm --filter @75neo/core test
pnpm --filter @75neo/core exec vitest run -t "lets class beat the ui prop"
```

`@75neo/core` is node-only and fast, so put a test there whenever the behaviour needs no
DOM. `@75neo/themes` carries no tests: it is Tailwind classes, not logic.

## Architecture

Four packages, `core` → `themes` → `react`/`vue`, and two apps that read all four.

- **`@75neo/core`** — the cascade, and nothing else. `resolveTheme`, `layerTheme`, and
  the recipe and registry types. Knows no component.
- **`@75neo/themes`** — tokens in `src/tokens/`, plus one **component module** per
  component in `src/components/`. The module owns everything about a component that is
  not framework-specific: the `tailwind-variants` recipe, its slot and variant types, the
  props type, the registry augmentation, and any rule both adapters would share.
- **`@75neo/react`** / **`@75neo/vue`** — **adapters**. A `Theme` component, one hook or
  composable, and one file per component. Styling stays in the component module.

## The cascade

Read this before touching anything. Four layers set a component's classes, and
`resolveTheme` folds them weakest first:

1. the recipe's own classes;
2. `Theme` layers above the component, already folded into one config by `layerTheme`;
3. the component's own `ui` prop;
4. `class` / `className` at the call site, which reaches the **`base` slot only**.

Tailwind-merge settles conflicts, so a later layer replaces a conflicting utility and
every non-conflicting utility survives. `resolveTheme` hands back finished per-slot
strings, so a component renders `theme.class.base` and merges nothing itself.

`packages/core/src/utils/__tests__/resolve.test.ts` asserts that order and is the
specification. Test cascade behaviour there, in node.

## Slot-name identity

For one component the recipe slot name, the `data-slot` attribute and the `ui` object key
are the same word. One vocabulary, three uses. Every rendered part carries `data-slot`,
and tests select on it.

Two names hold across every component. The root slot is `base`, because `resolveTheme`
sends the call-site `class` there and nowhere else. Icon slots are named for their
position, `leadingIcon` and `trailingIcon`, so `ui.trailingIcon` means the same thing on
Button and on Accordion.

## One token per color

One `--ui-<color>` per semantic color. A recipe that wants a hover shade asks for the same
color at a different strength, `hover:bg-primary/75`. Six strengths cover the library and
are documented in `packages/themes/src/colors.ts`; a seventh means editing the safelist,
which is deliberate friction.

`neutral` has no hue to spend, so it borrows `bg-inverted`, `bg-elevated` and
`ring-accented`. `byColor` and `eachColor` in that same file generate a recipe's color
half — Button's six variants across seven colors is a forty-two cell table for six calls
— and the `neutral` row is written by hand.

Recipes carry tokens rather than hardcoded colors, and no `dark:` classes, because the
tokens flip instead. `oxlint` enforces both against `packages/themes/src/tokens/lint.css`.
`packages/themes/README.md` has the token vocabulary.

## Adding a component

One file per component per package. Registry keys are inline strings (`"button"`).

1. **`packages/themes/src/components/<name>.ts`** — the recipe, its `<Name>Slots` and
   `<Name>Variants` types, `<Name>UI`, `<Name>Theme`, the `<Name>Props<F>` interface (`F`
   is the framework's icon type), the `declare global` registry augmentation, and any rule
   both adapters would otherwise duplicate. Re-export from `src/index.ts`.
2. **`packages/react/src/components/<Name>.tsx`** and
   **`packages/vue/src/components/<Name>.vue`** — call `useResolvedTheme`, then put
   `theme.class.<slot>` on the elements carrying `data-slot`. Export from each package's
   `src/index.ts`.
3. **`apps/playground/src/previews/`** — a `.tsx` and a `.vue` preview, an entry in
   `src/routes.ts`, and a page under `src/pages/`.

Ark UI (`@ark-ui/react`, `@ark-ui/vue`) is the dependency for components that need
behaviour. Its anatomy stays inside the adapter file: ship one component with one prop
API, and let the parts talk to each other through Ark's own context.

Nuxt UI is the reference for naming and API shape. Where it has a counterpart, read it
and adopt its shape rather than inventing one.

## Where the rest lives

- [`packages/AGENTS.md`](packages/AGENTS.md) — writing a recipe: what a `tv()` result
  exposes at runtime, the layout family's shared tokens, Ark's two spellings of disabled,
  and the safelist that interpolated classes render nothing without.
- [`packages/vue/AGENTS.md`](packages/vue/AGENTS.md) — Vue's prop casts, which turn an
  absent boolean into `false` and kill the matching default, and why one component file
  is exported from nothing.
- [`apps/AGENTS.md`](apps/AGENTS.md) — the playground and the docs site: the shell both
  share, client-side routing, how the docs read their API tables out of `packages/*`, and
  the two ways an `.astro` file unhooks itself from the checker.

## MCP servers

`.mcp.json` provides **ArkUI** (component docs and examples) and **Astro docs**. Reach for
them rather than guessing at either API.
