# AGENTS.md

Guidance for AI agents working in this repo. `CLAUDE.md` is a symlink to this file.

75NeoUI is a component library for React and Vue, built on Ark UI, Tailwind CSS,
`cva` and `cn`. `mise install` gets the Node 24 and pnpm 11 the repo expects.

## Gates

Five commands, and the work is done when all five pass:

```sh
pnpm format:check && pnpm lint && pnpm build && pnpm typecheck && pnpm test
```

Build before typecheck: packages resolve each other through `dist`, so stale output
fails the typecheck in the wrong place. `pnpm test` is a no-op until something worth
testing appears.

CI runs the same five as parallel jobs, and picks which from the paths a commit touched.
`CI` is the job to require in branch protection: it is the one name that does not move
with the test matrix.

Scoped to one package:

```sh
pnpm --filter @75neo/react build
```

## Architecture

Three packages, `themes` → `react`/`vue`, and two apps that read all three.

- **`@75neo/themes`** — tokens in `src/tokens/`, the configured `cn` in `src/cn.ts`,
  the shared vocabulary in `src/colors.ts`, and one **data module** per component in
  `src/components/`. The module owns everything about a component that is not
  framework-specific: literal types, defaults, the schema object, per-part class data,
  the shared props interfaces, and any rule both adapters would share. It holds no
  `cva` call and no framework code.
- **`@75neo/react`** / **`@75neo/vue`** — **adapters**. A directory per component, one
  file per anatomy part, in both adapters alike. Each part builds its own `cva` from
  the shared data and merges the call site through `cn`.

## One layer

Read this before touching anything. A part's classes come from exactly one place —
its own `cva` call — merged with the call site through `cn`:

```tsx
className={cn(triggerCva({ variant, size }), className)}
```

`cn` settles conflicts, so a later class replaces a conflicting utility and every
non-conflicting utility survives. There is no theme cascade, no `ui` prop, no
`Theme` component, and no `tailwind-variants`: every one of those died in the
migration and must not be reintroduced.

One consequence lands on callers rather than on us. Every variant prefix is its own
conflict group, so an unprefixed `bg-error` never overrides a `disabled:bg-primary`
baked into a part. Reskinning a state means reaching for the same prefix, and the
docs teach that where reskinning is taught.

## Part-name identity

For one component the export name, the file name and the `data-slot` attribute are
the same word in three spellings. One vocabulary, three uses. Every rendered part
carries `data-slot`, including internal spans that are never exported, and tests
select on it.

Three rules hold across every component. The root exports under the bare component
name (`Accordion`, never `AccordionRoot`), because subpaths already disambiguate.
Ark's `Item`-prefixed parts keep the prefix (`AccordionItemTrigger`), because
Select's `Indicator` and `ItemIndicator` collapse onto each other without it.
Icons are props and children, never parts: `leadingIcon` and `trailingIcon` name
positions, so the glyph on Button and the chevron on Accordion arrive the same way.

## One token per color

One `--ui-<color>` per semantic color. A part that wants a hover shade asks for the same
color at a different strength, `hover:bg-primary/75`. Six strengths cover the library and
are documented in `packages/themes/src/colors.ts`; a seventh means editing the safelist,
which is deliberate friction.

`neutral` has no hue to spend, so it borrows `bg-inverted`, `bg-elevated` and
`ring-accented`. `byColor` and `eachColor` in that same file generate a component's color
half — Button's six variants across seven colors is a forty-two cell table for six calls
— and the `neutral` row is written by hand.

Parts carry tokens rather than hardcoded colors, and no `dark:` classes, because the
tokens flip instead. `oxlint` enforces both against `packages/themes/src/tokens/lint.css`.
`packages/themes/README.md` has the token vocabulary.

## Adding a component

A directory per component per package, tail-only file names (`accordion/item-trigger.tsx`).
Registry keys are inline strings (`"button"`).

1. **`packages/themes/src/components/<name>.ts`** — literal types, defaults, the schema
   object, per-part class data with one compound interface per `cva`, the shared
   `<Name>…Props` interfaces, and any rule both adapters would otherwise duplicate.
   Re-export from `src/index.ts`.
2. **`packages/react/src/<name>/`** and **`packages/vue/src/<name>/`** — one file per
   part plus `index.ts`, and a `variants.ts` wherever more than one part reads the
   root's axes. Export from each package's `src/index.ts`, add the tsdown entry and the
   exports-map lines, and the alias lines in both apps.
3. **`apps/playground/src/previews/`** — a `.tsx` and a `.vue` preview reading the
   schema object, an entry in `src/routes.ts`, and a page under `src/pages/`.
4. **`apps/docs`** — a `.md` under `src/content/components/`, a preview pair, lines in
   both preview switches, and `PARTS` entries in the docs reader.

Ark UI (`@ark-ui/react`, `@ark-ui/vue`) is the dependency for components that need
behaviour. Its anatomy stays inside the adapter files: ship one export per part with
one prop API, and let the parts talk to each other through Ark's own context. The
variant context beside them is ours — the root's multi-part axes with defaults
fallback — and Ark's state stays Ark's.

Nuxt UI is the reference for naming and API shape. Where it has a counterpart, read it
and adopt its shape rather than inventing one.

## Where the rest lives

- [`packages/AGENTS.md`](packages/AGENTS.md) — writing a data module: what the schema
  object carries, the layout family's shared tokens, Ark's two spellings of disabled,
  the variant context beside the root, minimal motion, and the safelist that
  interpolated classes render nothing without.
- [`packages/vue/AGENTS.md`](packages/vue/AGENTS.md) — Vue's prop casts, which turn an
  absent boolean into `false` and kill the matching default, and why one rows file
  is exported from nothing.
- [`apps/AGENTS.md`](apps/AGENTS.md) — the playground and the docs site: the shell both
  share, client-side routing, how the docs read their API tables out of `packages/*`, and
  the two ways an `.astro` file unhooks itself from the checker.

## MCP servers

`.mcp.json` provides **ArkUI** (component docs and examples) and **Astro docs**. Reach for
them rather than guessing at either API.
