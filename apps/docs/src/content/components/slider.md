---
name: Slider
key: slider
module: slider
summary: A track, the part of it selected, and a thumb per value.
---

The value is an array with one entry per thumb, which is the whole of what makes a
range slider the same component.

```tsx
<Slider label="Volume" showValue defaultValue={[40]} />
<Slider defaultValue={[25, 75]} />
```

```vue
<Slider label="Volume" show-value :model-value="[40]" />
<Slider :model-value="[25, 75]" />
```

`marks` puts ticks under the track at the values you name, `min`, `max` and `step` set
the scale, and `minStepsBetweenThumbs` keeps two thumbs apart. `origin` set to `center`
measures the selected range from the middle rather than the start.

Orientation is not an axis. Every part reads the attribute Ark writes, so `vertical`
turns the same class strings sideways.
