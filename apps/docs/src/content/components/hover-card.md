---
name: HoverCard
key: hoverCard
module: hover-card
summary: A small panel appearing beside whatever it describes.
---

Pass the heading and the body as data, and the hovered element as children.
Hover opens the card and leaving closes it — the popover's sibling without a
cross, so there is no `close` and no `dismissible`.

```tsx
<HoverCard
  title="@handle"
  description="Joined in 2021 · 4.2k followers"
  body="Hover the name to see who is behind it."
>
  <button type="button">@handle</button>
</HoverCard>
```

```vue
<HoverCard
  title="@handle"
  description="Joined in 2021 · 4.2k followers"
  body="Hover the name to see who is behind it."
>
  <button type="button">@handle</button>
</HoverCard>
```

`placement` picks the preferred side, `offset` the gap in pixels, and `arrow`
points a small triangle back at the trigger. `openDelay` and `closeDelay` keep a
passing cursor from flashing the card. Only opacity ever animates.
