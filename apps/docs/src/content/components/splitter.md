---
name: Splitter
key: splitter
module: splitter
summary: Resizable panels divided by draggable handles.
---

Pass the panels as data and a handle lands between each pair, named after the two it
sits between.

```tsx
const panels = [
  { id: "left", content: "Left", minSize: 20 },
  { id: "right", content: "Right", minSize: 20 },
];

<Splitter panels={panels} />;
```

```vue
<Splitter :panels="panels" />
```

A panel's `minSize` and `maxSize` are numbers for percentages and strings for pixels,
which is Ark's own vocabulary. `collapsible` lets a panel fold to its `collapsedSize`,
and `disabled` on a panel also freezes the handles touching it.

The starting shares are `defaultSizes` and the controlled ones are `sizes`, both arrays
of percentages. They are spelled in the plural because `size` is this library's design
axis everywhere, and here it scales the handle.
