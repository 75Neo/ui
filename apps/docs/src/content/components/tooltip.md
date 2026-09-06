---
name: Tooltip
key: tooltip
module: tooltip
summary: A bubble that appears beside whatever it explains.
---

The trigger is the component's own children, handed to Ark so the trigger is your
element rather than a button wrapping it. That element has to be focusable, or the
tooltip is reachable by pointer only.

```tsx
<Tooltip text="Copied to the clipboard" arrow>
  <Button variant="outline">Hover me</Button>
</Tooltip>
```

```vue
<Tooltip text="Copied to the clipboard" arrow>
  <Button variant="outline">Hover me</Button>
</Tooltip>
```

`placement` picks the side the bubble prefers and `offset` the gap in pixels.
`openDelay` is how long a pointer rests before it appears and `closeDelay` how long it
waits after the pointer leaves. `interactive` keeps it open while the pointer is over
the bubble itself.

The bubble grows from the side it is on, because Ark writes the transform origin on the
positioner and one pair of keyframes reads correctly from all twelve placements.
