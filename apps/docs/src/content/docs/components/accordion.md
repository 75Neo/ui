---
title: Accordion
description: A multi-part component driven by an items list, with a named slot for every part you might want to replace.
section: Components
order: 5
theme: accordion
---

## Usage

The accordion is one component, driven by `items`. Ark UI's five parts are an
implementation detail; what a caller sees is a list and a set of slots.

```tsx
import { Accordion } from "@75neo/react";

const items = [
  { value: "styling", label: "Where does styling live?", content: "In one theme." },
  { value: "intents", label: "How are shape and intent kept apart?", content: "Eight roles." },
];

<Accordion items={items} defaultValue={["styling"]} />;
```

Everything [Ark UI's accordion](https://ark-ui.com/docs/components/accordion) accepts on
its root — `multiple`, `collapsible`, `defaultValue`, `unmountOnExit`, the change
callbacks — is accepted here unchanged, so its documentation transfers.

## Items

| Key            | Type             | Description                                                        |
| -------------- | ---------------- | ------------------------------------------------------------------ |
| `label`        | `string`         | The trigger's text. Read through `labelKey`.                       |
| `value`        | `string`         | The row's value, and its key. Defaults to the index.               |
| `content`      | `string`         | The panel's text, for a row that needs no markup.                  |
| `icon`         | `Component`      | Rendered before the label.                                         |
| `trailingIcon` | `Component`      | Replaces the chevron, for this row alone.                          |
| `disabled`     | `boolean`        | Disables this row.                                                 |
| `slot`         | `string`         | Names this row's own slots — see below.                            |
| `class`        | `ClassValue`     | Merged into this row's `item` class.                               |
| `ui`           | `AccordionSlots` | Per-slot overrides for this row, merged over the accordion's `ui`. |

Any other key is left alone, so a list that already exists in the shape an API returns it
can be passed straight in and read through `labelKey` and `valueKey`.

## Slots

Five parts can be replaced. Each framework spells them its own way — Vue named slots,
React render props, Svelte snippets — and each is handed `{ item, index, open }`.

| Slot       | Vue         | React      | Renders by default        |
| ---------- | ----------- | ---------- | ------------------------- |
| label      | `#default`  | `children` | the item's `label`        |
| `leading`  | `#leading`  | `leading`  | the item's `icon`, if any |
| `trailing` | `#trailing` | `trailing` | the chevron               |
| `content`  | `#content`  | `content`  | the `body` slot, padded   |
| `body`     | `#body`     | `body`     | the item's `content`      |

```vue
<Accordion :items="items">
  <template #body="{ item, open }">
    <p>{{ item.content }}</p>
  </template>
</Accordion>
```

```tsx
<Accordion items={items} body={({ item }) => <p>{item.content}</p>} />
```

An item that names a `slot` gets its own pair on top of those, so one accordion can give
each row different markup: `{slot}` replaces that row's whole panel, `{slot}-body` only
what sits inside it. Vue reaches them as `#{slot}` / `#{slot}-body`; React and Svelte
through the `slots` record, keyed by the same names.

## Anatomy

| Slot           | What it is                                      |
| -------------- | ----------------------------------------------- |
| `root`         | The container. Every variant prop is set here.  |
| `item`         | One collapsible row.                            |
| `trigger`      | The header button.                              |
| `leadingIcon`  | Wraps the item's `icon`.                        |
| `label`        | The trigger's text. Takes the free space.       |
| `trailingIcon` | The chevron. Rotates on open.                   |
| `content`      | The animated panel. Height is what animates.    |
| `body`         | Rendered inside `content`; carries the padding. |

The names are [Nuxt UI's](https://ui.nuxt.com/components/accordion), whose API this
component reproduces — minus its `header`, a wrapper Reka UI's anatomy requires and Ark's
does not.

`body` is the one slot with no part of its own behind it. It exists because of how the
animation works: `content` animates `height`, and a padded element cannot collapse below
its own padding — so the padding lives one level in, and callers never have to know.

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

The accordion spends only two of the eight intent roles — the expanded trigger's text
and its icon — but it spends them the same way every other component does, so intent
stays a single prop.

## Size

`sm`, `md`, `lg` — trigger height, padding, gap and type size, plus the body's padding.

## Customizing

`ui` reaches every slot at once, so restyling triggers and bodies does not mean passing
props down a tree.

```tsx
<Accordion
  items={items}
  ui={{
    trigger: "font-semibold uppercase tracking-wide",
    body: "text-fg",
  }}
/>
```

An item's own `ui` is merged over that, for one row only, and `class` still reaches the
root element. See [Customization](/customization).

## API

Everything Ark UI's accordion root accepts is accepted here too, alongside these.

| Prop           | Type                                                                    | Default     | Description                                                      |
| -------------- | ----------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------- |
| `variant`      | `"outline" \| "subtle" \| "elevated" \| "plain"`                        | `"outline"` | The chrome around the items.                                     |
| `colorPalette` | `"accent" \| "neutral" \| "success" \| "warning" \| "danger" \| "info"` | `"accent"`  | Which intent the expanded trigger and its icon carry.            |
| `size`         | `"sm" \| "md" \| "lg"`                                                  | `"md"`      | Trigger height, padding and type size.                           |
| `ui`           | `Partial<Record<Slot, ClassValue>>`                                     | —           | Per-slot class overrides, reaching every row.                    |
| `items`        | `AccordionItem[]`                                                       | `[]`        | The rows.                                                        |
| `trailingIcon` | `Component`                                                             | chevron     | The icon every row's trigger ends with.                          |
| `labelKey`     | `string`                                                                | `"label"`   | Which key of an item holds its label.                            |
| `valueKey`     | `string`                                                                | `"value"`   | Which key of an item holds its value.                            |
| `multiple`     | `boolean`                                                               | `false`     | Lets several panels stay open. From Ark UI.                      |
| `collapsible`  | `boolean`                                                               | `false`     | Lets the last open panel close. From Ark UI.                     |
| `disabled`     | `boolean`                                                               | `false`     | Disables every row. Set `disabled` on an item for just that row. |

## Motion

The panel animates `height` from Ark's measured `--height`, and the chevron rotates.
Both are dropped under `prefers-reduced-motion`.

Only Ark's default vertical orientation is styled. `orientation="horizontal"` is a
different layout _and_ a different animation, and is not covered.
