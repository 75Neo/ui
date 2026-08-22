---
title: Theming
description: Design tokens, semantic utilities and intent palettes — the three layers everything is styled against.
section: Guide
order: 2
---

The design system is plain CSS. Three layers, each allowed to reference only the one
above it, plus a handful of global rules.

## Scales

Most of the system's scales _are_ Tailwind's, unchanged: the 0.25rem spacing ramp, the
breakpoints, container widths, line heights, tracking, and `--ease-in-out` — already
`cubic-bezier(0.4, 0, 0.2, 1)`, the everyday curve.

So are five of the six palettes. Neutrals are `zinc`, danger is `red`, success is
`emerald`, warning is `amber`, info is `sky`. Your own `bg-red-500` still means what you
expect.

Four things differ:

| Addition     | Why                                                                          |
| ------------ | ---------------------------------------------------------------------------- |
| `neo-50…950` | The brand ramp — a desaturated indigo. The one palette Tailwind lacks.       |
| `radius-*`   | One step rounder throughout: `rounded-md` is 0.5rem, not 0.375rem.           |
| `text-2xs`   | A rung below `text-xs`, for the smallest UI labels.                          |
| `ease-*`     | `emphasized`, `accelerate` and `spring`, for entrances, exits and overshoot. |

## Surfaces, foreground and lines

These resolve per colour mode, so nothing ever branches on `dark:` itself. They are
ordinary colour tokens, so they compose the ordinary way — `hover:bg-surface-subtle`,
`divide-line`, `bg-surface/50`, `ring-focus`.

### Surfaces

| Utility                 | Role                                          |
| ----------------------- | --------------------------------------------- |
| `bg-canvas`             | The page behind everything.                   |
| `bg-surface`            | A raised surface — cards, panels, menus.      |
| `bg-surface-subtle`     | Resting tint. The hover state of a plain row. |
| `bg-surface-muted`      | One step up from subtle.                      |
| `bg-surface-emphasized` | Pressed and active states.                    |
| `bg-surface-inverted`   | Near-black on light, near-white on dark.      |
| `bg-surface-disabled`   | An inactive control's fill.                   |

### Foreground

| Utility            | Role                                                                |
| ------------------ | ------------------------------------------------------------------- |
| `text-fg`          | Primary copy. 17.7:1 light, 17.0:1 dark.                            |
| `text-fg-muted`    | Secondary copy. 7.7:1 light, 6.9:1 dark.                            |
| `text-fg-subtle`   | Placeholders and watermarks. **3.7:1 in dark** — not for body text. |
| `text-fg-disabled` | Below AA by design; WCAG exempts inactive controls.                 |
| `text-fg-inverted` | Copy on `bg-surface-inverted`.                                      |

### Lines and focus

| Utility                  | Role                                                           |
| ------------------------ | -------------------------------------------------------------- |
| `border-line`            | The default hairline.                                          |
| `border-line-subtle`     | A divider that should barely register.                         |
| `border-line-emphasized` | Hovered or focused chrome.                                     |
| `outline-focus`          | The focus ring. One token, so focus looks the same everywhere. |

Elevation is semantic too — `shadow-sm` through `shadow-xl` carry roughly four times the
alpha in dark mode, because a shadow tuned for white does not read against `zinc-900`.

## Intent palettes

Shape and intent are separate axes. Every palette fills the same eight roles, so a
component theme writes each _shape_ once and gets every _intent_ for free.

| Role                   | What it is                                                    |
| ---------------------- | ------------------------------------------------------------- |
| `bg-intent-subtle`     | Tinted background — a low-emphasis control at rest.           |
| `bg-intent-muted`      | The same, one step up: its hover state.                       |
| `bg-intent-default`    | Solid fill — a high-emphasis control at rest.                 |
| `bg-intent-emphasized` | The same, one step up: its hover state.                       |
| `border-intent-line`   | Border on an otherwise unfilled control.                      |
| `text-intent-fg`       | Icons and de-emphasised accents on a plain background.        |
| `text-intent-label`    | Label text on `bg-intent-subtle` or on a plain background.    |
| `text-intent-contrast` | Label text on `bg-intent-default` and `bg-intent-emphasized`. |

Which hue those roles point at is decided by one class:

```
intent-accent   intent-neutral   intent-success
intent-warning  intent-danger    intent-info
```

An `intent-*` class sets custom properties and nothing else. Because custom properties
inherit, putting one on a root element re-points all eight roles for everything inside
it — which is how a component's `colorPalette` prop reaches its parts without being
threaded down the tree.

That is what makes the two axes independent:

```ts
// Every variant is written once, against the roles.
solid:   "bg-intent-default text-intent-contrast hover:bg-intent-emphasized",
outline: "border-intent-line text-intent-label hover:bg-intent-subtle",

// Every intent is one class, on the root element.
colorPalette: {
  accent: "intent-accent",
  danger: "intent-danger",
  // …
},
```

Five variants times six palettes is thirty combinations, and none of them is spelled out.

Nothing stops you using these directly. An `intent-warning` on a `<section>` makes every
`bg-intent-subtle` and `text-intent-label` inside it amber, components and your own
markup alike.

### The contrast rule

`contrast` is picked per palette **and per mode** so it clears WCAG AA (4.5:1) against
both `default` and `emphasized`. That is why the palettes are not symmetric:

- `accent` and `danger` are dark enough at their solid steps to carry white text, so they
  darken on hover and keep white throughout.
- `success`, `warning` and `info` cannot carry white text at a brightness that still reads
  as green, amber or blue. In dark mode they invert instead: a vivid 400 fill with the 950
  shade as text.

The current worst pair is 4.83:1. `fg-subtle` and `fg-disabled` are the two deliberate
exceptions, noted above.

## Retuning the system

Every value above is a CSS variable, so re-pointing the brand or any semantic role is
CSS, not configuration.

```css
/* Move the whole brand ramp. */
@theme {
  --color-neo-500: #576eb0;
  /* … the rest of the ramp */
}

/* Or re-point one semantic role without touching the ramp. */
:root {
  --ui-focus: var(--color-neo-600);
}
.dark {
  --ui-focus: var(--color-neo-300);
}
```

To change _components_ rather than colours, see [Customization](/customization).
