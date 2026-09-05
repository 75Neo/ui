---
name: TableOfContents
key: tableOfContents
module: table-of-contents
summary: A rail of heading links that follows the reading position, with an indicator that slides to the section on screen.
---

Pass the page's headings and the rail tracks which of them are on screen, moving its
indicator and marking the active link as the reader scrolls.

```tsx
<TableOfContents
  items={[
    { value: "install", depth: 2, label: "Install" },
    { value: "peer-dependencies", depth: 3, label: "Peer dependencies" },
    { value: "the-cascade", depth: 2, label: "The cascade" },
  ]}
/>
```

```vue
<TableOfContents
  :items="[
    { value: 'install', depth: 2, label: 'Install' },
    { value: 'peer-dependencies', depth: 3, label: 'Peer dependencies' },
    { value: 'the-cascade', depth: 2, label: 'The cascade' },
  ]"
/>
```

The rail on the right of this page is this component, reading the headings this page
generated.

### Items

`value` is the `id` of the heading element on the page, not a slug of the label. It is
resolved with `getElementById` to know what is on screen, and the link targets it with a
hash, so an entry whose id is not on the page renders but never activates. Ids are
global to a document, so prefix them when one page holds more than one rail.

`depth` is the heading level as a number: 2 for an `h2`, 3 for an `h3`. Indentation is
styled off the `data-depth` attribute rather than declared as a variant, because one
list holds headings at several levels and a variant resolves once for the whole
component. Levels past four share the deepest indent rather than marching off the edge.

### What it watches

By default the rail watches the page. Pass `scrollEl` when the prose scrolls inside a
panel instead, and `rootMargin` to move the line at which a heading starts counting as
read.

```tsx
<TableOfContents items={items} scrollEl={() => panelRef.current} />
```

```vue
<TableOfContents :items="items" :scroll-el="() => panel" />
```
