<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/banner-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="assets/banner-light.png">
  <img alt="75NeoUI — One design system, two frameworks. React • Vue • Ark UI • Tailwind CSS" src="assets/banner-dark.png" width="100%">
</picture>

# 75NeoUI

75NeoUI builds on [Ark UI](https://ark-ui.com), [Tailwind CSS](https://tailwindcss.com) and
[Tailwind Variants](https://www.tailwind-variants.org) to ship sophisticated, accessible,
performant interfaces — one design system, two frameworks.

Every token, variant and interaction is tuned for clarity, rhythm and comfort, so
interfaces stay consistent and quietly confident at any scale.

## Installation

```sh
pnpm add @75neo/react   # or @75neo/vue
```

Both adapters pull `@75neo/themes` in with them. Swap `pnpm add` for `npm install`,
`yarn add` or `bun add` as you prefer. React needs 18 or newer, Vue 3.5 or newer.

Then import Tailwind CSS and the theme in your stylesheet:

```css
@import "tailwindcss";
@import "@75neo/themes";
```

That one import ships the tokens, the `dark` variant and the base layer. Dark mode is a
`.dark` class on a root element, and nothing else needs wiring.

## Usage

```tsx
import { Button } from "@75neo/react";

export function App() {
  return (
    <>
      <Button variant="solid" color="primary">
        Get started
      </Button>
      <Button variant="soft" color="neutral" loading>
        Saving
      </Button>
    </>
  );
}
```

```vue
<script setup lang="ts">
import { Button } from "@75neo/vue";
</script>

<template>
  <Button variant="solid" color="primary">Get started</Button>
  <Button variant="soft" color="neutral" loading>Saving</Button>
</template>
```

## Theming

Three ways to restyle, from broadest to narrowest.

**Redefine the tokens** in your own CSS, after the import. Every value is a plain custom
property, and both themes flip with it:

```css
:root {
  --ui-radius: 0.75rem;
  --ui-primary: var(--color-teal-600);
}
```

**Wrap a subtree in `Theme`** to restyle every component below it. Nesting composes:

```tsx
<Theme theme={{ button: { ui: { base: "rounded-full" }, props: { color: "neutral" } } }}>
  <Button>Rounded and neutral by default</Button>
</Theme>
```

**Pass `ui` to one component** to restyle that call alone. The keys are the component's
slots:

```tsx
<Button ui={{ base: "rounded-full", label: "tracking-wide" }}>One-off</Button>
```

All three settle through one cascade: the recipe, then `Theme` layers, then the `ui` prop,
then `class` on the base slot. Tailwind-merge resolves conflicts, so a later layer replaces
a conflicting utility and everything else survives.
[`packages/themes/README.md`](packages/themes/README.md) has the token vocabulary.

## Documentation

- **Docs site:** `pnpm dev:docs` runs `apps/docs`
- **Playground:** `pnpm dev:play` renders every component in React and Vue side by side

## Local development

```sh
mise install   # Node 24 and pnpm 11
pnpm install
pnpm build     # core → themes → react/vue → apps
```

Before opening a pull request, run what CI runs: `pnpm format:check`, `pnpm build`,
`pnpm test`, `pnpm lint`, `pnpm typecheck`.

## Contributing

Thank you for considering contributing to 75NeoUI. Open an issue with a minimal
reproduction for a bug, or an issue or discussion for a proposal.

> [!TIP]
> [`AGENTS.md`](AGENTS.md) carries the contributing guidelines in the form AI coding agents
> pick up automatically: project commands, architecture, quality checks and workflow.
