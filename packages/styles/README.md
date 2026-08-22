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
@import "@75neo/styles/css";
```

That is the whole setup. The second import brings in the theme, the semantic utilities
(`bg-surface`, `text-fg-muted`, `border-line`), the six `intent-*` palettes, and a
`@source` pointing at `src/themes` — which is what makes Tailwind emit the classes the
components render. No per-app source configuration, and no build step in this package.

## Layers

Each layer may only reference the one above it:

1. **`css/tokens.css`** — raw values. The `neo` brand ramp plus the handful of scales
   that differ from Tailwind's own (radii, easings, keyframes). The five non-brand
   palettes _are_ Tailwind's: neutrals are `zinc`, danger is `red`, success is `emerald`,
   warning is `amber`, info is `sky`.
2. **`css/semantic.css`** — what those values mean, per colour mode: `bg-canvas`,
   `bg-surface`, `text-fg-muted`, `border-line`, `outline-focus`, `shadow-md`.
3. **`css/intents.css`** — the six intent palettes, each re-pointing the same eight
   `intent-*` roles.
4. **`themes/*.ts`** — components, styled entirely against layers 2 and 3.

Components never reach past layer 2. A theme that writes `bg-neo-600` has hard-coded a
light-mode value; a theme that writes `bg-red-600` has fused shape and intent together.
