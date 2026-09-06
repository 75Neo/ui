---
name: ColorPicker
key: colorPicker
module: color-picker
summary: An inline color picker with alpha, eyedropper and swatches.
---

There is no color axis: a color picker edits every color, so none of its faces takes
one. The area, the sliders, the hex field, the eyedropper and the swatches compose
around a single value.

```tsx
<ColorPicker label="Brand" defaultValue={parseColor("#3b82f6")} />
```

```vue
<ColorPicker label="Brand" :default-value="parseColor('#3b82f6')" />
```

The value is Ark's `Color`, not a string — `parseColor`, re-exported from the
adapter, builds one. `format` edits and reports it as RGBA, HSLA or HSBA, and alpha
arrives beside the hue when asked.
