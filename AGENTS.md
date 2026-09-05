# AGENTS.md

Guidance for AI agents working in this repo. `CLAUDE.md` is a symlink to this file.

75NeoUI ships the same components for React and Vue from one set of styles. `mise install`
gets the Node 24 and pnpm 11 the repo expects.

## Commands

`package.json` lists every script. These are the ones carrying something the scripts do
not say:

| Command          | What to know                                                                                                                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm build`     | Run it after changing a package **another package** imports: they resolve each other through `dist`, so stale output fails `typecheck` in the wrong place. The two apps do not, and need no build |
| `pnpm typecheck` | Depends on `build`                                                                                                                                                                                |
| `pnpm test`      | React and Vue test in real Chromium; the first run needs `pnpm exec playwright install --with-deps chromium`                                                                                      |
| `pnpm dev:play`  | Playground: every component, React and Vue side by side                                                                                                                                           |

Scoped to one package:

```sh
pnpm --filter @75neo/core test
pnpm --filter @75neo/core exec vitest run -t "lets class beat the ui prop"
```

CI runs those five as parallel jobs, and work is done when all five pass locally. Which
of them run is decided by the `changes` job from the paths a commit touched: the `Test`
job is a matrix over the packages whose sources or dependencies changed, so a commit in
`packages/core` tests all three adapters and one in `packages/vue` tests only Vue. `CI`
is the job to require in branch protection, because it is the only name that does not
move with the matrix.

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

Both apps are the same shell: a sticky header carrying a `⌘K` search dialog and the
theme control, a column of every page down the left, and the page itself on a card. The
playground adds the surface control; the docs add the framework switch and a rail of
headings. `apps/playground/src/routes.ts` is the playground's whole list: `previews`,
sorted by name where it is exported rather than kept in order by hand, and `overview`
for the two pages that are not one component. The sidebar, the search dialog and the
404 page read both, so a page reachable from one is reachable from all three.

Both apps reach `@75neo/*` straight into each package's `src`. Nothing about an app goes
through `dist`, so both hot-reload against source with no build step in between and a
prop renamed in a package is wrong in the app immediately rather than after a rebuild.

Each app still declares a `workspace:*` dependency on all four packages, and needs to,
even though it resolves none of them through one. The dependency is the edge turbo reads
to know that a package change invalidates the app: drop it and a package edit leaves a
stale app build cached and green. Resolving to source is a development convenience;
the dependency is the build graph. Both hold at once.

That takes two files per app, and adding a third app means copying both:

- `astro.config.mjs` — a Vite `resolve.alias` entry per package, pointing at
  `packages/<name>/src/index.ts`. This is what the browser sees.
- `tsconfig.json` — a matching `paths` entry per package, so `astro check` reads the
  same source Vite does. Without it TypeScript follows the workspace symlink instead and
  typechecks the app against each package's built `dist` types, which the alias means the
  app never actually loads.

The app stylesheet imports the token layer by relative path for the same reason, so
Tailwind scans the same files.

### The docs site

`apps/docs` is a landing page at `/` plus, under each adapter,
`/docs/<framework>/getting-started`, a component index at `/docs/<framework>/components`
and a page per component at `/docs/<framework>/components/<slug>`. `/docs` redirects
into React. `src/lib/framework.ts` holds everything that differs between the two —
package name, minimum version, icon type, fence language — and every other file asks it
rather than branching on a string.

The site is published to Cloudflare Pages by `.github/workflows/docs.yml`, which builds
it and hands `apps/docs/dist` to `pnpm dlx wrangler pages deploy` under the project name
`75neo-ui`. The account id and API token are repository secrets. Cloudflare serves the
project at the root of its own hostname, so there is no base path and every URL on the
page is the one written; `site` in `astro.config.mjs` is the only place the public
address appears.

The slug is the content file's own name, so `table-of-contents.md` answers at
`/docs/react/components/table-of-contents`. Nothing derives it from the exported
component name, which would have to guess where the words break.

Prose is Markdown in an Astro content collection under `src/content/`. Every props
table, variant list and slot name is read back out of each package's `src` with ts-morph
at build time by `src/lib/component-api.ts`, so a renamed prop either changes the docs or
fails the build and no table is written by hand.

One Markdown file serves both routes. An example is written twice, in a `tsx` fence and
a `vue` fence, and CSS on the page's `data-framework` hides the one that is not the
route's. That is what keeps the content single-source; the alternative was two copies of
every paragraph. Fences in any other language show on both.

Documenting a component is still one file, `src/content/components/<name>.md`, whose
frontmatter names the component, its registry key and its module file. That one file
grows a route under both frameworks, a row in the sidebar, a card on the index, its
place in the previous and next links, and a row in the search dialog, none of which is
written down a second time. There is no order in the frontmatter: the list sorts itself
by name, which is what the sidebar shows and so what the previous and next links have to
walk.

A live specimen is optional and needs a preview per adapter in `src/previews/`, a line
per adapter in **both** `src/components/Preview.astro` and
`src/components/Thumbnail.astro`, and the name in `src/lib/previews.ts`. Those switches
are written out rather than looked up in a table because a client directive has to name
its component through a static import — which is also why there are two of them.
`Preview` hydrates one specimen on a component's own page; `Thumbnail` renders the same
specimen with no client directive at all, so the index can put forty of them on one page
as real markup that ships no JavaScript. A directive is written or not written and
cannot be decided by a prop.

The rail on a component page is two lists joined: the Markdown subheadings `render()`
returns, then the generated API sections, which are rendered by `ComponentApi.astro` and
so listed by hand in `apiSections`.

Astro's checker infers nothing from a Vue component reached through a package barrel
inside an `.astro` file: the props come back as bare attributes and each one is an
error. A local single-file component wrapping the library one is typed the way the
checker expects — `src/previews/InstallCommand.vue` is the example. React components
have no such problem.

`astro.config.mjs` hands the repository root down as `__REPO_ROOT__`, because the
extraction is bundled into a chunk under `dist` before it runs and cannot find
`packages/` from its own location.

The docs use the library for their own chrome. The install command is `Clipboard` and
the rail of headings is `TableOfContents`, each rendered by the adapter its route is
for, so the React route is proof the React adapter works and the Vue route is proof the
Vue one does. The search dialog is the exception: it is a native `dialog` and one
delegated listener, because it stands in chrome both routes share and either adapter's
component would be the wrong one on half the site.

Icons are Lucide, except a brand mark. Lucide dropped those, and a brand mark is the one
glyph that cannot be approximated, so `BrandIcon.astro` looks its path up in
`simple-icons` by slug. The lookup runs at build time and the mark is inlined, so the
package reaches no browser.

Code blocks carry one Shiki theme per mode. Shiki writes the light colors inline and the
dark ones beside them as `--shiki-dark-*` custom properties, and `main.css` spends those
under the root element's `dark` class. The background is not Shiki's in either mode: a
code block sits on `--ui-bg-muted`, the design system's own recessed surface, because the
two themes disagree about what a page is made of and the page wins.

### Client-side routing

Both apps carry `<ClientRouter />`, so a navigation swaps the head and the body instead
of loading a document. Three things follow, and all three are already handled in
`Base.astro` and `Playground.astro`; a new script has to respect them.

**Listeners are delegated from `document`.** A bundled module script runs once for the
visit, and anything it attached to an element in the body is attached to an element that
is gone after the first navigation. So handlers sit on `document` and look their elements
up when they fire.

**The swap rewrites the root element's attributes.** Astro copies them from the incoming
document, which means `data-theme`, `data-surface` and the `dark` class are all gone by
the time the new page is in place. The chosen values are held in the script and put back
on `astro:after-swap`, which runs before the browser paints. Reading the current value
back off the root element instead is the bug this replaced: the theme reverted on every
click of the sidebar.

**The page column is `transition:persist`ed**, so its scroll position survives. The
markup that arrives with the new page is discarded, so its current row is the one from
the page before; a script moves `aria-current` afterwards and the row is painted from
that attribute rather than from a class. In the docs the persist key carries the
framework, so switching adapters replaces the column rather than keeping one full of the
other adapter's links.

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

### The layout family

`App`, `Container`, `Main`, `Header`, `Footer`, `Error` and `Sidebar` are the page's own
furniture and follow Nuxt UI's set. Three rules hold across them.

The measure is one token. `--ui-container` reaches recipes as `max-w-page`, and the
Header and the Footer restate the Container's measure and gutters rather than rendering
one, because composing the component would put `data-slot="base"` on the row instead of
`data-slot="container"` and break slot-name identity. The height is one token too:
`--ui-header-height` reaches recipes as `h-header`, and the Main and the Error subtract
it from the viewport, so a taller bar moves them with it.

`App` is not `Theme`, and both exist. `Theme` restyles a subtree and nests; the App is
the one at the top and adds the locale and the `dir` attribute that every `rtl:` utility
in the library reads. It resolves its own classes against the theme it publishes rather
than the one above it, which is the only component that does.

The Sidebar and the Header keep one DOM tree across both viewports. The Sidebar's narrow
panel is the wide column moved, and the Header's menu is Ark UI's Dialog styled entirely
from the `header` key. Neither composes this library's Dialog, because that would put
half of their appearance behind a key a caller theming a header would not think to look
in.

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
no error — the component simply renders unstyled. The same is true of a variant prefix:
`data-active:text-${color}` needs `data-active:` in that line's brace list before it
generates anything. Check `pnpm dev:play` after adding either, not just `pnpm build`.

**Each `@source inline(...)` goes on one line.** `oxfmt` rejects the wrapped form with
"`@source` paths must be quoted", and reports it against every Vue file rather than
against the CSS, so the error does not name its own cause. The lines are long; leave them
long.

**Ark spells disabled two ways, and which one is per component.** The Accordion trigger
and the Carousel arrows carry the real `disabled` attribute, so style them with
`disabled:`. The Collapsible trigger is a native `button` too, and still carries only
`data-disabled` — Ark guards its click handler itself. Anything Ark renders as a `div`
carries `data-disabled` as well. So read the part's props before choosing, rather than
inferring from the tag. Styling the wrong one fails silently, leaving a disabled control
looking enabled: `pnpm dev:play` is the check.

**A boolean `defineModel` needs `{ default: undefined }`.** Vue casts an absent
Boolean-typed prop to `false`, and `defineModel` declares one, so a `v-model` over a
boolean reaches Ark as an explicit `false` rather than as nothing. That pins the
component to a controlled `false` and silently kills the matching `default*` prop:
Checkbox rendered every `defaultChecked` box unticked in Vue while React was fine. The
type argument has to include `undefined` too, or the option does not typecheck. Ark's
own roots carry the same `void 0` defaults for the same reason.

The same cast catches a plain boolean prop whose default is `true`. A type-based
`defineProps` declares it as a Boolean prop, so leaving it out reaches the component as
`false` and `props.flag ?? true` never fires — ColorPicker's `showInput` rendered no hex
field in Vue while React was fine. Wrap the macro in `withDefaults` and name the default
there. Booleans that default to off need nothing, since off is what the cast produces.

A third case: a prop whose default Ark derives from another one. Naming it in
`withDefaults` with the value `undefined` is what stops the cast, because Vue skips the
cast whenever a default is declared at all, whatever it is. Forwarding the prop as
`undefined` is not enough on its own — a machine spreads its caller's props over its own
defaults, so an explicit `undefined` overwrites the default with nothing and turns the
behaviour off. NumberInput's `allowOverflow` reached Ark that way and no button ever
disabled at the end of its range. Resolve such a prop in the adapter and pass a real
value, in both frameworks, so neither depends on how a machine treats an absent key.

**Two things silently unhook `astro check` from a component's props.** Both end as the
same hint, `'Props' is declared but never used`, which names neither cause. The first is
a prop named `as`: rename it, as `ComponentCard` did. The second is the two characters
that open a closing HTML tag appearing literally anywhere in an `.astro` file's
frontmatter, a comment included — it mis-slices the file for the checker. `CopyMarkdown`
escapes exactly that sequence and describes the escaping without spelling it out.

**Vue needs a file to recurse; React does not.** A `<script setup>` component is the only
thing in Vue that can render itself, which is what a submenu of arbitrary depth needs. So
`packages/vue/src/components/MenuRows.vue` exists, is exported from nothing, and is the
one file in either adapter that is not a component a caller can reach. React has no such
constraint and its half is a local function inside `Menu.tsx`, so there is deliberately no
matching file there. Keep the asymmetry rather than adding a React file to match.

## MCP servers

`.mcp.json` provides **ArkUI** (component docs and examples) and **Astro docs**. Reach for
them rather than guessing at either API.
