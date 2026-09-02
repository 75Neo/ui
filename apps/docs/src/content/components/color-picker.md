---
name: ColorPicker
key: colorPicker
module: color-picker
order: 10
summary: An inline color picker across three sizes and seven accents, with an alpha channel, an eyedropper and preset swatches.
---

A color picker is a saturation plane, a hue slider, and a hex field under them. It is
always inline: it renders where it is written rather than inside a popover, so it drops
into a panel, a sidebar or a form without anything having to open first.

```tsx
<ColorPicker label="Brand color" defaultValue={parseColor("#3b82f6")} />
```

```vue
<ColorPicker label="Brand color" :default-value="parseColor('#3b82f6')" />
```

### The value is a Color, not a string

The picker edits channels, so it holds a `Color` object rather than a string. A string
would have to be reparsed on every frame of a drag. `parseColor` builds one from any CSS
color and is re-exported from both adapters, so reaching for it does not mean adding Ark
UI to your own dependencies.

React takes `value` with `onValueChange`, or `defaultValue` to leave the state alone.
Vue takes `v-model`, with `defaultValue` as the uncontrolled counterpart. Both change
handlers receive the color twice over: `value` is the object, and `valueAsString` is it
written out in the current format.

```tsx
const [color, setColor] = useState(() => parseColor("#3b82f6"));

<ColorPicker value={color} onValueChange={(details) => setColor(details.value)} />;
```

```vue
<script setup lang="ts">
import { ColorPicker, parseColor } from "@75neo/vue";

const color = ref(parseColor("#3b82f6"));
</script>

<template>
  <ColorPicker v-model="color" />
</template>
```

`format` decides how that string reads and which channels the sliders drive. It is
`"rgba"`, `"hsla"` or `"hsba"`, and it defaults to whatever format the starting value was
written in.

### Color is the accent, not the value

Every other component's `color` variant is the color you see. Here it is not. The color
being edited comes from the value, and the variant reaches only the focus halos, the hex
field's focus ring, and the ring around the selected preset. That leaves the picker able
to sit in a themed panel without the accent fighting the swatch.

Almost nothing in the recipe paints a color at all. Ark computes the two gradients, the
alpha checkerboard and each thumb's fill from the current value and writes them as inline
styles, so the recipe supplies geometry, rounding, rings and focus, and nothing else.

### The optional parts

Four pieces are yours to turn on:

- `showInput` renders the hex field, and is the only one on by default.
- `alpha` adds an alpha slider and puts a checkerboard under anything the color is
  painted on, so a translucent color reads as translucent.
- `eyeDropper` adds a pipette that samples a color from anywhere on screen. It uses the
  browser's own EyeDropper API, which today means Chromium only, so treat it as a
  shortcut rather than the only way to reach a color.
- `swatches` takes CSS color strings and draws a row of presets under everything else.
  The one matching the current value wears a ring in the accent color.

```tsx
<ColorPicker
  label="Overlay"
  alpha
  eyeDropper
  swatches={["#ef4444", "#22c55e", "#3b82f6"]}
  defaultValue={parseColor("rgba(59, 130, 246, 0.6)")}
/>
```

```vue
<ColorPicker
  label="Overlay"
  alpha
  eye-dropper
  :swatches="['#ef4444', '#22c55e', '#3b82f6']"
  :default-value="parseColor('rgba(59, 130, 246, 0.6)')"
/>
```

### Forms

The component renders a hidden input, so a picker inside a `form` submits like any other
field. `name` names it and the submitted value is the color written in the current
format. `required` and `invalid` do what they do on any input, and `readOnly` shows a
color without letting anyone change it, which is different from `disabled`: a read-only
picker still takes focus.
