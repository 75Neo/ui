# @75neo/styles

The design system every 75NeoUI package shares: the Tailwind theme, and one
[`tailwind-variants`](https://www.tailwind-variants.org) theme per component.

```
src/
  css/          the Tailwind layer — tokens, semantic colours, intent palettes, base rules
  themes/       one tv() theme per component; the only place styling lives
  tv.ts         the configured tv() entry point (tailwind-merge groups)
  registry.ts   the theme registry and an app's override merging
```

## In an app

```css
/* main.css */
@import "tailwindcss";
@import "@75neo/styles";
```

That is the whole setup. The second import brings in the theme, the semantic utilities
(`bg-elevated`, `text-muted`, `ring-accented`), the seven `intent-*` palettes, and a
`@source` pointing at the bundled themes beside it — which is what makes Tailwind emit
the classes the components render. No per-app source configuration.

One specifier serves both halves of the package: Tailwind resolves a CSS `@import` under
the `style` condition and gets `dist/style.css`, while `import { button } from "@75neo/styles"`
gets the JavaScript.

Everything is static CSS. There is no module to install and no generator to run, so an
app changes a palette, a ramp or the radius scale by redefining a custom property rather
than by reconfiguring Tailwind.

## Layers

Each layer may only reference the one above it:

1. **`css/tokens.css`** — raw values. The seven palette ramps, and the radius scale
   derived from `--ui-radius`. Each palette is one Tailwind ramp: `primary` and `success`
   are `green`, `secondary` and `info` are `blue`, `warning` is `yellow`, `error` is
   `red`, `neutral` is `slate`.
2. **`css/semantic.css`** — what those values mean, per colour mode: `bg-default`,
   `bg-elevated`, `text-muted`, `border-accented`, `text-inverted`. A palette resolves to
   one colour here — step 500 in light, 400 in dark — and every tint a component needs is
   an alpha modifier away (`bg-primary/10`).
3. **`css/intents.css`** — the seven intent palettes, each re-pointing one `--ui-intent`
   property.
4. **`themes/*.ts`** — components, styled entirely against layers 2 and 3.

Components never reach past layer 2. A theme that writes `bg-slate-800` has hard-coded a
light-mode value; a theme that writes `bg-red-500` has fused shape and intent together.
