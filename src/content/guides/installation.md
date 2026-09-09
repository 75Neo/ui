---
title: Installation
description: Set your project up with one command, then add components.
order: 2
---

## Prerequisites

A React or Vue project with [Tailwind CSS v4](https://tailwindcss.com) installed.

## Set up

```sh
npx @75neo/ui@latest init
```

This writes a `75neoui.json`, installs `@75neo/ui`, and adds the theme tokens and the animation
stylesheet to your Tailwind entry file. It detects your framework and that file on its own; pass
`--framework` or `--css` if it guesses wrong.

## Add a component

```sh
npx @75neo/ui@latest add button
```

Name as many as you like, or pass `--all`. The command writes the adapter into your UI directory,
the shared recipe into your lib directory, and installs the npm packages the component declares.

## Turn on dark mode

Dark mode is class based. Put `dark` on an ancestor of the components you want in the dark palette,
usually the `html` element:

```html
<html lang="en" class="dark">
  <!-- ... -->
</html>
```

To follow the operating system preference and remember an explicit choice, set the class before
first paint:

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

If the button renders unstyled, either the theme tokens are missing from the file named in
`75neoui.json`, or Tailwind is not scanning the directory the CLI wrote to.

## Next

[Customization](/docs/customization) covers retheming and per instance overrides.
