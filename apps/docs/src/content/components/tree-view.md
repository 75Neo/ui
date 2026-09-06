---
name: TreeView
key: treeView
module: tree-view
summary: Nested rows that expand, collapse and select.
---

Pass the nodes and the tree builds its collection and its rows. A node with children
is a branch; one without is a leaf. Expansion and selection survive re-renders
because the collection is derived state, rebuilt only when the items change.

```tsx
<TreeView
  items={[
    {
      value: "src",
      label: "src",
      children: [{ value: "src-button", label: "button.tsx" }],
    },
    { value: "readme", label: "README.md" },
  ]}
  label="Files"
/>
```

```vue
<TreeView
  :items="[
    {
      value: 'src',
      label: 'src',
      children: [{ value: 'src-button', label: 'button.tsx' }],
    },
    { value: 'readme', label: 'README.md' },
  ]"
  label="Files"
/>
```

`indentGuide` draws the line along nested content. Branch rows turn their chevron
ninety degrees as they open; leaves carry the selection.
