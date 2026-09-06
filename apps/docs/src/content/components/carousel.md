---
name: Carousel
key: carousel
module: carousel
summary: A paged slideshow with arrows and a row of dots.
---

Pass the slides as data and the count follows from the array. The arrows, the track
and the dots all arrive composed.

```tsx
const items = [
  { id: "one", content: "Slide one" },
  { id: "two", content: "Slide two" },
];

<Carousel items={items} />;
```

```vue
<Carousel :items="items" />
```

`loop` wraps around instead of stopping at the last slide, `slidesPerPage` shows more
than one at a time with `spacing` between them, and `autoplay` advances on a timer,
taking a delay in milliseconds to set the pace.

Orientation is not an axis. Every part reads the attribute Ark writes, so `vertical`
turns the same class strings sideways. There is no color either: a slideshow carries
no meaning, what is in it does.
