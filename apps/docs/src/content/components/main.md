---
name: Main
key: main
module: main
summary: The content region, sized to fill what the Header leaves.
---

A page whose content is shorter than the viewport leaves the Footer floating in the
middle of the screen unless something claims the remaining height. The remaining
height is the viewport less the header token, and nothing else on the page can measure
it.

```tsx
<Main>
  <Container>…</Container>
</Main>
```

```vue
<Main>
  <Container>…</Container>
</Main>
```

The element is a `main`, the landmark a screen reader jumps to, and there is one per
page. A page with no Header still works: the token is set either way, so the region is
merely a little short rather than wrong.
