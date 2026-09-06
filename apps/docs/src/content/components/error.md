---
name: Error
key: error
module: error
summary: The page shown when there is nothing else to show.
---

It fills what the Header leaves, from the same token the Main uses, so a 404 sitting
under a bar is centred in the space below it rather than in the viewport.

```tsx
<Error statusCode={404} statusMessage="Page not found" message="Nothing lives here.">
  <Button>Go back</Button>
</Error>
```

```vue
<Error :status-code="404" status-message="Page not found" message="Nothing lives here.">
  <Button>Go back</Button>
</Error>
```

Each row disappears when its prop is absent, so the same component serves a bare 404
and a full stack of detail. A message that merely repeats the status message renders
once.

The colour reaches the status code and the icon above it, and nothing else: an error
page is already loud, and colouring the sentence people are meant to read makes it
harder. `error` is not the default, because a 404 is not a failure.

There is no button and no prop to draw one. This library has no router, so the links
under the message are yours.
