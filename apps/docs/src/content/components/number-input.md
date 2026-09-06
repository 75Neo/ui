---
name: NumberInput
key: numberInput
module: number-input
summary: A quantity picker or a spinner, stepping with buttons, wheel or keys.
---

`orientation` places the two buttons and nothing else. Horizontal puts one at each
end of a flex row and centres the number between them; vertical stacks them in a
second grid column at the trailing edge. The markup is one shape either way.

```tsx
<NumberInput label="Quantity" defaultValue={4} min={0} max={10} />
```

```vue
<NumberInput label="Quantity" :default-value="4" :min="0" :max="10" />
```

The ring sits `focus-within` on the control, because the input and the two buttons
are three focusable things inside one box that has to read as a single field. Step
with the buttons, the arrow keys, or the wheel while the field has focus; a held
button keeps stepping.
