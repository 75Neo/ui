---
name: Toggle
key: toggle
module: toggle
summary: A button that stays pressed, in five weights and seven colors.
---

Five variants across seven colors, and the pressed state in every cell. The default
weight is `soft`, not `solid` — an unpressed toggle should not shout.

```tsx
<Toggle variant="soft" color="primary">
  Save
</Toggle>
```

```vue
<Toggle variant="soft" color="primary">Save</Toggle>
```

The pressed state comes from Ark: `pressed` with `onPressedChange` in React,
`v-model:pressed` in Vue. Icons ride `leadingIcon` and `trailingIcon`, positions
as ever, never parts.
