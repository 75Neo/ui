---
name: Carousel
key: carousel
module: carousel
order: 4
summary: A looping, autoplaying slideshow with keyboard, drag and indicator navigation, wrapping Ark UI.
---

Slides are data, like accordion rows. Pass `items` and the carousel renders the viewport,
the arrows and the indicator dots.

```tsx
<Carousel
  items={[
    { id: "one", content: "First" },
    { id: "two", content: "Second" },
  ]}
  loop
  autoplay={{ delay: 4000 }}
/>
```

```vue
<Carousel
  :items="[
    { id: 'one', content: 'First' },
    { id: 'two', content: 'Second' },
  ]"
  loop
  :autoplay="{ delay: 4000 }"
/>
```

`slidesPerPage` shows several slides at once and `spacing` is the gap between them, as a
CSS length. `allowMouseDrag` lets the pointer drag the track, which touch does anyway.

### The current page

React and Vue spell a controlled value too differently to share one type, so this prop
lives outside the shared contract. React takes Ark UI's `page`, `defaultPage` and
`onPageChange`. Vue takes `v-model:page`, with `defaultPage` as the uncontrolled
counterpart.

```tsx
<Carousel items={items} page={page} onPageChange={({ page }) => setPage(page)} />
```

```vue
<Carousel :items="items" v-model:page="page" />
```

### Arbitrary markup in a slide

`content` on an item is text. For anything else use `renderItem` in React or the `item`
slot in Vue, both of which receive the item and its index.
