---
title: Introduction
description: A component registry for React and Vue. You install the source into your own repository and own it from there.
order: 1
---

## What you install

75NeoUI is published as a [shadcn registry](https://ui.shadcn.com/docs/registry/getting-started)
rather than an npm package. When you add a component, the CLI writes its TypeScript source into
your project under your own path alias. From that point the file is yours: edit it, rename it,
delete a prop you do not want.

That means there is no runtime dependency to keep in step with your framework, no semver range to
negotiate, and nothing to eject from when a design decision stops fitting. The trade is that
upgrades are not automatic. Re-running the CLI overwrites the file, so keep your changes in git and
review the diff.

## One recipe, two adapters

Every component is written twice, once as a React function component and once as a Vue single file
component. Both adapters import the same [tailwind-variants](https://www.tailwind-variants.org)
recipe, so a `soft` warning button is the same set of classes in either framework.

```
registry/
  shared/lib/button.styles.ts   the recipe both adapters import
  react/ui/button/Button.tsx    the React adapter
  vue/ui/button/Button.vue      the Vue adapter
```

The recipe holds every class. The adapters hold only the wiring that differs between frameworks:
`className` and `children` on one side, `class` and slots on the other. If you want to restyle a
component everywhere, edit the recipe once.

## Where behaviour comes from

Anything that needs state, keyboard handling, focus management or an accessibility contract is
built over [Ark UI](https://ark-ui.com), which ships the same state machines to both frameworks
through [Zag](https://zagjs.com). The navigation menu and the table of contents are thin styling
layers over Ark parts. Components with no behaviour, such as the button, the container and the
table, are plain elements with a recipe applied.

The rule we follow when adding a component: if Ark UI already models it, use Ark UI. Build from
scratch only when it does not, which is why the table is our own markup and the table of contents
is not.

## The token layer

Colour, radius and container width live in a small set of `--ui-*` custom properties that the
theme item installs. Tailwind theme tokens are derived from those properties, so `bg-primary` and
`text-muted` follow whatever you set. Retheme the library by overriding the `--ui-*` properties,
not the Tailwind tokens built on top of them. [Customization](/docs/customization) covers this in
full.

## What is here

Fifty five items, grouped in the sidebar by what they are for.

| Group        | What is in it                                                                                                                                                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Actions      | Button, toggle, toggle group                                                                                                                                                                                                                                                   |
| Forms        | Field, fieldset, checkbox, radio group, switch, select, listbox, combobox, slider, angle slider, rating group, segment group, number input, password input, pin input, tags input, editable, date picker, date input, colour picker, signature pad, image cropper, file upload |
| Overlays     | Dialog, drawer, popover, tooltip, hover card, menu, floating panel, tour                                                                                                                                                                                                       |
| Navigation   | Navigation menu, tabs, pagination, steps, table of contents                                                                                                                                                                                                                    |
| Disclosure   | Accordion, collapsible                                                                                                                                                                                                                                                         |
| Data display | Table, avatar, progress, carousel, marquee, timer, QR code, tree view, JSON tree view, clipboard                                                                                                                                                                               |
| Layout       | Container, splitter, scroll area                                                                                                                                                                                                                                               |
| Feedback     | Toast                                                                                                                                                                                                                                                                          |

Everything with behaviour is built over [Ark UI](https://ark-ui.com). The button, the container and
the table are the only ones that are not, because none of them has behaviour to speak of.

Every component page ends with an API reference read straight from the source at build time using
[ts-morph](https://ts-morph.com) and
[vue-component-meta](https://github.com/vuejs/language-tools/tree/master/packages/component-meta),
so the tables cannot drift from the code the CLI installs.

## Next

[Installation](/docs/installation) sets up the registry and adds your first component.
