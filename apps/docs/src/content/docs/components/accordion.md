---
title: Accordion
description: A list of collapsible rows driven by an items list, with a named slot for every part you might want to replace.
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
  { value: "intents", label: "How are shape and colour kept apart?", content: "One property." },
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

| Slot           | What it is                                       |
| -------------- | ------------------------------------------------ |
| `root`         | The container.                                   |
| `item`         | One collapsible row, with the divider under it.  |
| `trigger`      | The header button.                               |
| `leadingIcon`  | The item's `icon`.                               |
| `label`        | The trigger's text.                              |
| `trailingIcon` | The chevron. Pushed to the end; rotates on open. |
| `content`      | The animated panel. Height is what animates.     |
| `body`         | Rendered inside `content`; carries the padding.  |

There is no `header` slot: Ark's trigger is already the item's direct child, so `trigger`
carries `w-full` to fill the item and nothing sits between the two.

`body` is the one slot with no part of its own behind it. It exists because of how the
animation works: `content` animates `height`, and a padded element cannot collapse below
its own padding — so the padding lives one level in, and callers never have to know.

## Styling

There is deliberately no `size`, `variant` or `color` axis. An accordion here is a list of
rows in a page, and the page is what supplies the box around it: `border-b border-default`
between rows, `text-sm`, and nothing else.

Anything more is a `ui` prop or a `ThemeConfig` away:

```tsx
const theme: ThemeConfig = {
  accordion: {
    slots: { root: "overflow-hidden rounded-lg border border-default px-4" },
  },
};
```

## Customizing

`ui` reaches every slot at once, so restyling triggers and bodies does not mean passing
props down a tree.

```tsx
<Accordion
  items={items}
  ui={{
    trigger: "font-semibold uppercase tracking-wide",
    body: "text-toned",
  }}
/>
```

An item's own `ui` is merged over that, for one row only, and `class` still reaches the
root element. See [Customization](/customization).

## API

Everything Ark UI's accordion root accepts is accepted here too, alongside these.

| Prop           | Type                                | Default   | Description                                                      |
| -------------- | ----------------------------------- | --------- | ---------------------------------------------------------------- |
| `ui`           | `Partial<Record<Slot, ClassValue>>` | —         | Per-slot class overrides, reaching every row.                    |
| `items`        | `AccordionItem[]`                   | `[]`      | The rows.                                                        |
| `trailingIcon` | `Component`                         | chevron   | The icon every row's trigger ends with.                          |
| `labelKey`     | `string`                            | `"label"` | Which key of an item holds its label.                            |
| `valueKey`     | `string`                            | `"value"` | Which key of an item holds its value.                            |
| `multiple`     | `boolean`                           | `false`   | Lets several panels stay open. From Ark UI.                      |
| `collapsible`  | `boolean`                           | `false`   | Lets the last open panel close. From Ark UI.                     |
| `disabled`     | `boolean`                           | `false`   | Disables every row. Set `disabled` on an item for just that row. |

## Motion

The panel animates `height` from Ark's measured `--height`, and the chevron rotates.

Only the rotation is dropped under `prefers-reduced-motion`. The height reveal is kept
deliberately: collapsing instantly loses the connection between the trigger and the panel
it just opened, which is the one thing the animation is there to show.

Only Ark's default vertical orientation is styled. `orientation="horizontal"` is a
different layout _and_ a different animation, and is not covered.
