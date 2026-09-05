---
name: Select
key: select
module: select
summary: A button holding the current answer and the list it opens, across three sizes and seven accents, single or multiple.
---

One button showing what has been chosen, and the list it opens. Read it against the
Combobox, which is the same list behind a text field that filters.

```tsx
<Select
  label="Language"
  items={[
    { value: "ts", label: "TypeScript" },
    { value: "rs", label: "Rust" },
  ]}
  placeholder="Pick one"
/>
```

```vue
<Select
  label="Language"
  :items="[
    { value: 'ts', label: 'TypeScript' },
    { value: 'rs', label: 'Rust' },
  ]"
  placeholder="Pick one"
/>
```

An option is a `value`, which is what a form submits, and a `label`, which is what the
reader sees in the list and in the closed button. An option can carry `disabled`, and an
`icon` drawn before its label.

### Which one to reach for

A Select when the options are few enough to read, a Combobox when they are not. The two
share a size scale, an accent, and every name inside the popup, so swapping one for the
other is a rename and a placeholder.

They differ in one place a caller can see: a Combobox accepts text that matches nothing,
because it has a text field to type it into. A Select has no such thing to offer, so it
has no `allowCustomValue`.

### The answer

The selection is an array of values whatever the mode, because Ark's collection is keyed
by value and a single-answer shape would be a second thing to convert on every change.
It is controllable: React takes `value` with `onValueChange`, or `defaultValue` to leave
it alone; Vue takes `v-model`.

`multiple` takes more than one answer. `deselectable` lets a second click on the chosen
option take the answer back, which only means anything when one answer is taken at a
time.

```tsx
<Select items={items} multiple />
<Select items={items} deselectable />
```

```vue
<Select :items="items" multiple />
<Select :items="items" deselectable />
```

### The two indicators

The clear button and the chevron sit in a box floated over the button's trailing edge,
not inside it, because a browser will not keep a button nested in a button. The box
ignores the pointer so a click in the gap between the icons still opens the list, and the
clear button turns the pointer back on for itself.

`clearable` draws the first and is on by default. `spin` turns the chevron over while the
list is open and is on by default too. It is a variant rather than a fixed class because
`trailingIcon` replaces the icon, and an arbitrary one does not always read as something
that should turn.

### Colour

The accent reaches the focus ring on the button and the highlight on an option, and
nothing else. The chosen option takes the accent as its text colour, which is the same
place the Combobox puts it.
