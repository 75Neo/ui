---
name: Progress
key: progress
module: progress
order: 20
summary: A track and the part of it that is done, across five thicknesses and seven colors, with an indeterminate state.
---

A progress bar is a track and the part of it that is done. `label` heads it and also names
it for a screen reader, and `showValue` writes out how far along it is beside that label.

```tsx
<Progress label="Uploading" showValue value={45} />
```

```vue
<Progress label="Uploading" show-value :model-value="45" />
```

With neither, the component is the bar alone: the header is left out rather than rendered
empty.

### Nothing to measure

A `null` value is the indeterminate state, and it is a real state rather than zero. The
range stops measuring and sweeps across the track instead, which says that work is
happening without claiming to know how much is left.

```tsx
<Progress label="Working" value={null} />
```

```vue
<Progress label="Working" :model-value="null" />
```

There is one sweep keyframe per axis, because a keyframe cannot ask which way its element
is pointing and a bar standing on end has to sweep down rather than across. They are the
only animations in the library that loop.

### Size is thickness

`size` sets how thick the bar is, not how long. A progress bar fills whatever it is put
in, so asking a caller to choose between five widths would be answering a question they
did not ask. `orientation` is `horizontal` or `vertical`; a vertical bar fills the height
of its container, so give it one.

### Counting to something other than a hundred

`min` and `max` set the range, and the value written out is still how far along the bar
is rather than the raw number, so `value={7} max={12}` reads as 58%. `formatOptions` and
`locale` are handed to `Intl.NumberFormat`, which is what writes it.

### The value

React takes `value` with `onValueChange`, or `defaultValue` to leave it alone. Vue takes
`v-model`, with `defaultValue` as the uncontrolled counterpart. `null` means indeterminate
in both.
