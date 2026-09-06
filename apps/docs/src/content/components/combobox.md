---
name: Combobox
key: combobox
module: combobox
summary: A text field that happens to open a list, filtering as it is typed into.
---

Pass the options and the combobox builds its collection and its rows. Typing narrows
the list; picking an option or clearing the field widens it back to everything.

```tsx
<Combobox
  items={[
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
  ]}
  label="Framework"
  placeholder="Type to filter"
/>
```

```vue
<Combobox
  :items="[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
  ]"
  label="Framework"
  placeholder="Type to filter"
/>
```

The text in the field is the component's own business and is not a prop: a caller who
needs to drive the query drives `items` instead. Only typing narrows the list — Ark
rewrites the field itself when an option is picked, and treating that rewrite as a
query would leave the list showing the one option already chosen.

The ring sits `focus-within` on the box around the input, where a Select draws it on
the button itself. One rule, two geometries.
