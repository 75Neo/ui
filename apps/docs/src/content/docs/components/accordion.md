---
title: Accordion
description: A multi-part component — one theme with six slots, resolved once on Root and read by every part below it.
section: Components
order: 5
theme: accordion
---

## Usage

```tsx
import { Accordion } from "@75neo/react";

<Accordion.Root defaultValue={["one"]}>
  <Accordion.Item value="one">
    <Accordion.ItemTrigger>
      Where does styling live?
      <Accordion.ItemIndicator />
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>In one theme, under packages/styles.</Accordion.ItemContent>
  </Accordion.Item>
</Accordion.Root>;
```

The parts mirror [Ark UI's accordion](https://ark-ui.com/docs/components/accordion) 1:1, so
its documentation transfers directly — including `multiple`, `collapsible`,
`unmountOnHide`, and the `useAccordion` hook, which `Accordion.RootProvider` takes in
place of `Accordion.Root`.

`ItemIndicator` falls back to a Lucide chevron when given no children, so an accordion
works without wiring up an icon. Give it children to use your own; the theme sizes it to
`1em`, so it follows the trigger's type ramp rather than needing a `size` prop.

## Anatomy

| Part                      | Slot            | Notes                                               |
| ------------------------- | --------------- | --------------------------------------------------- |
| `Accordion.Root`          | `root`          | The container. Every variant prop is set here.      |
| `Accordion.Item`          | `item`          | One collapsible row.                                |
| `Accordion.ItemTrigger`   | `itemTrigger`   | The header button.                                  |
| `Accordion.ItemIndicator` | `itemIndicator` | The chevron. Rotates on open.                       |
| `Accordion.ItemContent`   | `itemContent`   | The animated panel. Height is what animates.        |
| —                         | `itemBody`      | Rendered inside `itemContent`; carries the padding. |

`itemBody` is the one slot with no component of its own. It exists because of how the
animation works:

```tsx
// itemContent animates height, and a padded element cannot collapse below its own
// padding — so the padding lives one level in, and callers never have to know.
<Accordion.ItemContent>
  {" "}
  // slot: itemContent — overflow-hidden, animated
  <div>
    {" "}
    // slot: itemBody — the padding
    {children}
  </div>
</Accordion.ItemContent>
```

## Variant

Four shapes. Only the chrome changes; the anatomy is identical in all four.

| Variant    | What it is                                                                           |
| ---------- | ------------------------------------------------------------------------------------ |
| `outline`  | One bordered card with hairline dividers between items. The default.                 |
| `subtle`   | Tinted blocks with air between them. No outer container.                             |
| `elevated` | Each item is its own raised card. The expanded one lifts further.                    |
| `plain`    | Dividers only, flush to the left — sits inside prose without indenting away from it. |

## Color palette

`accent`, `neutral`, `success`, `warning`, `danger`, `info`.

The accordion spends only two of the eight intent roles — the expanded header's text and
its indicator — but it spends them the same way every other component does, so intent
stays a single prop.

## Size

`sm`, `md`, `lg` — trigger height, padding, gap and type size, plus the body's padding.

## Customizing

`ui` is set once on `Root` and reaches every part, so restyling triggers and bodies does
not mean passing props down the tree.

```tsx
<Accordion.Root
  ui={{
    itemTrigger: "font-semibold uppercase tracking-wide",
    itemBody: "text-fg",
  }}
>
```

Each part also takes its own `class` for one-off changes. See
[Customization](/customization).

## API

Props are declared on `Accordion.Root`; everything Ark UI's accordion accepts falls
through.

| Prop           | Type                                                                    | Default     | Description                                                        |
| -------------- | ----------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------ |
| `variant`      | `"outline" \| "subtle" \| "elevated" \| "plain"`                        | `"outline"` | The chrome around the items.                                       |
| `colorPalette` | `"accent" \| "neutral" \| "success" \| "warning" \| "danger" \| "info"` | `"accent"`  | Which intent the expanded header and its indicator carry.          |
| `size`         | `"sm" \| "md" \| "lg"`                                                  | `"md"`      | Trigger height, padding and type size.                             |
| `ui`           | `Partial<Record<Slot, ClassValue>>`                                     | —           | Per-slot class overrides, reaching every part.                     |
| `multiple`     | `boolean`                                                               | `false`     | Lets several panels stay open. From Ark UI.                        |
| `collapsible`  | `boolean`                                                               | `false`     | Lets the last open panel close. From Ark UI.                       |
| `disabled`     | `boolean`                                                               | `false`     | Disables every item. Pass it to a single `Item` for just that row. |

## Motion

The panel animates `height` from Ark's measured `--height`, and the indicator rotates.
Both are dropped under `prefers-reduced-motion`.

Only Ark's default vertical orientation is styled. `orientation="horizontal"` is a
different layout _and_ a different animation, and is not covered.
