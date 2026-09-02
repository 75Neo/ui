# AGENTS.md

Guidance for AI agents working in this repo. `CLAUDE.md` is a symlink to this file.

75NeoUI ships the same components for React and Vue from one set of styles. `mise install`
gets the Node 24 and pnpm 11 the repo expects.

## Commands

`package.json` lists every script. These are the ones carrying something the scripts do
not say:

| Command          | What to know                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| `pnpm build`     | Run it after changing a package another one imports: stale `dist` output fails `typecheck` in the wrong place |
| `pnpm typecheck` | Depends on `build`                                                                                            |
| `pnpm test`      | React and Vue test in real Chromium; the first run needs `pnpm exec playwright install --with-deps chromium`  |
| `pnpm dev:play`  | Playground: every component, React and Vue side by side                                                       |

Scoped to one package:

```sh
pnpm --filter @75neo/core test
pnpm --filter @75neo/core exec vitest run -t "lets class beat the ui prop"
```

CI runs `format:check`, `build`, `test`, `lint`, `typecheck`, in that order. Work is done
when all five pass locally.

`@75neo/core` is node-only and fast, so put a test there whenever the behaviour needs no
DOM. `@75neo/themes` carries no tests: it is Tailwind classes, not logic.

## Architecture

Four packages. The dependency direction is `core` → `themes` → `react`/`vue`.

- **`@75neo/core`** — the cascade, and nothing else. Depends on no other package here.
  Holds `resolveTheme`, `layerTheme`, and the recipe and registry types. Knows nothing
  about any particular component.
- **`@75neo/themes`** — design tokens in `src/tokens/`, plus one **component module** per
  component in `src/components/`. The module owns everything about the component that is
  not framework-specific: the `tailwind-variants` recipe, its slot and variant types, the
  props type, the registry augmentation, and any rule both adapters would share.
- **`@75neo/react`** / **`@75neo/vue`** — **adapters**. Each is a `Theme` component, one
  hook or composable, and one file per component. Styling stays in the component module.

`apps/playground` aliases `@75neo/*` straight to `packages/*/src`, so it hot-reloads
against source. Everything else resolves through `dist`.

### The cascade

The thing to understand before touching anything. Four layers can set a component's
classes, and `resolveTheme` folds them weakest first:

1. the recipe's own classes;
2. `Theme` layers above the component, already folded into one config by `layerTheme`;
3. the component's own `ui` prop;
4. `class` / `className` at the call site, which reaches the **`base` slot only**.

Tailwind-merge settles conflicts, so a later layer replaces a conflicting utility and
non-conflicting utilities from every layer survive. `packages/core/src/utils/__tests__/resolve.test.ts`
asserts that order and is the specification. Test cascade behaviour there, in node.

`resolveTheme` returns finished per-slot strings, so a component renders
`theme.class.base` with no merging of its own.

### Recipes describe themselves

A `tv()` result exposes `variants`, `slots`, `variantKeys` and `defaultVariants` at
runtime, and everything built on a recipe reads them rather than restating them:

- `resolveTheme` reads `variantKeys`, so a new variant resolves with no change to the
  resolver or to any component;
- `variantValues(recipe, "color")` returns the declared values as a literal-typed array,
  which is how the playground previews build their matrix.

### One token per color

There is one `--ui-<color>` per semantic color and no second one. A recipe that wants a
hover shade asks for the same color at a different strength — `hover:bg-primary/75` — not
for a `-elevated` token. Six strengths cover the library and are documented once, in
`packages/themes/src/colors.ts`. Reaching for a seventh means editing the safelist below,
which is deliberate friction.

`neutral` is the exception: no hue to spend, so it borrows `bg-inverted`, `bg-elevated`
and `ring-accented`. Every recipe with a `color` variant generates six entries and writes
the seventh by hand.

### Generated color tables

`byColor` and `eachColor` in `packages/themes/src/colors.ts` build a recipe's color half
instead of it being written out. Button's six variants across seven colors is a
forty-two cell table and costs six calls plus six `neutral` rows. Use them; do not
restate a table.

### Slot-name identity

For a given component the recipe slot name, the `data-slot` attribute and the `ui` object
key are the same word. One vocabulary, three uses. Every rendered part carries
`data-slot`, and tests select on it.

Two names are fixed across every component. The root slot is always `base`, because
`resolveTheme` sends the call-site `class` there and nowhere else. Icon slots are named
for their position, `leadingIcon` and `trailingIcon`, so `ui.trailingIcon` means the same
thing on Button and on Accordion.

## Adding a component

One file per component per package: the component module, the two adapters, the two
previews.

1. **`packages/themes/src/components/<name>.ts`** — the recipe, its `<Name>Slots` and
   `<Name>Variants` types, `<Name>UI`, `<Name>Theme`, the `<Name>Props<F>` interface (`F`
   is the framework's icon type), the `declare global` registry augmentation, and any rule
   both adapters would otherwise duplicate. Re-export from `src/index.ts`. Build the
   `color` variant with `byColor` and its compound rows with `eachColor`, then add the
   `neutral` row by hand.
2. **`packages/react/src/components/<Name>.tsx`** and
   **`packages/vue/src/components/<Name>.vue`** — call `useResolvedTheme`, then put
   `theme.class.<slot>` on elements carrying `data-slot`. Export from each package's
   `src/index.ts`.
3. **`apps/playground/src/previews/`** — a `.tsx` and a `.vue` preview, an entry in
   `src/routes.ts`, and a page under `src/pages/`.

Registry keys are inline strings (`"button"`).

Ark UI (`@ark-ui/react`, `@ark-ui/vue`) is the dependency for components that need
behaviour. Its anatomy stays inside the adapter file: ship one component with one prop
API, and let the parts talk to each other through Ark's own context.

## Constraints worth knowing before you fight them

**`defineProps` cannot consume a derived type.** `@vue/compiler-sfc` resolves types from
source alone and cannot evaluate a recipe's inferred type, so neither
`VariantProps<typeof recipe>` nor a mapped type over `recipe.variants` reaches it as
finite keys, and both fail the Vue build. Component props are written out by hand. The
`ButtonVariantsAreExposed` guard turns "recipe gained a variant, props didn't" into a
typecheck failure naming the variant. Copy that pattern.

**Merge helpers copy, never alias.** `layerTheme` copies nested objects rather than
assigning references, so a `ThemeConfig` stays safe to reuse and to serialize. Tested both
ways.

**Tokens, not hardcoded colors.** `oxlint` enforces this along with class sorting and
conflict rules, against `packages/themes/src/tokens/lint.css`. Recipes carry no `dark:`
classes, because the tokens flip instead. `packages/themes/README.md` has the token
vocabulary.

**Interpolated classes must be safelisted, and fail silently otherwise.** `byColor` and
`eachColor` build classes like `` `bg-${color}/10` ``, which Tailwind's scanner never
meets as a literal. `packages/themes/src/tokens/utilities.css` lists every one with
`@source inline(...)`. A strength used in a recipe but missing there produces no CSS and
no error — the component simply renders unstyled. Check `pnpm dev:play` after adding a
strength, not just `pnpm build`.

**Each `@source inline(...)` goes on one line.** `oxfmt` rejects the wrapped form with
"`@source` paths must be quoted", and reports it against every Vue file rather than
against the CSS, so the error does not name its own cause. The lines are long; leave them
long.

**Ark spells disabled two ways.** A part Ark renders as a native `button` — the Accordion
trigger, the Carousel arrows — carries the `disabled` attribute, so style it with
`disabled:`. A part that is a `div` carries `data-disabled` instead. Styling the wrong one
fails silently: `pnpm dev:play` is the check.

## MCP servers

`.mcp.json` provides **ArkUI** (component docs and examples) and **Astro docs**. Reach for
them rather than guessing at either API.
