---
name: NumberInput
key: numberInput
module: number-input
order: 30
summary: A field holding one number and the two buttons that step it, in a row or a column, across three sizes and seven accents.
---

A field that only takes a number, and the two buttons that move it. Arrow keys step it
too, Shift steps ten at a time and Alt a tenth.

```tsx
<NumberInput label="Guests" min={1} max={12} defaultValue="2" />
```

```vue
<NumberInput label="Guests" :min="1" :max="12" default-value="2" />
```

### Two arrangements, one set of elements

`orientation` decides where the buttons go. `horizontal` puts one at each end with the
number between them, which reads as a quantity. `vertical` stacks them at the trailing
edge and leaves the number where a reader of the rest of the form expects it.

Both come from the same three elements. The row places them with `order` and the column
by grid line, so neither adapter branches on the arrangement and no element exists only
to hold the other two. A row gets a minus and a plus, a column gets two chevrons, and
either icon prop replaces its default.

```tsx
<NumberInput orientation="vertical" defaultValue="4" />
```

```vue
<NumberInput orientation="vertical" default-value="4" />
```

### The value is text

The value is a `string`, not a number, and that is deliberate. A half-typed `-` or `1.`
is a real state a field passes through and a number has nowhere to keep it. So is a
value written as `$19.99`. The number is still there when you want it: every change
event carries `valueAsNumber` beside the text.

It is controllable: React takes `value` with `onValueChange`, or `defaultValue` to leave
it alone; Vue takes `v-model`. `onValueChange` fires on every keystroke and on each step
of a held button; `onValueCommit` fires once, when the field is left or Enter is pressed.

### Range and format

`min` and `max` bound it, and Ark disables whichever button would leave the range. A
typed value may still go outside unless `allowOverflow` is turned off, and it is pulled
back when the field loses focus unless `clampValueOnBlur` is.

`formatOptions` is handed straight to `Intl.NumberFormat`, so a currency, a percentage
or a fixed number of decimals costs one prop. `locale` chooses the language it is read
in, and falls back to the one the App publishes.

```tsx
<NumberInput formatOptions={{ style: "currency", currency: "USD" }} defaultValue="19.99" />
<NumberInput formatOptions={{ style: "percent" }} step={0.05} defaultValue="25%" />
```

```vue
<NumberInput :format-options="{ style: 'currency', currency: 'USD' }" default-value="19.99" />
<NumberInput :format-options="{ style: 'percent' }" :step="0.05" default-value="25%" />
```

A starting value is read the way the format writes it, which is the text rule again
rather than an exception to it. A percentage starts at `"25%"`, not at `"0.25"`, because
`0.25` in a percent field is a quarter of one per cent and is what the field would show.

### Colour

The accent reaches the focus ring on the control and nothing else. The ring is drawn
with `focus-within`, because the field and the two buttons are three focusable things
inside one box that has to read as a single control. That is the same reason the
Combobox draws its ring that way.
