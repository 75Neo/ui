---
name: SegmentGroup
key: segmentGroup
module: segment-group
order: 37
summary: A track of options with a pill that slides to the chosen one, across three sizes, seven accents and both directions.
---

A short row of options with a pill that slides to whichever one is chosen. One answer at a
time, and the arrow keys move between them.

```tsx
<SegmentGroup
  items={[
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
  ]}
  defaultValue="week"
/>
```

```vue
<SegmentGroup :items="views" default-value="week" />
```

### The root is the track

Not a wrapper around it, and there is no caption slot. A segmented control is a compact
switch rather than a form field, and making the root the track is what lets the pill be
positioned: the chosen option's offset is measured from its containing box, so the pill
and the options have to share one.

The pill is placed with the physical left and top Ark measures, not with logical
properties, which is the one place in this library where the physical property is the
right one. An offset is measured from the left edge of the box whatever the reading
direction, so a logical inset would send the pill to the wrong end under a right-to-left
locale.

### Which to reach for

A SegmentGroup when there are two to four short options and seeing them all matters. A
Select when there are more, or when their labels are long. A RadioGroup when the options
need a description each.

### Direction and state

`orientation` runs the options across or down. An option can be `disabled` on its own, or
the whole track can be. `readOnly` shows a choice without offering to change it.

A track that starts with nothing chosen simply has no pill, which Ark hides rather than
places nowhere. Controllable the usual way: React takes `value` with `onValueChange`, or
`defaultValue` to leave it alone; Vue takes `v-model`. The value going in is a string; the
value coming back out of a change may be `null`, which is the same "nothing chosen" state
written the only way an event can write it.

There is no prop for wrapping the arrow keys from the last option to the first. Ark's
segment group is its radio group underneath and neither offers one, and a prop this
library could not honour would be worse than leaving the behaviour where Ark put it.

### Colour

The accent reaches the chosen option's text and nothing else. The pill stays the surface
colour, so the row reads as one control with a position in it rather than as three buttons
of equal weight. That is the same decision the Pagination makes about its current page.
