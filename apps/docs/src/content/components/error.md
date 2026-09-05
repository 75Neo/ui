---
name: Error
key: error
module: error
summary: The page shown when there is nothing else to show, across seven colors, centred in what the Header leaves.
---

A status, a headline, a sentence, and whatever way out the caller offers. It renders a
`main`, because on an error page this is the page.

```tsx
<Error
  icon={<TriangleAlert />}
  statusCode={404}
  statusMessage="Page not found"
  message="Nothing answers at that address."
>
  <Button>Back to home</Button>
</Error>
```

```vue
<Error
  :icon="TriangleAlert"
  :status-code="404"
  status-message="Page not found"
  message="Nothing answers at that address."
>
  <Button>Back to home</Button>
</Error>
```

Every row disappears when its prop is absent, so the same component serves a bare status
and a full stack of detail. A `message` identical to `statusMessage` is dropped rather
than printed twice, which is what a server that fills both fields the same way produces.

### There is no clear button

Nuxt UI's Error can offer to clear the error, because it runs inside a framework that
owns the router and knows what clearing means. This one has no router, so the way out is
the caller's and goes in the default slot. That is the only real difference between the
two.

### Colour

The colour reaches the status code and the icon above it, and nothing else. The headline
and the body stay in the text tokens, because an error page is already loud and colouring
the sentence people are meant to read makes it harder.

`error` is not the default. A 404 is not a failure, and a page that should look like one
asks for it.

```tsx
<Error color="error" statusCode={500} statusMessage="Something went wrong" />
```

```vue
<Error color="error" :status-code="500" status-message="Something went wrong" />
```

### Height

The page fills the viewport less the Header, from the same `--ui-header-height` the Main
uses, so a 404 under a bar is centred in the space below it rather than in the viewport.
Nothing here assumes a Header exists: with none, the region is a bar's worth short, which
still reads as centred.
