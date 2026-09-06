---
name: Marquee
key: marquee
module: marquee
summary: A row of items scrolling in a seamless loop.
---

This is the one place in the library that ships continuous motion, because the scroll
is the component rather than decoration on one. A reader who has asked for reduced
motion sees a still row.

```tsx
<Marquee items={items} autoFill edge />
```

```vue
<Marquee :items="items" auto-fill edge />
```

`autoFill` duplicates the content until it fills the viewport, which is what makes the
loop seamless. `edge` fades both ends into the page, `reverse` scrolls the other way
and `pauseOnInteraction` stills it while the pointer hovers or focus lands inside.

`side` picks the direction, and `speed` picks one of three named paces. The pace is
ours rather than Ark's numeric one, because the two would fight over the same
duration.
