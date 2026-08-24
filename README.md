# 75NeoUI

An [Ark UI](https://ark-ui.com) + [Tailwind CSS](https://tailwindcss.com) component library, shipped
for **React**, **Vue** and **Svelte** from a single set of styles.

One design system, three framework bindings. A component's styling is written once, as a
[`tailwind-variants`](https://www.tailwind-variants.org) theme in `@75neo/styles`; each framework
package is a thin binding that renders the class names that theme produces. Adding a variant is a
one-file change, not the same change made three times.

```
packages/
  styles/     @75neo/styles   the Tailwind layer + one tailwind-variants theme per component
  react/      @75neo/react    components for React
  vue/        @75neo/vue      components for Vue
  svelte/     @75neo/svelte   components for Svelte
  tooling/    @75neo/tooling  shared TypeScript and tsdown config (private)
apps/
  playground-react|vue|svelte  Storybook per framework
  docs/                        Astro documentation site
```

## Using it in an app

```sh
pnpm add @75neo/react tailwindcss
```

```css
/* main.css */
@import "tailwindcss";
@import "@75neo/styles";
```

That is the whole setup. The second import brings in the design tokens, the semantic utilities, the
intent palettes, and a `@source` pointing at the bundled themes — which is what makes Tailwind
emit the classes the components render. There is nothing per-app to configure.

```tsx
import { Button } from "@75neo/react";

<Button color="error" variant="outline" label="Delete" />;
```

## How the styling fits together

Styling lives in exactly one place — `packages/styles/src`:

- `css/tokens.css` — raw values. The seven palette ramps, the radius scale and the animation
  keyframes. Every other scale is Tailwind's own, unchanged.
- `css/semantic.css` — the colour-mode-aware surface components style against (`bg-elevated`,
  `text-muted`, `ring-accented`, …). Components never write `dark:` themselves.
- `css/intents.css` — seven intent palettes, each re-pointing one `--ui-intent` property.
- `themes/*.ts` — one `tailwind-variants` theme per component, shared by all three frameworks.

Two ideas carry most of the weight. **A palette is one colour, not a ramp** — `bg-primary` is a
single value per colour mode, and every tint a component needs is an alpha modifier away
(`bg-primary/10`). And **shape and colour are separate axes** — a theme writes each shape once
against `intent-*`, so six button variants across seven palettes are six lines plus seven, not
forty-two.

The whole system is static CSS. There is no module to install and no generator to run: an app
rebrands by redefining custom properties on `:root`, never by reconfiguring Tailwind.

## Customizing

Four levels, all merged through `tailwind-merge` — an override _replaces_ what it conflicts with
rather than racing it in the cascade.

```tsx
// one element
<Button className="rounded-full px-8">Save</Button>

// one component instance, every slot by name
<Accordion items={items} ui={{ trigger: "font-semibold", body: "text-toned" }} />

// every component of that type, app-wide
const theme: ThemeConfig = { button: { slots: { base: "rounded-full" } } };

<NeoUIProvider theme={theme}>
  <App />
</NeoUIProvider>;
```

Vue installs the same config with `app.use(createNeoUI({ theme }))`; Svelte wraps the app in
`<NeoUIProvider {theme}>`. Below all of that, Ark's own `data-scope` / `data-part` attributes are
always there for a stylesheet to target. See the docs site for the full API.

## Development

```sh
pnpm install
pnpm dev:react   # Storybook for one framework — the usual way to work
pnpm dev         # all three Storybooks in parallel
pnpm dev:docs    # the docs site
```

**Storybook is the development space.** A component is exercised through its stories; each
playground's `dev` script starts that framework's Storybook, with a colour-mode toggle in the
toolbar.

| Framework | Storybook (`pnpm dev:<fw>`) |
| --------- | --------------------------- |
| React     | http://localhost:6006       |
| Vue       | http://localhost:6007       |
| Svelte    | http://localhost:6008       |

Each playground aliases `@75neo/<framework>` straight to `packages/<framework>/src`, so editing a
component hot-reloads with **no build step in the loop**. There is no code generation step either;
Tailwind reads the design system straight from source, so a fresh clone works after `pnpm install`
alone.

### Adding a component

1. Add its theme in `packages/styles/src/themes/` and register it in `registry.ts`.
2. Implement it in each framework package on top of the matching Ark UI primitive, rendering the
   class names the theme produces (see `button` for the reference implementation).
3. Export it from that package's `src/index.ts` and write its story in
   `apps/playground-<framework>/src/`, then add a markdown page under
   `apps/docs/src/content/docs/components/`. The docs sidebar is built from that collection, so
   there is no nav to update.

Component packages must not spell Tailwind classes themselves — nothing scans them, so a class
written there produces no CSS.

### Scripts

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

## Acknowledgements

The component API — the prop names, the slot names, and the four-level `class` / `ui` /
`ThemeConfig` / CSS customization model — follows [Nuxt UI](https://ui.nuxt.com). It is a
well-designed surface, and there was no reason to invent a different one.

[Ark UI](https://ark-ui.com) supplies the headless, accessible behaviour underneath every component,
[Tailwind CSS](https://tailwindcss.com) the utility layer,
[tailwind-variants](https://www.tailwind-variants.org) the theming primitive, and
[Lucide](https://lucide.dev) the icons.

## License

MIT
