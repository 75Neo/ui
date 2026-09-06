---
name: Footer
key: footer
module: footer
summary: Three regions in a row, and two bands above and below it.
---

The row is held to the Container's measure, so the Footer, the Header and a Container
around the page body all line up.

```tsx
<Footer start={<Copyright />} center={<Nav />} end={<Social />} />
```

```vue
<Footer>
  <template #start><Copyright /></template>
  <template #center><Nav /></template>
  <template #end><Social /></template>
</Footer>
```

The three regions go into the DOM in the order end, center, start and are put back into
reading order by their own classes. That is deliberate: stacked on a phone, the links
people came for should be above the copyright, and reversing the source is the only way
to get that without duplicating the markup.

The two bands are full-bleed and unpadded horizontally, so a newsletter strip or a wide
grid of columns can run to the edge. Each appears only when something is put in it, so
the plain case is a single row.
