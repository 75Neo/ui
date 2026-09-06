---
name: Select
key: select
module: select
summary: A button showing the current answer, and the list it opens.
---

Pass the options and the select builds its collection and its rows. The trigger shows
the current answer; the chevron beside it turns over while the list is open, unless a
custom glyph says otherwise.

```tsx
<Select
  items={[
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
  ]}
  label="Framework"
  placeholder="Select"
/>
```

```vue
<Select
  :items="[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
  ]"
  label="Framework"
  placeholder="Select"
/>
```

`multiple` collects several answers, `clearable` keeps the cross that empties the
control, and `deselectable` lets a second click unchoose in single selection. The
selection itself is Ark's: `value` with `onValueChange` in React, `v-model` in Vue,
a `string[]` in both.

A chosen row carries `data-state="checked"`, a row under the pointer carries
`data-highlighted`, and an empty trigger carries `data-placeholder-shown` — three
states, three attributes, no variants spent on any of them.
