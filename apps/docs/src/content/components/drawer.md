---
name: Drawer
key: drawer
module: drawer
summary: A panel sliding in from an edge, with a title and a cross.
---

Pass the heading and the body as data, and the trigger as children. `placement`
drives which edge the panel docks to, and the size runs along the panel's long
dimension on every edge.

```tsx
<Drawer
  title="Settings"
  description="Tune the workspace."
  body="Every control lives in the panel, so the page behind stays put."
>
  <button type="button">Settings</button>
</Drawer>
```

```vue
<Drawer
  title="Settings"
  description="Tune the workspace."
  body="Every control lives in the panel, so the page behind stays put."
>
  <button type="button">Settings</button>
</Drawer>
```

The eight compound rows pair each edge with each size, so a `left` drawer is tall
and narrow while a `bottom` drawer is short and wide. `dismissible` is the one
dismissal prop, `overlay` drops the backdrop, and `transition` off is for a caller
animating the panel themselves.
