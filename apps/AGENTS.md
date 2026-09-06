# The two apps

`apps/playground` renders every component in React and Vue side by side.
`apps/docs` is the published documentation site. The root [`AGENTS.md`](../AGENTS.md)
carries the library itself.

## Both apps read package source

Each app aliases `@75neo/*` straight into each package's `src`, so both hot-reload
against source with no build step between and a renamed prop is wrong in the app
immediately. That takes two files per app, and a third app means copying both:

- `astro.config.mjs` — a Vite `resolve.alias` entry per package, pointing at
  `packages/<name>/src/index.ts`, plus one entry per component subpath, pointing at
  `packages/<name>/src/<component>/index.ts`. This is what the browser sees.
- `tsconfig.json` — a matching `paths` entry per package, plus `"@75neo/<pkg>/*"` to
  `"../../packages/<pkg>/src/*/index.ts"`, so `astro check` reads the same
  source Vite does. Without it TypeScript follows the workspace symlink and typechecks
  the app against `dist` types the app never loads.

The app stylesheet imports the token layer by relative path for the same reason, so
Tailwind scans the same files.

Each app still declares a `workspace:*` dependency on all three packages, and needs to.
The dependency is the edge turbo reads to know a package change invalidates the app: drop
it and a package edit leaves a stale app build cached and green. Resolving to source is a
development convenience; the dependency is the build graph.

## The shell

Both apps are the same shell: a sticky header carrying a `⌘K` search dialog and the theme
control, a column of every page down the left behind a hairline, and the page itself on
the page's own surface. The playground renders every specimen on the one solid surface —
tinted page, flat card, no switcher — and the docs add the framework switch and a rail
of headings behind a second hairline.

**Neither app redefines a `--ui-*` token.** The bar is `h-header`, the measure is
`max-w-page`, the gutters are the Container's `px-5 sm:px-8 lg:px-12`, and every corner
comes off the `--ui-radius` scale, so the chrome is built out of the same numbers as the
components standing in it. The one thing each app declares for itself is the two webfont
faces, because serving a font is the application's job and the system ships none. A
measurement that is not already a token belongs in the design system first.

`src/lib/controls.ts` in each app is the rest of that rule: the class strings for the
icon button, the floating panel and its rows, copied from the old header and menu
recipes. The chrome is hand-written markup, which is a reason to write the elements out
and not a licence to give them a second appearance.

`apps/playground/src/routes.ts` is the playground's whole list: `previews`, sorted by name
where it is exported rather than kept in order by hand, and `overview` for the two pages
that are not one component. The sidebar, the search dialog and the 404 page read both, so
a page listed in one is listed in all three.

The search dialog is a native `dialog` and one delegated listener in both apps, because it
stands in chrome both routes share and either adapter's component would be the wrong one
on half the site. The docs chrome renders the library where it can — the install command
and the rail of headings reach for `Clipboard` and `TableOfContents`, each rendered by the
adapter its route is for, so the React route is proof the React adapter works — and wears
temporary native markup wherever those components have not migrated yet.

Icons are Lucide, except a brand mark. Lucide dropped those, so `BrandIcon.astro` looks
its path up in `simple-icons` by slug. The lookup runs at build time and the mark is
inlined, so the package reaches no browser.

## Client-side routing

Both apps carry `<ClientRouter />`, so a navigation swaps the head and the body instead of
loading a document. Three things follow. All three are handled in `Base.astro` and
`Playground.astro`; a new script has to respect them.

**Listeners are delegated from `document`.** A bundled module script runs once for the
visit, so anything it attached to an element in the body is attached to an element that is
gone after the first navigation. Handlers sit on `document` and look their elements up
when they fire.

**The swap rewrites the root element's attributes.** Astro copies them from the incoming
document, so `data-theme` and the `dark` class are gone by the time the
new page is in place. The chosen values are held in the script and put back on
`astro:after-swap`, which runs before the browser paints. Reading the current value back
off the root element is the bug this replaced: the theme reverted on every sidebar click.

**The page column is `transition:persist`ed**, so its scroll position survives. The markup
arriving with the new page is discarded, so its current row is the one from the page
before; a script moves `aria-current` afterwards and the row is painted from that
attribute rather than from a class. In the docs the persist key carries the framework, so
switching adapters replaces the column rather than keeping one full of the other
adapter's links.

## The docs site

`apps/docs` is a landing page at `/` plus, under each adapter,
`/docs/<framework>/getting-started`, a component index at `/docs/<framework>/components`
and a page per component at `/docs/<framework>/components/<slug>`. `/docs` redirects into
React. `src/lib/framework.ts` holds everything that differs between the two — package
name, minimum version, icon type, fence language — and every other file asks it rather
than branching on a string.

Prose is Markdown in an Astro content collection under `src/content/`. Documenting a
component is one file, `src/content/components/<name>.md`, whose frontmatter names the
component, its data-module key and its directory. That file grows a route under both
frameworks, a row in the sidebar, a card on the index, its place in the previous and next
links, and a row in the search dialog. The list sorts itself by name, which is what the
sidebar shows and so what the previous and next links walk. The slug is the file's own
name, so `table-of-contents.md` answers at `/docs/react/components/table-of-contents`.

One Markdown file serves both routes. An example is written twice, in a `tsx` fence and a
`vue` fence, and CSS on the page's `data-framework` hides the one that is not the route's.
Fences in any other language show on both.

Every props table, variant list and part name is read back out of each package's `src`
with ts-morph at build time by `src/lib/component-api.ts`, so a renamed prop either
changes the docs or fails the build. Variants come from the schema object, parts from the
descriptor the data module carries beside it, and the per-part props from the shared
contract plus each adapter's file. `astro.config.mjs` hands the repository root down as
`__REPO_ROOT__`, because the extraction is bundled into a chunk under `dist` before it
runs and cannot find `packages/` from its own location.

The rail on a component page is two lists joined: the Markdown subheadings `render()`
returns, then the generated API sections, which `ComponentApi.astro` renders per part and
`apiSections` lists by hand.

A live specimen is optional. It needs a preview per adapter in `src/previews/`, a line per
adapter in **both** `src/components/Preview.astro` and `src/components/Thumbnail.astro`,
and the name in `src/lib/previews.ts`. Those switches are written out rather than looked
up in a table because a client directive has to name its component through a static
import, which is also why there are two files. `Preview` hydrates one specimen on a
component's own page; `Thumbnail` renders the same specimen with no client directive at
all, so the index can put forty of them on one page as markup that ships no JavaScript.

Every page's Markdown is also served raw, by `src/pages/raw/[...slug].md.ts`, at
`/raw/getting-started.md` and `/raw/components/<slug>.md`. `PageActions` is what a reader
reaches it through: a copy button for the source, and a menu offering the file itself or
the same address handed to an assistant. One route serves both frameworks, because the
Markdown does.

Code blocks carry one Shiki theme per mode. Shiki writes the light colors inline and the
dark ones beside them as `--shiki-dark-*` custom properties, which `main.css` spends under
the root element's `dark` class. The background is the design system's own `--ui-bg-muted`
in both modes, because the two Shiki themes disagree about what a page is made of and the
page wins.

The site is published to Cloudflare Pages by `.github/workflows/docs.yml`, under the
project name `75neo-ui`. Cloudflare serves it at the root of its own hostname, so there is
no base path and every URL on the page is the one written; `site` in `astro.config.mjs` is
the only place the public address appears.

## Two ways an `.astro` file unhooks from the checker

Both end as the same hint, `'Props' is declared but never used`, which names neither
cause.

The first is a prop named `as`. Rename it, as `ComponentCard` did.

The second is the two characters that open a closing HTML tag, appearing literally
anywhere in the frontmatter, a comment included: they mis-slice the file for the checker.
`PageActions` escapes exactly that sequence and describes the escaping without spelling
it out.

Astro's checker also infers nothing from a Vue component reached through a package barrel
inside an `.astro` file: the props come back as bare attributes and each one is an error.
A local single-file component wrapping the library one is typed the way the checker
expects. React components have no such problem.
