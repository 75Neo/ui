---
name: Dialog
key: dialog
module: dialog
summary: A centered panel over a backdrop, with a title and a cross.
---

Pass the heading and the body as data, and the trigger as children. The trigger is
the one element the caller has to own — everything else the dialog composes from
`title`, `description`, `header`, `body` and `footer`.

```tsx
<Dialog
  title="Delete project?"
  description="This cannot be undone."
  body="The project and its history leave the workspace for good."
  footer="Cancel"
>
  <button type="button">Delete</button>
</Dialog>
```

```vue
<Dialog
  title="Delete project?"
  description="This cannot be undone."
  body="The project and its history leave the workspace for good."
  footer="Cancel"
>
  <button type="button">Delete</button>
</Dialog>
```

`dismissible` is the one dismissal prop: off keeps both the escape key and the
outside click from closing, which is what a confirmation dialog means by modal-ish.
`overlay` drops the backdrop, `fullscreen` takes the viewport, and `transition` off
is for a caller animating the panel themselves. Only opacity ever animates.
