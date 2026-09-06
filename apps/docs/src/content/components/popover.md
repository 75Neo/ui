---
name: Popover
key: popover
module: popover
summary: A small panel anchored to a trigger, with a title and a cross.
---

Pass the heading and the body as data, and the trigger as children. `placement`
picks the preferred side and `offset` the gap in pixels; `arrow` points a small
triangle back at the trigger.

```tsx
<Popover
  title="About this row"
  description="A quieter line under the heading."
  body="The panel's main content sits under both."
  arrow
>
  <button type="button">More</button>
</Popover>
```

```vue
<Popover
  title="About this row"
  description="A quieter line under the heading."
  body="The panel's main content sits under both."
  arrow
>
  <button type="button">More</button>
</Popover>
```

`close` adds the cross, and the title and description pad for it when it is on —
read the room from the root rather than from the button. `dismissible` is the one
dismissal prop, and `transition` off is for a caller animating the panel
themselves. Only opacity ever animates.
