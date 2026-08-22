---
title: Button
description: A single element with two independent axes — variant for emphasis, colorPalette for meaning.
section: Components
order: 4
theme: button
---

## Usage

```tsx
import { Button } from "@75neo/react";

<Button>Save</Button>;
```

```vue
<script setup lang="ts">
import { Button } from "@75neo/vue";
</script>

<template>
  <Button>Save</Button>
</template>
```

```svelte
<script lang="ts">
  import { Button } from "@75neo/svelte";
</script>

<Button>Save</Button>
```

Built on Ark UI's polymorphic button factory, so `asChild` renders your own element
instead of a `<button>` while keeping the styling:

```tsx
<Button asChild>
  <a href="/settings">Settings</a>
</Button>
```

## Variant

The emphasis ladder. All five are written against the intent roles, so each one exists in
every palette.

| Variant   | What it is                                                             |
| --------- | ---------------------------------------------------------------------- |
| `solid`   | Highest emphasis: a filled block. One per view, ideally.               |
| `subtle`  | Filled but tinted — a secondary action that still reads as the intent. |
| `outline` | Bordered. The default choice for anything sitting next to a `solid`.   |
| `ghost`   | No chrome until hovered. For toolbars and dense rows.                  |
| `link`    | Reads as a link, behaves as a button. Drops the box entirely.          |

## Color palette

`accent`, `neutral`, `success`, `warning`, `danger`, `info`.

Five variants times six palettes is thirty combinations, and none of them is written out —
each variant is defined once against the `intent-*` roles, and `colorPalette` re-points
those roles. See [Theming](/theming).

## Size

`xs`, `sm`, `md`, `lg` — height, minimum width, padding, gap, radius and type size move
together as one ramp.

`link` deliberately drops the height, padding and radius the size ramp would otherwise
impose, since it is not a box. It keeps the type size.

## API

Everything Ark UI's button accepts falls through, including `asChild` and every native
`<button>` attribute. The props below are the ones this library adds.

| Prop           | Type                                                                    | Default    | Description                                                     |
| -------------- | ----------------------------------------------------------------------- | ---------- | --------------------------------------------------------------- |
| `variant`      | `"solid" \| "subtle" \| "outline" \| "ghost" \| "link"`                 | `"solid"`  | How much emphasis the button carries.                           |
| `colorPalette` | `"accent" \| "neutral" \| "success" \| "warning" \| "danger" \| "info"` | `"accent"` | Which intent palette the variant is drawn from.                 |
| `size`         | `"xs" \| "sm" \| "md" \| "lg"`                                          | `"md"`     | Height, padding, gap, radius and type size, as one ramp.        |
| `fullWidth`    | `boolean`                                                               | `false`    | Stretches the button to its container's width.                  |
| `ui`           | `{ base?: ClassValue }`                                                 | —          | Per-slot class overrides. One element, so this mirrors `class`. |

`disabled` is the native attribute; the theme dims the button and blocks the cursor, which
applies over whatever the variant's hover state does.

### Slots

| Slot   | Element            |
| ------ | ------------------ |
| `base` | The button itself. |
