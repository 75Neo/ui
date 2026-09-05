---
name: Combobox
key: combobox
module: combobox
summary: A field that filters a list as it is typed into, across three sizes and seven accents, single or multiple.
---

A combobox is a text field with a list behind it. Typing narrows the list, the arrow keys
walk it, and Enter takes the option under the cursor. It is what a `<select>` becomes once
there are more options than a reader will scroll through.

```tsx
<Combobox
  label="Language"
  items={[
    { value: "ts", label: "TypeScript" },
    { value: "rs", label: "Rust" },
  ]}
/>
```

```vue
<Combobox
  label="Language"
  :items="[
    { value: 'ts', label: 'TypeScript' },
    { value: 'rs', label: 'Rust' },
  ]"
/>
```

### Options are data, not markup

`items` is an array of plain objects, and every one of them carries a `label` the reader
sees and a `value` the form submits. Keeping the two apart is the whole reason a combobox
is not a text input: what is stored need not read like English, and what reads like
English need not be stable.

An option can also carry `disabled` and an `icon`. The text stays plain strings so an item
stays serializable; for richer markup use the adapter's escape hatch, which in Vue is the
`item` scoped slot.

### The filter is the component's own

The field owns the text and the query. There is no `inputValue` prop, no `filter` prop and
no collection to build: pass `items` and the component narrows them, case-insensitively,
on any substring of the label.

Only typing narrows the list. Ark rewrites the field itself when an option is picked or
the field is cleared, and treating that rewrite as a query would leave the list showing
the one option already chosen, so every other reason widens the list back to everything. A
reader who reopens the list sees all of it.

Filtering server-side is the same component with a different `items`: fetch on your own
input handler and hand back a new array. Because the collection is rebuilt from the prop
rather than captured once, the new options reach the popup on the next render.

### One selection or several

The value is an array of option values whatever the mode, because a multiple selection is
many and a single one is one, and one shape beats converting between two.

React takes `value` with `onValueChange`, or `defaultValue` to leave the state alone. Vue
takes `v-model`, with `defaultValue` as the uncontrolled counterpart.

```tsx
const [picked, setPicked] = useState<string[]>([]);

<Combobox items={items} multiple value={picked} onValueChange={(d) => setPicked(d.value)} />;
```

```vue
<script setup lang="ts">
import { Combobox } from "@75neo/vue";

const picked = ref<string[]>([]);
</script>

<template>
  <Combobox v-model="picked" :items="items" multiple />
</template>
```

With `multiple` the field clears itself after each pick, which is Ark's behaviour and the
right one: the next thing typed is a new query rather than an edit of the last answer.
Render the chosen options somewhere of your own.

### The parts you can turn off

- `clearable` draws the button that empties the field, and is the one that is on by
  default.
- `openOnClick` shows the whole list on the first click, rather than waiting for a
  keystroke. Worth it for a short list, less so for a long one.
- `allowCustomValue` accepts text matching no option, for a field that suggests rather
  than restricts.
- `emptyMessage` replaces "No results found." when the filter matches nothing.

### Where the popup lives

The list is rendered at the end of the document rather than where the component is
written, so a card, a dialog or a toolbar that clips its overflow cannot cut the list off.
The move is delayed until the component mounts, which keeps the server-rendered markup and
the first client render identical.

What that costs is stacking: the list is a sibling of everything else at the end of the
document, so a fixed header with a higher `z-index` will still cover it. The `positioner`
slot carries the stacking context, and `ui.positioner` is where to raise it.

### Forms

The component renders a hidden input, so a combobox inside a `form` submits like any other
field. `name` names it and the submitted value is the option's `value`. `required` and
`invalid` do what they do on any input, and `readOnly` shows a selection without letting
anyone change it, which is different from `disabled`: a read-only field still takes focus.
