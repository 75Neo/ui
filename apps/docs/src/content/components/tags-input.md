---
name: TagsInput
key: tagsInput
module: tags-input
summary: A field that grows chips as text is entered.
---

Type text and it becomes a chip; double-click a chip and it becomes text again.
The chips come from Ark's context rather than the prop, which keeps an uncontrolled
field's chips in step with the tags it actually has.

```tsx
<TagsInput label="Tags" defaultValue={["react", "vue"]} />
```

```vue
<TagsInput label="Tags" :default-value="['react', 'vue']" />
```

`delimiter` ends a tag and splits pasted text, `validate` gates candidates, and
`editable` decides whether a chip can be rewritten. The value is a `string[]` in
both frameworks.
