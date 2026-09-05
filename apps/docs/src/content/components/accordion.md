---
name: Accordion
key: accordion
module: accordion
summary: Three variants across three sizes, wrapping Ark UI for keyboard and ARIA behaviour.
---

Rows are data rather than markup. Pass `items` and the accordion renders the whole
anatomy, so keyboard navigation, ARIA wiring and the open-state animation come with it.

```tsx
<Accordion
  items={[
    { value: "shipping", label: "Shipping", content: "Two to four working days." },
    { value: "returns", label: "Returns", content: "Thirty days, no questions." },
  ]}
/>
```

```vue
<Accordion
  :items="[
    { value: 'shipping', label: 'Shipping', content: 'Two to four working days.' },
    { value: 'returns', label: 'Returns', content: 'Thirty days, no questions.' },
  ]"
/>
```

`multiple` allows more than one row open at a time. `collapsible` allows closing the open
row and leaving none open. An `item` carries its own `disabled` and its own `icon`,
shown before that row's label.

### Arbitrary markup in a row

`label` and `content` on an item are text. When a row needs more than text, replace it:
`renderLabel` and `renderContent` in React, the `label` and `content` slots in Vue. Both
receive the item and fall back to its text when you render nothing.

```tsx
<Accordion items={items} renderContent={(item) => <Invoice id={item.value} />} />
```

```vue
<Accordion :items="items">
  <template #content="{ item }">
    <Invoice :id="item.value" />
  </template>
</Accordion>
```
