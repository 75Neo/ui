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
- **Playgrounds:** Storybook for React (`pnpm dev:react` → http://localhost:6006) and Vue (`pnpm dev:vue` → http://localhost:6007)

## Installation

```bash [pnpm]
pnpm add @75neo/react @75neo/styles
# or for Vue
pnpm add @75neo/vue @75neo/styles
```

```bash [yarn]
yarn add @75neo/react @75neo/styles
# or for Vue
yarn add @75neo/vue @75neo/styles
```

```bash [npm]
npm install @75neo/react @75neo/styles
# or for Vue
npm install @75neo/vue @75neo/styles
```

```bash [bun]
bun add @75neo/react @75neo/styles
# or for Vue
bun add @75neo/vue @75neo/styles
```

### React

1. Import Tailwind CSS, 75NeoUI styles and the React source in your CSS:

```css [app/assets/css/main.css]
@import "tailwindcss";
@import "@75neo/styles";
@source "./node_modules/@75neo/react";
```

> The path in `@source` is **relative to the CSS file**. The playgrounds use `apps/playground-react/src/index.css:1-3` → `@source "../node_modules/@75neo/react"` because the CSS lives in `src/`. For a CSS file at the project root, use `./node_modules/...`.

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

1. Import Tailwind CSS, 75NeoUI styles and the Vue source in your CSS:

```css [app/assets/css/main.css]
@import "tailwindcss";
@import "@75neo/styles";
@source "./node_modules/@75neo/vue";
```

> The playground uses `apps/playground-vue/src/index.css:1-3` → `@source "../node_modules/@75neo/vue"` — same rule, relative to the CSS file.

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

Learn more about theming via CSS variables (`--ui-radius`, `--ui-primary`, …) and `ui` slot overrides in `packages/styles/src/css/colors.css:1-258` and `packages/styles/src/types/theme.ts:1-7`.

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

# build all packages (styles → react/vue → apps)
pnpm build

# playgrounds
pnpm dev:react   # Storybook React on http://localhost:6006
pnpm dev:vue     # Storybook Vue   on http://localhost:6007
pnpm dev:docs    # Astro docs

# quality checks (see AGENTS.md)
pnpm typecheck
pnpm lint
pnpm format:check
pnpm lint:packages
```

Follow the setup in `mise.toml:1-3` (`mise install` gives Node 24 + pnpm 11) and `package.json:31-33` (`node >=24`, `pnpm ^11.20.0`).

## Credits

- [ark-ui/ark](https://github.com/chakra-ui/ark)
- [tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss)
- [heroui-inc/tailwind-variants](https://github.com/heroui-inc/tailwind-variants)
- [vercel/turborepo](https://github.com/vercel/turborepo)

## License

MIT
