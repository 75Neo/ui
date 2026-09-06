---
name: Container
key: container
module: container
summary: The measure every page's content is held to.
---

A Container is a horizontal constraint and a gutter, which is why every other layout
component can be written without repeating either.

```tsx
<Container>
  <h1>A page</h1>
</Container>
```

```vue
<Container>
  <h1>A page</h1>
</Container>
```

The measure is the container token behind a utility name, so a site that wants a
narrower page changes one custom property and every Container follows, including the
rows inside the Header and the Footer that you never render yourself.

The gutter grows at two breakpoints, so content clears the edge on a phone without
being pushed around on a wide screen.
