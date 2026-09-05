---
name: RadioGroup
key: radioGroup
module: radio-group
summary: A legend and the options under it, across five sizes and seven colors, with a description per option.
---

A radio group is a legend and the options under it, exactly one of which is picked. Each
option is a control, a label, and sometimes a quieter second line, which is the Checkbox's
anatomy repeated per option.

```tsx
const items = [
  { value: "weekly", label: "Weekly", description: "One digest on Monday morning." },
  { value: "daily", label: "Daily", description: "One digest a day, at nine." },
];

<RadioGroup legend="Digest" items={items} defaultValue="weekly" />;
```

```vue
<script setup lang="ts">
const items = [
  { value: "weekly", label: "Weekly", description: "One digest on Monday morning." },
  { value: "daily", label: "Daily", description: "One digest a day, at nine." },
];
</script>

<template>
  <RadioGroup legend="Digest" :items="items" default-value="weekly" />
</template>
```

Reach for it over a set of checkboxes when the options are exclusive and all of them fit
on screen. Past about five, a Select is kinder.

### The legend earns its keep

`legend` names the group for a screen reader and heads it on screen. A horizontal group
keeps it for the screen reader and hides it visually, because a legend above a single row
of options reads as a stray line. It is still there, and still read.

### One option at a time

Each item carries a `value`, a `label`, and optionally a `description` and `disabled`.
Disabling one option does not disable the group; `disabled` on the group itself does.

`invalid` draws every control in the error color whatever the group's own color is, which
is the same rule the Checkbox follows.

### The dot

The selected control is a filled circle with a smaller one inside it, and that smaller one
is a real element reading the control's state rather than a border trick. Ark's own
example grows the control's border to five pixels to make the dot, which would mean adding
a border color to this library's safelist for a shape it can already draw.

### Selection

React takes `value` with `onValueChange`, or `defaultValue` to leave the choice alone. Vue
takes `v-model`, with `defaultValue` as the uncontrolled counterpart.

`name` and `form` submit the picked value with the form around the group, or with one
elsewhere on the page.
