---
name: Switch
key: switch
module: switch
summary: An on-off control with icons riding the thumb.
---

The thumb carries two icon spans and shows one: the checked glyph while on, the
unchecked glyph while off. `loading` spins whichever shows and disables the control,
so one prop covers the whole busy state.

```tsx
<Switch label="Notifications" />
```

```vue
<Switch label="Notifications" />
```

The thumb snaps rather than slides — state changes arrive, they never travel. Color
and opacity are the only transitions anywhere on the control.
