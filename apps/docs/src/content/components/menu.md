---
name: Menu
key: menu
module: menu
summary: A panel of rows dropped from a trigger, with submenus and ticks.
---

Pass the rows and the trigger. One flat array holds every kind of row — items,
checkboxes, labels, separators, links, and rows with children that open submenus —
and the menu turns it back into the nesting Ark's markup wants.

```tsx
<Menu
  items={[
    { value: "new", label: "New file" },
    { value: "open", label: "Open…" },
    { type: "separator" },
    { value: "save", label: "Save", shortcut: "⌘S" },
  ]}
>
  <button type="button">File</button>
</Menu>
```

```vue
<Menu
  :items="[
    { value: 'new', label: 'New file' },
    { value: 'open', label: 'Open…' },
    { type: 'separator' },
    { value: 'save', label: 'Save', shortcut: '⌘S' },
  ]"
>
  <button type="button">File</button>
</Menu>
```

The trigger is the component's own children, handed to Ark with `asChild`. A submenu
is another Menu nested in the panel, and one set of classes styles every level. There
is no radio row: a menu offering one answer out of several is a Select wearing a
menu's clothes.
