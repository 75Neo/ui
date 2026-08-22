---
title: 75NeoUI
navLabel: Introduction
description: An Ark UI + Tailwind CSS component library, shipped for React, Vue and Svelte from a single set of styles.
section: Guide
order: 1
---

## Packages

| Package         | What it is                                     |
| --------------- | ---------------------------------------------- |
| `@75neo/react`  | Components for React 18+                       |
| `@75neo/vue`    | Components for Vue 3.5+                        |
| `@75neo/svelte` | Components for Svelte 5                        |
| `@75neo/styles` | The Tailwind layer and one theme per component |

Components are built on [Ark UI](https://ark-ui.com), so behaviour, accessibility and
state are Ark's and this library supplies the styling. Anatomy matches Ark's 1:1, which
means Ark's own documentation transfers directly.

## Installation

```sh
pnpm add @75neo/react tailwindcss
```

Then pull the design system into your stylesheet. Order matters — everything
`@75neo/styles/css` defines extends Tailwind's own theme, so Tailwind has to be loaded
first.

```css
/* main.css */
@import "tailwindcss";
@import "@75neo/styles/css";
```

That is the whole setup. The second import carries a `@source` pointing at the component
themes inside the package, which is what makes Tailwind emit the classes the components
render. There is nothing else to configure — no plugin, no content globs, no preset.

You will also need Tailwind's own build step, either
[`@tailwindcss/vite`](https://tailwindcss.com/docs/installation/using-vite) or
`@tailwindcss/postcss`.

## Usage

```tsx
import { Button } from "@75neo/react";

<Button colorPalette="danger" variant="outline">
  Delete
</Button>;
```

Every component takes the same two shaping props:

- **`variant`** — how much emphasis it carries.
- **`colorPalette`** — what it means.

The two are independent axes. A variant is written once against the intent roles, so
every combination exists without any of them being spelled out. See
[Theming](/theming).

## Colour mode

Colour mode is opt-in via a class or `data-theme`, with no `prefers-color-scheme`
fallback — your app decides, so a user's saved choice cannot be overridden by their OS.

```html
<html class="dark"></html>
```

Nothing inside a component branches on the mode; the semantic layer resolves it.

## Status

Two components so far — [Button](/components/button) and
[Accordion](/components/accordion). They are the reference implementations for the two
shapes everything else will take: single-element, and multi-part with named slots.
