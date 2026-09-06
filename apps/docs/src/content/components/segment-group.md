---
name: SegmentGroup
key: segmentGroup
module: segment-group
summary: A row of choices under a pill that snaps to the checked one.
---

Pass the segments and the group maps them to rows under an indicator pill. The pill
positions from the custom properties Ark measures, and it snaps — no transition
carries it, per the motion rule.

```tsx
<SegmentGroup
  items={[
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
  ]}
/>
```

```vue
<SegmentGroup
  :items="[
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
  ]"
/>
```

`orientation` places the row horizontally or stacks it. The checked segment takes
the color; the rest stay toned until hovered.
