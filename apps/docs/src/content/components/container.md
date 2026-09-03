---
name: Container
key: container
module: container
order: 23
summary: The measure a page's content is held to, and the gutter that keeps it off the edge. One slot and no variants.
---

A Container is a horizontal constraint and a gutter, and nothing else. It exists so that
every other layout component can be written without repeating either: the Header and the
Footer hold their rows to the same measure, and a page body puts one around its own
content, so all three line up.

```tsx
<Container>
  <h1>Everything here is held to the page measure</h1>
</Container>
```

```vue
<Container>
  <h1>Everything here is held to the page measure</h1>
</Container>
```

### One number moves everything

The width is `max-w-page`, which is `--ui-container` behind a utility name. A site that
wants a narrower measure changes that one custom property and every Container follows,
including the rows inside the Header and the Footer that are never rendered by hand.

```css
:root {
  --ui-container: 64rem;
}
```

The gutter grows at two breakpoints, so content clears the edge on a phone without being
pushed around on a wide screen.

### No variants, and no `as`

This is the only recipe in the library with no variant at all. A Container that needs to
be narrower takes a `class`, because the case is rare enough that a variant would be a
worse answer than the escape hatch.

There is no `as` prop either, and no other layout component here has one. Nuxt UI gives
every layout component one because a Nuxt page is a tree of them and the semantics have
to be spelled somewhere. This library ships the elements that carry the semantics
instead — the Header renders a `header`, the Main a `main`, the Footer a `footer` — so a
Container is free to stay the `div` it always is.
