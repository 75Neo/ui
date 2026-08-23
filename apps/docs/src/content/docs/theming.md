---
title: Theming
description: Design tokens, semantic utilities and intent palettes — the three layers everything is styled against.
section: Guide
order: 2
---

The design system is plain CSS. Three layers, each allowed to reference only the one
above it, plus a handful of global rules.

There is no module to install and no generator to run: the palettes, the semantic ramps
and the Tailwind aliases they feed are all spelled out as static CSS, and an app changes
any of them by redefining a custom property rather than by reconfiguring Tailwind.

## Scales

Most of the system's scales _are_ Tailwind's, unchanged: the 0.25rem spacing ramp, the
breakpoints, container widths, line heights, tracking, easings and the default font
stacks. So is the radius scale — except that every step is derived from one value, so
rounding the whole system up or down is a single override:

```css
:root {
  --ui-radius: 0.25rem; /* rounded-sm; md is 1.5×, lg 2×, xl 3× … */
}
```

## Palettes

Seven, and each is one Tailwind ramp:

| Palette     | Ramp     |
| ----------- | -------- |
| `primary`   | `green`  |
| `secondary` | `blue`   |
| `success`   | `green`  |
| `info`      | `blue`   |
| `warning`   | `yellow` |
| `error`     | `red`    |
| `neutral`   | `slate`  |

The one thing to know: **a palette is one colour, not a ramp.** `bg-primary` is step 500
in light mode and step 400 in dark, and every other shade a component needs is reached
with an alpha modifier — `bg-primary/10` for a tint, `ring-primary/50` for a border,
`hover:bg-primary/75` for a hover step. That is why adding a palette is a single line and
why no component carries per-shade bookkeeping.

The full ramps are still there as `primary-50` … `primary-950`, should you want one.
`neutral-*` is re-pointed at `slate`, which shadows Tailwind's own neutral ramp; it stays
reachable as `old-neutral-*`.

## Text, background and border

These resolve per colour mode, so nothing ever branches on `dark:` itself. They are
ordinary colour tokens, so they compose the ordinary way — `hover:bg-elevated`,
`divide-default`, `bg-muted/50`, `ring-accented`.

Note that `text-muted` and `bg-muted` are **different values**: the first is a mid-grey
for secondary copy, the second a barely-there tint. They are declared in Tailwind's
per-utility theme namespaces, which is what lets the same word mean the right thing under
each.

### Text

| Utility            | Role                                           |
| ------------------ | ---------------------------------------------- |
| `text-highlighted` | Headings and anything sitting above body copy. |
| `text-default`     | Body copy.                                     |
| `text-toned`       | One step down.                                 |
| `text-muted`       | Secondary copy.                                |
| `text-dimmed`      | Placeholders and watermarks.                   |
| `text-inverted`    | Copy on a filled control, or on `bg-inverted`. |

### Background

| Utility       | Role                                           |
| ------------- | ---------------------------------------------- |
| `bg-default`  | The page, and anything sitting flat on it.     |
| `bg-muted`    | A recessed tint.                               |
| `bg-elevated` | A raised tint. The hover state of a plain row. |
| `bg-accented` | One step up: pressed and active states.        |
| `bg-inverted` | Near-black on light, near-white on dark.       |

### Border

`border-default`, `border-muted`, `border-accented`, `border-inverted` — and the same
four names under `ring-`, `divide-`, `outline-`, `stroke-` and `fill-`, plus a `-bg`
entry for a border that matches the page.

## Intent palettes

Shape and colour are separate axes. The obvious alternative — one compound variant per
colour × variant pair — needs a build step to generate the combinations, and this library
has none. So it does the job the other way round: a palette re-points one custom property,
and a component theme writes each _shape_ once against it.

```
intent-primary   intent-secondary  intent-success  intent-info
intent-warning   intent-error      intent-neutral
```

An `intent-*` class sets `--ui-intent` and nothing else. Because custom properties
inherit, putting one on a root element re-points every `bg-intent` inside it — which is
how a component's `color` prop reaches its parts without being threaded down the tree.

```ts
// Every variant is written once, against the intent.
solid:   "text-inverted bg-intent hover:bg-intent/75",
outline: "text-intent ring ring-inset ring-intent/50 hover:bg-intent/10",

// Every colour is one class, on the root element.
color: {
  primary: "intent-primary",
  error: "intent-error",
  // …
},
```

Six variants times seven palettes is forty-two combinations, written as six shapes plus
seven one-line palettes. Only the six `neutral` pairs are spelled out — see below.

Nothing stops you using this directly. An `intent-warning` on a `<section>` makes every
`bg-intent/10` and `text-intent` inside it yellow, components and your own markup alike.

### Contrast, and why `neutral` is different

Contrast is handled by **inverting, not by tuning**. Text on a filled control is
`text-inverted`: white in light mode, near-black in dark. Paired with a palette that is a
500 in light and a lighter 400 in dark, the filled shape reads the same way in both modes
for every hue — including the yellows and greens that cannot carry white text at any
recognisable brightness.

`neutral` is the exception to the intent mechanism, in every theme. A neutral control is
not a grey-hued version of a coloured one — it is drawn from the background ramp
(`bg-elevated`, `ring-accented`, `text-default`) so that it recedes rather than reading as
an eighth hue. That cannot be expressed by re-pointing `--ui-intent`, so themes override
the neutral pairs explicitly.

## Focus

There is no global focus ring. Each component carries its own — a wide, translucent halo
in its own palette:

```
outline-intent/25 focus-visible:outline-3
```

A component with no colour axis names a palette outright; the accordion uses
`outline-primary/25`.

## Retuning the system

Every value above is a CSS variable, so re-pointing a palette or a semantic role is CSS,
not configuration.

```css
/* Move a whole palette — the eleven properties the alias reads through. */
:root {
  --ui-color-primary-500: #576eb0;
  /* … the rest of the ramp */
}

/* Or re-point one semantic role without touching a ramp. */
:root {
  --ui-border-accented: var(--ui-color-neutral-400);
}
.dark {
  --ui-border-accented: var(--ui-color-neutral-600);
}
```

Because the Tailwind aliases are declared with `@theme default inline`, the utility
carries `var(--ui-color-primary-500)` in its own body rather than a value resolved once at
`:root` — so an override lands everywhere, per colour mode and per subtree, without
Tailwind being reconfigured.

To change _components_ rather than colours, see [Customization](/customization).
