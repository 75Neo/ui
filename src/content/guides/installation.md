---
title: Installation
description: Point the shadcn CLI at the registry, add a component, and import the theme stylesheet.
order: 2
---

## Requirements

You need Tailwind CSS v4 and a project the shadcn CLI recognises, which means a `components.json`
at the root. If you do not have one:

```sh
npx shadcn@latest init
```

Vue projects use the Vue fork of the CLI instead:

```sh
npx shadcn-vue@latest init
```

## Register the registry

Add a `registries` entry to `components.json`. React projects point at the `react` path:

```json
{
  "registries": {
    "@75neo": "https://75neo-ui.pages.dev/r/react/{name}.json"
  }
}
```

Vue projects point at the `vue` path:

```json
{
  "registries": {
    "@75neo": "https://75neo-ui.pages.dev/r/vue/{name}.json"
  }
}
```

The two registries publish the same item names. Only the source files behind each name differ, so
the rest of this documentation applies to both.

## Add a component

```sh
npx shadcn@latest add @75neo/button
```

```sh
npx shadcn-vue@latest add @75neo/button
```

The CLI writes three things: the adapter into your UI directory, the shared recipe into your lib
directory, and, the first time you add anything, the theme stylesheet into your project root. It
also installs the npm dependencies the component declares, which are `cn` and `tailwind-variants`
for every component and `@ark-ui/react` or `@ark-ui/vue` for the ones built over Ark UI.

## Import the theme

The theme item is written to `75neo-theme.css` at your project root. Import it after Tailwind in
your global stylesheet:

```css
@import "tailwindcss";
@import "./75neo-theme.css";
```

Order matters. The theme file declares `@theme` tokens that reference Tailwind's own colour scale,
so Tailwind has to be loaded first.

## Turn on dark mode

Dark mode is class based. Put `dark` on an ancestor of the components you want in the dark palette,
usually the `html` element:

```html
<html lang="en" class="dark">
  <!-- ... -->
</html>
```

The theme file defines both palettes, so nothing else is needed. To follow the operating system
preference and remember an explicit choice, set the class before first paint:

```html
<script>
  const stored = localStorage.getItem("theme");
  const dark = stored
    ? stored === "dark"
    : window.matchMedia("(prefers-color-scheme: dark)").matches;

  document.documentElement.classList.toggle("dark", dark);
</script>
```

## Check it works

```tsx
import Button from "@/components/ui/button/Button";

export default function Example() {
  return <Button color="success">It works</Button>;
}
```

```vue
<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
</script>

<template>
  <Button color="success">It works</Button>
</template>
```

If the button renders unstyled, the theme stylesheet is not being imported or Tailwind is not
scanning the directory the CLI wrote to.

## Next

[Customization](/docs/customization) covers retheming and per instance overrides.
