---
name: Menu
key: menu
module: menu
order: 33
summary: The panel a trigger drops, from one flat array of rows, with headings, ticks, links and submenus to any depth.
---

A trigger and the panel it drops. The trigger is whatever you put in the default slot,
and the rows are one flat array.

```tsx
<Menu
  items={[
    { type: "label", label: "File" },
    { label: "New file", icon: <FileText />, shortcut: "⌘N" },
    { label: "Export as", children: [{ label: "PDF" }, { label: "PNG" }] },
    { type: "separator" },
    { label: "Delete", icon: <Trash2 />, shortcut: "⌫" },
  ]}
>
  <Button variant="outline">Actions</Button>
</Menu>
```

```vue
<Menu :items="items">
  <Button variant="outline">Actions</Button>
</Menu>
```

### One flat array

A group is a `label` row and the rows after it, rather than an array of arrays. That is
how a menu reads down the page, and it means a caller building rows from data never has
to decide where one array ends and the next begins. The nesting Ark's markup wants is
worked out from the flat list at render time.

Every row is one of four things, set by `type`:

- **`item`**, the default. A label, an optional `icon`, an optional `shortcut` printed at
  the trailing edge. Give it `href` and the whole row becomes the link, so a middle click
  opens a tab.
- **`checkbox`**. Carries `checked` and `onCheckedChange`, and shows a tick at the
  trailing edge where the Select shows its own.
- **`label`**. A heading. It starts a group and is not itself a row.
- **`separator`**. A rule between groups.

Any row with `children` opens a submenu instead, whatever its type, to any depth.

### One recipe, every level

A submenu is another Menu, which is Ark's own shape, so the panel it opens is the same
`base` slot as the panel above it. Theming `menu.base` reaches every level at once, and
there is no second key for a nested panel.

The four kinds of row share the `item` slot for the same reason. A reader does not see
four kinds of row; they see rows, one of which has a tick and one of which opens another
panel. Four slots would mean restating the same padding four times to change it once.

### There is no radio row

A menu offering one answer out of several is a Select wearing a menu's clothes. Ark has
the part, and this library would rather send a caller to the Select than keep two ways of
asking the same question.

### Position and behaviour

`placement` picks a side, `bottom-start` by default, and `offset` the gap. `arrow` points
a triangle back at the trigger. The panel is capped by the room Ark measures below it, so
a long menu near the bottom of a window scrolls rather than running off it.

`closeOnSelect` is on, and a single row can opt out of it. `typeahead` jumps to a row as
letters are typed, and `loopFocus` wraps the arrow keys from the last row to the first.

The open state is controllable: React takes `open` with `onOpenChange`, or `defaultOpen`
to leave it alone; Vue takes `v-model:open`. `onSelect` reports the value of whichever row
was chosen, which is the row's own `value`, else its label, else its position.

### Colour

The accent reaches the highlighted row and a checked one, and nothing else. A separator
and a heading stay in the border and text tokens, because the accent's job here is to say
where you are, not to decorate.
