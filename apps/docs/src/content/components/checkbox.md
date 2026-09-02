---
name: Checkbox
key: checkbox
module: checkbox
order: 8
summary: A box, a label and an optional description, across five sizes and seven colors, with a real indeterminate state.
---

A checkbox is a box, the text beside it, and sometimes a second quieter line under that
text. All three are one component, because a label rendered separately has to be wired
back to the box by hand and usually is not.

```tsx
<Checkbox label="Remember this device" />
<Checkbox label="Weekly digest" description="One email on Monday." color="success" />
```

```vue
<Checkbox label="Remember this device" />
<Checkbox label="Weekly digest" description="One email on Monday." color="success" />
```

The whole thing is one `label` element, so clicking the text toggles the box without any
`for` attribute to keep in sync.

### The three states

`checked` is `true`, `false`, or `"indeterminate"` — a third state, not a style. It is
what a parent checkbox shows when some but not all of its children are ticked, and the
component draws it as a filled box with a dash instead of a tick.

None of the three is a recipe variant. Ark writes `data-state` on the control and the
recipe styles itself off that attribute, so a resolved class string covers all three and
toggling a box never re-resolves it.

React takes `checked` with `onCheckedChange`, or `defaultChecked` to leave the state
alone. Vue takes `v-model:checked`, with `defaultChecked` as the uncontrolled
counterpart.

```tsx
const [granted, setGranted] = useState<string[]>([]);

<Checkbox
  label="All scopes"
  checked={granted.length === scopes.length ? true : granted.length > 0 ? "indeterminate" : false}
  onCheckedChange={(details) => setGranted(details.checked === true ? [...scopes] : [])}
/>;
```

```vue
<script setup lang="ts">
const accepted = ref(false);
</script>

<template>
  <Checkbox v-model:checked="accepted" label="I accept the terms" />
</template>
```

### Alignment

The box sits in a `container` slot whose height is the label's own line height, so it
lines up with the first line of text rather than with the top of the block. That is what
keeps a checkbox with a two-line description looking right, and it is why the size
variant sets a height there as well as a box size.

### Icons

`icon` replaces the tick and `indeterminateIcon` replaces the dash. In Vue the `icon`,
`indeterminateIcon`, `label` and `description` slots take arbitrary markup and win over
the props of the same name.

### Forms

The component renders a hidden input, so a checkbox inside a `form` submits like a
native one. `name` names it, `value` is what gets submitted when it is checked, and
`required` and `form` do what they do on any input. `readOnly` shows the state without
letting anyone change it, which is different from `disabled`: a read-only checkbox still
takes focus.
