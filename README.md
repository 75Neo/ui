<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/banner-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="assets/banner-light.png">
  <img alt="75NeoUI — One design system, two frameworks. React • Vue • Ark UI • Tailwind CSS" src="assets/banner-dark.png" width="100%">
</picture>

# 75NeoUI

75NeoUI harnesses the combined strengths of [Ark UI](https://ark-ui.com), [Tailwind CSS](https://tailwindcss.com) and [Tailwind Variants](https://www.tailwind-variants.org) to offer a refined set of tools for building sophisticated, accessible and highly performant interfaces — one design system, two frameworks.

Thoughtfully crafted for products people live in. Every token, variant and interaction is tuned for clarity, rhythm and comfort — so interfaces feel modern, consistent and quietly confident at any scale.

## Documentation

Visit the documentation to explore components, theming and design tokens.

- **Docs site:** `apps/docs` (Astro) — run `pnpm dev:docs` locally
- **Playground:** `apps/playground` (Astro) — run `pnpm dev:play` locally, every component rendered in React and Vue side by side

## Installation

```bash [pnpm]
pnpm add @75neo/react @75neo/themes
# or for Vue
pnpm add @75neo/vue @75neo/themes
```

```bash [yarn]
yarn add @75neo/react @75neo/themes
# or for Vue
yarn add @75neo/vue @75neo/themes
```

```bash [npm]
npm install @75neo/react @75neo/themes
# or for Vue
npm install @75neo/vue @75neo/themes
```

```bash [bun]
bun add @75neo/react @75neo/themes
# or for Vue
bun add @75neo/vue @75neo/themes
```

### React

1. Import Tailwind CSS and the 75NeoUI theme in your CSS:

```css [app/assets/css/main.css]
@import "tailwindcss";
@import "@75neo/themes";
```

That single import ships the tokens, the `dark` variant, and the base layer. Dark mode is a `.dark` class on a root element; nothing else needs wiring. See `packages/themes/README.md` for the token vocabulary and `packages/themes/src/tokens/colors.css:1-387` for every custom property.

2. Use components:

```tsx [app.tsx]
import { Button, Theme } from "@75neo/react";

export function App() {
  return (
    <Theme>
      <Button variant="solid" color="primary">
        Get started
      </Button>
      <Button variant="soft" color="neutral" loading>
        Saving
      </Button>
    </Theme>
  );
}
```

### Vue

1. Import Tailwind CSS and the theme — same CSS as above:

```css [app/assets/css/main.css]
@import "tailwindcss";
@import "@75neo/themes";
```

2. Use components:

```vue [App.vue]
<script setup lang="ts">
import { Button, Theme } from "@75neo/vue";
</script>

<template>
  <Theme>
    <Button variant="solid" color="primary">Get started</Button>
    <Button variant="soft" color="neutral" :loading="true">Saving</Button>
  </Theme>
</template>
```

Learn more about theming via CSS variables (`--ui-radius`, `--ui-primary`, …) and `ui` slot overrides in `packages/themes/README.md` and `packages/core/src/types/theme.ts:1-32`. The cascade order (recipe → `Theme` layers → `ui` prop → `class` on the base slot) is asserted in `packages/core/src/utils/__tests__/resolve.test.ts`.

## Contribution

Thank you for considering contributing to 75NeoUI.

- **Reporting bugs:** open an issue with a minimal reproduction.
- **Suggestions:** open an issue or discussion — we love thoughtful proposals.

> [!TIP]
> We provide contributing guidelines through [`AGENTS.md`](https://github.com/75Neo/ui/blob/main/AGENTS.md) for AI assistants to help you contribute to 75NeoUI. It is automatically picked up by all AI coding agents and guides through project commands, quality checks and workflow.

## Local Development

```sh
# install
pnpm install

# build all packages (core → themes → react/vue → apps)
pnpm build

# playground and docs
pnpm dev:play   # Astro playground on http://localhost:4321
pnpm dev:docs   # Astro docs

# quality checks (see AGENTS.md)
pnpm typecheck
pnpm lint
pnpm format:check
```

Follow the setup in `mise.toml:1-3` (`mise install` gives Node 24 + pnpm 11) and `package.json:31-33` (`node >=24`, `pnpm ^11.20.0`).

## Credits

- [ark-ui/ark](https://github.com/chakra-ui/ark)
- [tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss)
- [heroui-inc/tailwind-variants](https://github.com/heroui-inc/tailwind-variants)
- [vercel/turborepo](https://github.com/vercel/turborepo)

## License

MIT
