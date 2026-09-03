---
name: Main
key: main
module: main
order: 24
summary: The page's content region, tall enough to push a Footer to the bottom of the screen.
---

A page whose content is shorter than the viewport leaves the Footer floating halfway up
the screen unless something claims the remaining height. That height is the viewport less
the Header, which is a number the Main cannot measure and the reason this is a component
rather than a class.

```tsx
<Header title="Acme" />
<Main>
  <Container>{children}</Container>
</Main>
<Footer />
```

```vue
<Header title="Acme" />
<Main>
  <Container><slot /></Container>
</Main>
<Footer />
```

It renders a `main`, which is the landmark a screen reader jumps to, so there should be
exactly one on a page.

### The measurement

The single class is `min-h-[calc(100dvh-var(--ui-header-height))]`. `dvh` rather than
`vh`, so the region does not jump when a mobile browser's address bar slides away.
`--ui-header-height` is the same token the Header sizes itself from, so a theme that
makes the bar taller moves the Main with it.

A page with no Header still works: the token is set either way, so the region is merely a
bar's worth short rather than wrong.
