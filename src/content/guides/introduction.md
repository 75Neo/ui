---
title: Introduction
description: A component library for React and Vue. You install the source into your own repository and own it from there.
order: 1
---

## What you install

75NeoUI has no runtime package. `75neoui add` writes a component's source into your project under
your own path alias, and from there the file is yours to edit, rename or cut down.

The trade is that upgrades are not automatic. Running `add` again overwrites the file, so keep your
changes in git and read the diff.

## One recipe, two adapters

Every component is written twice, once as a React function component and once as a Vue single file
component. Both import the same [tailwind-variants](https://www.tailwind-variants.org) recipe, so a
`soft` warning button is the same set of classes in either framework.

```
registry/
  shared/lib/button.styles.ts   the recipe both adapters import
  react/ui/button/Button.tsx    the React adapter
  vue/ui/button/Button.vue      the Vue adapter
```

To restyle a component everywhere, edit the recipe once.

## Where behaviour comes from

Anything with state, keyboard handling or an accessibility contract is built over
[Ark UI](https://ark-ui.com), which ships the same state machines to both frameworks through
[Zag](https://zagjs.com). The button, the container and the table are plain elements with a recipe
applied, because none of them has behaviour to speak of.

## The token layer

Colour, radius and container width live in `--ui-*` custom properties that `75neoui init` writes
into your stylesheet. Tailwind tokens are derived from them, so `bg-primary` and `text-muted`
follow whatever you set. Override the `--ui-*` properties, not the Tailwind tokens built on them.

## Next

[Installation](/docs/installation) sets your project up and adds your first component.
