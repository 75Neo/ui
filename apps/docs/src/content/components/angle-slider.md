---
name: AngleSlider
key: angleSlider
module: angle-slider
summary: A dial you drag around a ring to pick a heading.
---

Pass a starting angle in degrees and the dial does the rest. The thumb carries the
slider role and the value, so arrow keys step it by `step` degrees.

```tsx
<AngleSlider defaultValue={135} label="Heading" showValue />
```

```vue
<AngleSlider :model-value="135" label="Heading" show-value />
```

`markers` draws ticks at the degrees you name, `showValue` puts the readout in the
middle of the ring and `label` captions it underneath. The readout spells the degree
sign, where Ark's own text reads `135deg`.

The geometry is written in viewBox units, so a size only changes the width of the
control and everything else follows. `name` submits the angle inside a form.
