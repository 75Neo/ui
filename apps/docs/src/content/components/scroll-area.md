---
name: ScrollArea
key: scrollArea
module: scroll-area
summary: A scrollable region with scrollbars of its own.
---

The native scrollbar is hidden and a styled one takes its place, showing only while
the pointer is over the region, while it has focus within, or while it scrolls. That
is what keeps a quiet page quiet until the reader reaches for it.

```tsx
<ScrollArea className="h-32">
  <p>Content taller than the box.</p>
</ScrollArea>
```

```vue
<ScrollArea class="h-32">
  <p>Content taller than the box.</p>
</ScrollArea>
```

`orientation` picks which bars are drawn: `vertical` by default, `horizontal`, or
`both`, which adds the small corner where the two meet. `size` sets the bar's
thickness.

The region needs a height of its own. Without one there is nothing to scroll and the
bars never appear.
