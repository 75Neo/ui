---
name: Listbox
key: listbox
module: listbox
summary: An inline list of options with no trigger and no portal.
---

Pass the options and the listbox builds its collection and its rows, inline on the
page. There is no trigger to open and no portal to escape through: the frame is the
same popup the Select drops, minus the drop.

```tsx
<Listbox
  items={[
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
  ]}
  label="Framework"
/>
```

```vue
<Listbox
  :items="[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
  ]"
  label="Framework"
/>
```

`selectionMode` collects `"single"`, `"multiple"` or `"extended"`. A chosen row carries
`data-selected` — the same word as `checked` nowhere else, because a listbox was here
first.
