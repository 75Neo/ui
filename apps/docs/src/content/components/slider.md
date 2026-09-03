---
name: Slider
key: slider
module: slider
order: 21
summary: A track and a thumb per value, across five thicknesses and seven colors, with marks and a two-thumb range.
---

A slider is a track, the part of it that is selected, and a thumb for every value. That
last part is the whole design: pass one value and it is a slider, pass two and it is a
range, and nothing about the component or its styling counts them.

```tsx
<Slider label="Volume" showValue defaultValue={[65]} />
<Slider label="Budget" defaultValue={[20, 70]} minStepsBetweenThumbs={5} />
```

```vue
<Slider label="Volume" show-value :default-value="[65]" />
<Slider label="Budget" :default-value="[20, 70]" :min-steps-between-thumbs="5" />
```

The value is an array in both frameworks for the same reason. React takes `value` with
`onValueChange`, or `defaultValue` to leave it alone; Vue takes `v-model`, with
`defaultValue` as the uncontrolled counterpart. `onValueChangeEnd` fires once when a thumb
is let go, which is the one to send to a server.

### The scale

`min`, `max` and `step` set the scale, and `origin` decides where the selected range is
measured from. `"center"` is for a value that reads as a deviation rather than an amount:
a balance control filling out from the middle rather than up from the left.

`minStepsBetweenThumbs` keeps two thumbs apart, in steps rather than in pixels.

### Marks

`marks` puts ticks under the track, each with a `value` and an optional `label`. Ark
positions them against the same scale as the thumbs and marks each one as under, at, or
past the current value, so a mark the slider has passed reads differently from one it
has not.

```tsx
<Slider label="Quality" step={25} marks={[{ value: 0, label: "0" }, { value: 100, label: "100" }]} />
```

```vue
<Slider label="Quality" :step="25" :marks="[{ value: 0, label: '0' }, { value: 100, label: '100' }]" />
```

### What the recipe may not style

The thumbs and the marks are sized by the recipe and positioned by Ark, which writes
`position`, an offset along the axis, and a `translate` that centres them on it, all as
inline styles. So nothing in the recipe may offset or translate either. A Tailwind
`translate-x-*` sets a different property than Ark's inline `translate`, so the two would
compose into a double shift rather than one replacing the other.

### Size is thickness

`size` sets how thick the track is, not how long, which is the rule the Progress follows.
`orientation` is read off Ark's own attribute rather than declared as a variant; a
vertical slider fills the height of its container, so give it one.
