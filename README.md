# 75NeoUI

An [Ark UI](https://ark-ui.com) + [Panda CSS](https://panda-css.com) component library, shipped
for **React**, **Vue** and **Svelte** from a single set of styles.

```
packages/
  styles/     @75neo/styles   Panda preset (tokens, recipes) + generated runtime
  react/      @75neo/react    components for React
  vue/        @75neo/vue      components for Vue
  svelte/     @75neo/svelte   components for Svelte
apps/
  playground-react|vue|svelte  Vite dev app + Storybook per framework
  docs/                        Astro documentation site
```

## Getting started

```sh
pnpm install     # also runs `panda codegen` for @75neo/styles
pnpm dev:react   # Storybook for one framework — the usual way to work
pnpm dev         # styles watcher + all three Storybooks in parallel
```

**Storybook is the development space.** A component is exercised through its stories; each
playground's `dev` script starts that framework's Storybook.

| Framework | Storybook (`pnpm dev:<fw>`) | Vite demo app (`pnpm dev:app:<fw>`) |
| --------- | --------------------------- | ----------------------------------- |
| React     | http://localhost:6006       | http://localhost:5173               |
| Vue       | http://localhost:6007       | http://localhost:5174               |
| Svelte    | http://localhost:6008       | http://localhost:5175               |

The Vite apps are a lightweight way to see a component outside Storybook; they are secondary.

Both surfaces alias `@75neo/<framework>` straight to `packages/<framework>/src`, so editing a
component hot-reloads with **no build step in the loop**.

## How the styling fits together

Styling lives in exactly one place — `packages/styles/src`:

- `theme/tokens.ts` — raw values (color scales, radii, fonts).
- `theme/semantic-tokens.ts` — the light/dark-aware surface components style against (`bg.surface`,
  `fg.muted`, `border.accent`, …). Components never branch on `_dark` themselves.
- `recipes/*.ts` — one recipe per component, shared by all three frameworks.

`panda codegen` turns that preset into a runtime the component packages import
(`@75neo/styles/css`, `@75neo/styles/recipes`). The apps load the same preset and run their own
Panda extraction, which is what emits the CSS. Two settings connect the halves:

- `importMap: "@75neo/styles"` — tells Panda that `@75neo/styles/css` imports are its own.
- `include: [..., "../../packages/<framework>/src/**"]` — scans the library sources so the
  component recipes reach the output.

Adding a variant therefore means editing one recipe, not three components.

## Adding a component

1. Add its recipe in `packages/styles/src/recipes/` and register it in `recipes/index.ts`.
2. Implement it in each framework package on top of the matching Ark UI primitive, applying the
   recipe's class names (see `button` for the reference implementation).
3. Export it from that package's `src/index.ts` and write its story in
   `apps/playground-<framework>/src/`. The story is what you develop against — wiring the
   component into the playground's `App` page is optional.

## Scripts

| Command              | What it does                                           |
| -------------------- | ------------------------------------------------------ |
| `pnpm dev`           | Styles watcher + all three Storybooks                  |
| `pnpm dev:<fw>`      | Storybook for one framework                            |
| `pnpm dev:app:<fw>`  | The Vite demo app for one framework                    |
| `pnpm build`         | Builds every package, plus each Storybook and the docs |
| `pnpm check`         | Type-checks every workspace project                    |
| `pnpm lint`          | oxlint across the repo                                 |
| `pnpm lint:packages` | publint — validates the publishable package manifests  |
| `pnpm format`        | oxfmt                                                  |
| `pnpm codegen`       | Regenerates `packages/styles/styled-system`            |

Linting and formatting both come from [Oxc](https://oxc.rs) — `oxlint` and `oxfmt`. oxfmt covers
`.ts`, `.tsx`, `.js`, `.svelte`, `.vue`, `.md` and `.json`; `.astro` files in `apps/docs` are not
formatted by it.

Third-party versions are pinned once in the `catalog:` block of `pnpm-workspace.yaml`; package
manifests reference `"catalog:"` instead of a range, so a bump happens in one place.
