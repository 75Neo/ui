---
name: Timer
key: timer
module: timer
summary: Digits counting up or down, with the buttons that drive them.
---

A bare timer counts minutes and seconds upward and ships the four buttons that drive
it. `countdown` with a `targetMs` runs it the other way.

```tsx
<Timer targetMs={90_000} countdown />
```

```vue
<Timer :target-ms="90000" countdown />
```

Which units render is data. `units` names them in order, and the digits, their labels
and the separators between them all follow from that one array, so a caller reorders
the clock by reordering it. `labels` renames a unit, `showLabels` hides the names and
`controls` hides the buttons.

The digits read `tabular-nums`, so a ticking seconds column never shoves its label
sideways.
