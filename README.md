# 75NeoUI

An [Ark UI](https://ark-ui.com) + [Tailwind CSS](https://tailwindcss.com) component library, shipped
for **React**, **Vue** and **Svelte** from a single set of styles.

```
packages/
  styles/     @75neo/styles   the Tailwind layer + one tailwind-variants theme per component
  react/      @75neo/react    components for React
  vue/        @75neo/vue      components for Vue
  svelte/     @75neo/svelte   components for Svelte
apps/
  playground-react|vue|svelte  Storybook per framework
  docs/                        Astro documentation site
```

## Getting started

```sh
pnpm install
pnpm dev:react   # Storybook for one framework — the usual way to work
pnpm dev         # all three Storybooks in parallel
pnpm dev:docs    # the docs site
```

There is no code generation step; Tailwind reads the design system straight from source.

**Storybook is the development space.** A component is exercised through its stories; each
playground's `dev` script starts that framework's Storybook, with a colour-mode toggle in the
toolbar.

| Framework | Storybook (`pnpm dev:<fw>`) |
| --------- | --------------------------- |
| React     | http://localhost:6006       |
| Vue       | http://localhost:6007       |
| Svelte    | http://localhost:6008       |

Each playground aliases `@75neo/<framework>` straight to `packages/<framework>/src`, so editing a
component hot-reloads with **no build step in the loop**.

## Using it in an app

```sh
pnpm add @75neo/react tailwindcss
```

```css
/* main.css */
@import "tailwindcss";
@import "@75neo/styles/css";
```

That is the whole setup. The second import brings in the theme, the semantic utilities, the intent
palettes, and a `@source` pointing at the component themes — which is what makes Tailwind emit the
classes the components render.

```tsx
import { Button } from "@75neo/react";

<Button colorPalette="danger" variant="outline">
  Delete
</Button>;
```

## How the styling fits together

Styling lives in exactly one place — `packages/styles/src`:

- `css/tokens.css` — raw values. Most scales are Tailwind's own; this adds the `neo` brand ramp, a
  rounder radius scale and the animation keyframes.
- `css/semantic.css` — the colour-mode-aware surface components style against (`bg-surface`,
  `text-fg-muted`, `border-line`, …). Components never write `dark:` themselves.
- `css/intents.css` — six intent palettes, each re-pointing the same eight `intent-*` roles.
- `themes/*.ts` — one `tailwind-variants` theme per component, shared by all three frameworks.

Shape and intent are separate axes: a theme writes each shape once against the `intent-*` roles, and
every palette comes for free. Adding a variant means editing one theme, not three components.

## Customizing

Four levels, all merged through `tailwind-merge` — an override _replaces_ what it conflicts with
rather than racing it in the cascade.

```tsx
// one element
<Button className="rounded-full px-8">Save</Button>

// one component instance, every slot by name
<Accordion.Root ui={{ itemTrigger: "font-semibold", itemBody: "text-fg" }} />

// every component of that type, app-wide
const theme: ThemeConfig = { button: { slots: { base: "rounded-full" } } };

<NeoUIProvider theme={theme}>
  <App />
</NeoUIProvider>;
```

Vue installs the same config with `app.use(createNeoUI({ theme }))`; Svelte wraps the app in
`<NeoUIProvider {theme}>`. See the docs site for the full API.

## Adding a component

1. Add its theme in `packages/styles/src/themes/` and register it in `registry.ts`.
2. Implement it in each framework package on top of the matching Ark UI primitive, rendering the
   class names the theme produces (see `button` for the reference implementation).
3. Export it from that package's `src/index.ts` and write its story in
   `apps/playground-<framework>/src/`, then add a markdown page under
   `apps/docs/src/content/docs/components/`. The docs sidebar is built from that collection, so
   there is no nav to update.

Component packages must not spell Tailwind classes themselves — nothing scans them, so a class
written there produces no CSS.

## Scripts

| Command              | What it does                                           |
| -------------------- | ------------------------------------------------------ |
| `pnpm dev`           | All three Storybooks                                   |
| `pnpm dev:<fw>`      | Storybook for one framework                            |
| `pnpm dev:docs`      | The Astro docs site                                    |
| `pnpm build`         | Builds every package, plus each Storybook and the docs |
| `pnpm check`         | Type-checks every workspace project                    |
| `pnpm lint`          | oxlint across the repo                                 |
| `pnpm lint:packages` | publint — validates the publishable package manifests  |
| `pnpm format`        | oxfmt                                                  |

Linting and formatting both come from [Oxc](https://oxc.rs) — `oxlint` and `oxfmt`. oxfmt covers
`.ts`, `.tsx`, `.js`, `.svelte`, `.vue`, `.md` and `.json`; `.astro` files in `apps/docs` are not
formatted by it.

Third-party versions are pinned once in the `catalog:` block of `pnpm-workspace.yaml`; package
manifests reference `"catalog:"` instead of a range, so a bump happens in one place.
