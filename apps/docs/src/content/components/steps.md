---
name: Steps
key: steps
module: steps
summary: A row of stations walked in order, each with its own panel.
---

Pass the rows as data and the count follows from the array. Each row shows a
numbered indicator, a title and a description; a finished row swaps its number
for a tick, and the separator behind it fills with the color.

```tsx
const items = [
  { title: "Contact", description: "Name and email" },
  { title: "Date", description: "Pick a day" },
  { title: "Rooms", description: "Choose a room" },
];

<Steps items={items} defaultStep={1} />;
```

```vue
<Steps :items="items" :default-step="1" />
```

`linear` walks the rows in order with no skipping ahead, `orientation` stacks
them vertically, and the Back/Next buttons arrive composed with `prevLabel` and
`nextLabel` renaming them. The thin progress bar reads Ark's `--percent`
variable, and `completedContent` replaces every panel once the last step is
done.
