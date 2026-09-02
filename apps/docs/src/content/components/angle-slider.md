---
name: AngleSlider
key: angleSlider
module: angle-slider
order: 5
summary: A circular dial for picking a rotation, across three sizes and seven colors, with markers and a live readout.
---

An angle slider picks a rotation between zero and three hundred and sixty degrees. It is
the right control when the value _is_ an angle, because a dial shows the answer in the
same terms the reader will see it.

```tsx
<AngleSlider label="Rotation" showValue defaultValue={45} />
```

```vue
<AngleSlider label="Rotation" show-value :default-value="45" />
```

`markers` draws ticks on the ring at the degrees you list, which is how a dial with a few
meaningful positions reads as having them. `step` is how far one arrow-key press moves.

```tsx
<AngleSlider markers={[0, 90, 180, 270]} step={15} />
```

```vue
<AngleSlider :markers="[0, 90, 180, 270]" :step="15" />
```

`label` is a caption under the readout, inside the ring, and clicking it focuses the
thumb. `name` submits the angle under that name inside a form.

### The current angle

As with the carousel, the controlled value lives outside the shared contract. React takes
Ark UI's `value`, `defaultValue`, `onValueChange` and `onValueChangeEnd`. Vue takes
`v-model`, with `defaultValue` as the uncontrolled counterpart.

```tsx
<AngleSlider value={angle} onValueChange={({ value }) => setAngle(value)} />
```

```vue
<AngleSlider v-model="angle" />
```
