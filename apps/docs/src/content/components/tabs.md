---
name: Tabs
key: tabs
module: tabs
summary: A row of triggers and the panel the selected one shows, in two variants across three sizes and seven colors.
---

Tabs take their content as items, the way the Accordion does. One array describes both
halves: each entry is a trigger and the panel that trigger shows.

```tsx
const items = [
  { value: "account", label: "Account", content: "Your name and your handle." },
  { value: "billing", label: "Billing", content: "The card on file." },
];

<Tabs items={items} defaultValue="account" />;
```

```vue
<script setup lang="ts">
const items = [
  { value: "account", label: "Account", content: "Your name and your handle." },
  { value: "billing", label: "Billing", content: "The card on file." },
];
</script>

<template>
  <Tabs :items="items" default-value="account" />
</template>
```

An item can carry an `icon` shown before its label and a `disabled` flag, which disables
that one trigger without disabling the set.

### Panels with more than a sentence

`content` on the item is a string, which covers a caption and not much else. Anything
richer goes through the adapter's own escape hatch: `renderContent` in React and the
scoped `content` slot in Vue, both of which receive the item and fall back to its string.
`renderLabel` and the `label` slot do the same for a trigger.

```tsx
<Tabs items={items} renderContent={(item) => <InvoiceTable period={item.value} />} />
```

```vue
<Tabs :items="items">
  <template #content="{ item }">
    <InvoiceTable :period="item.value" />
  </template>
</Tabs>
```

### The two variants spend the color differently

A `pill` is a raised surface, so the indicator stays neutral and the color goes on the
selected label. A `link` has no surface, so the color is the line under the trigger. Both
read the same `color` prop; what changes is where it lands.

### The indicator

One element does the sliding, and it is worth knowing how, because it is the only part of
this component that is not obvious from the markup. Ark measures the selected trigger and
writes its position and size onto the indicator as custom properties, then sets one axis
itself: `left` when the tabs are horizontal, `top` when they are vertical. The other axis
belongs to the recipe. That is what lets the same element be a pill behind the trigger in
one variant and a two-pixel line along the list's edge in the other.

### Orientation is not a variant

`orientation` is `horizontal` or `vertical`, and every slot styles itself off the
attribute Ark writes rather than off a variant. That keeps the matrix at forty two
combinations instead of eighty four, and it is what the Accordion does for the same
reason.

### Selection

React takes `value` with `onValueChange`, or `defaultValue` to leave the selection alone.
Vue takes `v-model`, with `defaultValue` as the uncontrolled counterpart.

`activationMode` decides whether arrowing onto a trigger selects it. It is `automatic` by
default, which is right when the panels are already loaded; `manual` is for panels that
fetch, so a reader arrowing past three tabs does not start three requests.
