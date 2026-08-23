---
title: Button
description: Two independent axes — variant for emphasis, color for meaning — plus icons, a loading state and a square mode.
section: Components
order: 4
theme: button
---

## Usage

```tsx
import { Button } from "@75neo/react";

<Button label="Save" />;
```

```vue
<script setup lang="ts">
import { Button } from "@75neo/vue";
</script>

<template>
  <Button label="Save" />
</template>
```

```svelte
<script lang="ts">
  import { Button } from "@75neo/svelte";
</script>

<Button label="Save" />
```

`label` renders inside the `label` slot, which truncates. Passing children instead
replaces that slot entirely, for a button whose content is not a single string.

Built on Ark UI's polymorphic button factory, so `asChild` renders your own element
instead of a `<button>` while keeping the styling:

```tsx
<Button asChild>
  <a href="/settings">Settings</a>
</Button>
```

## Variant

The emphasis ladder. All six are written once against the `intent-*` roles, so each one
exists in every palette.

| Variant   | What it is                                                                 |
| --------- | -------------------------------------------------------------------------- |
| `solid`   | Highest emphasis: a filled block. One per view, ideally.                   |
| `outline` | Bordered, with a transparent fill that tints on hover.                     |
| `soft`    | A tint with no border — a secondary action that still reads as the colour. |
| `subtle`  | `soft` with `outline`'s ring: the tint and the edge together.              |
| `ghost`   | No chrome until hovered. For toolbars and dense rows.                      |
| `link`    | Reads as a link, behaves as a button.                                      |

## Color

`primary`, `secondary`, `success`, `info`, `warning`, `error`, `neutral`.

Six variants times seven palettes is forty-two combinations, and only the six `neutral`
pairs are written out. Every other variant is defined once against the `intent-*` roles,
and `color` re-points them. See [Theming](/theming).

`neutral` is the exception because a neutral control is not a grey-hued version of a
coloured one — it is drawn from the background ramp (`bg-elevated`, `ring-accented`,
`text-default`) so that it recedes rather than reading as an eighth hue.

## Size

`xs`, `sm`, `md`, `lg`, `xl` — padding, gap, type size and icon size move together as one
ramp. Nothing sets a height, so a button grows with its own content and lines up with an
input of the same size without either being told a pixel value.

## Icons

`icon` places one icon on whichever side is appropriate: leading by default, trailing when
`trailing` is set. `leadingIcon` and `trailingIcon` are absolute and can be combined.

```tsx
<Button icon={PlusIcon} label="Add item" />
<Button icon={ArrowRightIcon} trailing label="Continue" />
<Button leadingIcon={SearchIcon} trailingIcon={ArrowRightIcon} label="Search" />
```

Icons come from [Lucide](https://lucide.dev) — the components themselves, not icon names,
since this library has no icon resolver. Their size comes from the `size` variant, so a
caller-supplied icon is sized the same way a built-in one is.

### Square

A button with no `label` and no children gets equal padding on all sides, without `square`
being passed. Give it an `aria-label`, since there is no text to read.

```tsx
<Button icon={PlusIcon} aria-label="Add item" />
```

### Loading

`loading` replaces whichever icon is already showing with a spinner and disables the
button. When neither side has an icon, the spinner leads.

## API

Everything Ark UI's button accepts falls through, including `asChild` and every native
`<button>` attribute. The props below are the ones this library adds.

| Prop           | Type                                                                                   | Default                | Description                                                   |
| -------------- | -------------------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------- |
| `label`        | `string`                                                                               | —                      | The button's text. Ignored when children are given.           |
| `icon`         | Icon component                                                                         | —                      | Placed by `leading` / `trailing`; leads by default.           |
| `leading`      | `boolean`                                                                              | —                      | Forces `icon` to the leading side.                            |
| `leadingIcon`  | Icon component                                                                         | —                      | Shown before the label, whatever `icon` is doing.             |
| `trailing`     | `boolean`                                                                              | —                      | Forces `icon` to the trailing side.                           |
| `trailingIcon` | Icon component                                                                         | —                      | Shown after the label, whatever `icon` is doing.              |
| `loading`      | `boolean`                                                                              | `false`                | Swaps the showing icon for a spinner and disables the button. |
| `loadingIcon`  | Icon component                                                                         | Lucide `loader-circle` | The spinner.                                                  |
| `variant`      | `"solid" \| "outline" \| "soft" \| "subtle" \| "ghost" \| "link"`                      | `"solid"`              | How much emphasis the button carries.                         |
| `color`        | `"primary" \| "secondary" \| "success" \| "info" \| "warning" \| "error" \| "neutral"` | `"primary"`            | Which palette the variant is drawn from.                      |
| `size`         | `"xs" \| "sm" \| "md" \| "lg" \| "xl"`                                                 | `"md"`                 | Padding, gap, type size and icon size, as one ramp.           |
| `block`        | `boolean`                                                                              | `false`                | Full width, with the trailing icon pushed to the far edge.    |
| `square`       | `boolean`                                                                              | inferred               | Equal padding on all sides. Inferred when there is no label.  |
| `ui`           | `{ base?, label?, leadingIcon?, trailingIcon? }`                                       | —                      | Per-slot class overrides.                                     |

`disabled` is the native attribute; the theme dims the button and blocks the cursor, which
applies over whatever the variant's hover state does. `aria-disabled` is styled the same
way, for a button that must stay focusable.

### Slots

| Slot           | Element                         |
| -------------- | ------------------------------- |
| `base`         | The button itself.              |
| `label`        | The text, when `label` is used. |
| `leadingIcon`  | The icon before the label.      |
| `trailingIcon` | The icon after the label.       |
