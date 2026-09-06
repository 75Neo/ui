---
name: ToggleGroup
key: toggleGroup
module: toggle-group
summary: A row of toggles sharing one pressed state.
---

Pass the toggles and the group maps them to rows. `multiple` presses several at
once; `deselectable` lets a pressed toggle release itself when it stands alone.

```tsx
<ToggleGroup
  items={[
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
  ]}
/>
```

```vue
<ToggleGroup
  :items="[
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
  ]"
/>
```

`orientation` runs the row horizontally or stacks it. The choice arrives through
`onValueChange` in React and `v-model` in Vue.
