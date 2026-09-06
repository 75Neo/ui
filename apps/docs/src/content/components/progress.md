---
name: Progress
key: progress
module: progress
summary: A bar or a ring filling toward a value, or sweeping without one.
---

Pass a value and the bar fills toward it; pass `null` and it sweeps instead.
`label` names the bar and the formatted value shows beside it unless `showValue`
is off.

```tsx
<Progress label="Uploading" defaultValue={42} />
```

```vue
<Progress label="Uploading" :default-value="42" />
```

`circle` renders the ring instead of the bar — the geometry is Ark's, driven by
the `--size` and `--thickness` variables the size rows set, so the ring scales
without the adapters doing any maths. `min`, `max` and `orientation` pass
through, and the color fills the range or the ring's stroke. There is no `View`
part: showing something per state is composition the caller writes with the
state in hand.
