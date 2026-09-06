---
name: Checkbox
key: checkbox
module: checkbox
summary: A box that ticks, unticks, or holds the third state.
---

The checked state comes from Ark, in both frameworks as `boolean | "indeterminate"`.
The dash has its own indicator beside the tick's, and Ark shows whichever the state
calls for.

```tsx
<Checkbox label="Notifications" description="Email me about mentions." />
```

```vue
<Checkbox label="Notifications" description="Email me about mentions." />
```

`label` and `description` are strings on the root; richer markup composes the label
and description parts directly. `icon` replaces the tick, `indeterminateIcon` the
dash, and both are glyphs rather than parts.
