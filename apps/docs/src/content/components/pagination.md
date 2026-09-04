---
name: Pagination
key: pagination
module: pagination
order: 34
summary: The row of page numbers and the arrows either side, across three sizes and seven accents, as buttons or as links.
---

A row of page numbers with arrows either side, and gaps where the numbers were left out.

```tsx
<Pagination count={200} defaultPage={4} edges />
```

```vue
<Pagination :count="200" :default-page="4" edges />
```

### It is told how many things there are

`count` is how many items there are in total, not how many pages, and `pageSize` is how
many of them fit on one. The pages follow from the pair.

That is deliberate. Those two numbers are the ones a caller reliably knows: a list that
grew by one changes its page count without anyone deciding to, and a component asking for
the page count would make every caller do that division themselves and get it wrong at
the boundary.

### The shape of the row

`siblingCount` is how many pages to show either side of the current one, and
`boundaryCount` how many to keep at each end. Between them the row grows a gap, which is
the `ellipsis` slot. `edges` adds the two buttons that jump straight to the first and last
page.

```tsx
<Pagination count={200} siblingCount={2} boundaryCount={2} />
<Pagination count={200} siblingCount={0} />
```

```vue
<Pagination :count="200" :sibling-count="2" :boundary-count="2" />
<Pagination :count="200" :sibling-count="0" />
```

### Buttons or links

Give it `href` and every page becomes an anchor to the address it returns, so a crawler
can follow the pages and a reader can open one in a tab. Without it the pages are buttons
and the page changes in place.

One prop decides both, rather than a `type` beside it. A caller who has the addresses has
already said they want links, and asking a second time would only create a way to answer
inconsistently.

```tsx
<Pagination count={200} href={(page) => `/posts?page=${page}`} />
```

```vue
<Pagination :count="200" :href="(page) => `/posts?page=${page}`" />
```

### The page

Controllable the usual way: React takes `page` with `onPageChange`, or `defaultPage` to
leave it alone; Vue takes `v-model:page`.

### Colour

The accent fills the current page and nothing else. Every other button is a ghost, so the
row reads as one thing with a position marked in it rather than as nine buttons of equal
weight. The hover shade is written so that passing over the page you are already on does
not lift the accent off it.
