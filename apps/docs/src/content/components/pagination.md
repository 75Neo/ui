---
name: Pagination
key: pagination
module: pagination
summary: A row of page numbers with the arrows either side.
---

`count` is how many things there are, not how many pages. The pages follow from it and
`pageSize`, which is the only pair a caller reliably knows: a list that grew by one
changes its page count without anyone deciding to.

```tsx
<Pagination count={96} defaultPage={4} />
```

```vue
<Pagination :count="96" :default-page="4" />
```

`siblingCount` and `boundaryCount` decide how wide the window is, and `edges` adds the
buttons that jump to the first and last page.

Pass `href` and the whole row becomes links, so a crawler can follow the pages and a
reader can open one in a tab. Ark renders anchors then rather than buttons, and every
part picks its element off that one prop.

The current page is filled in the accent and everything else is a ghost, so the row
reads as one thing with a position marked in it.
