---
name: Tooltip
key: tooltip
module: tooltip
order: 16
summary: A bubble that appears beside whatever it explains, across three sizes and twelve placements, with an optional arrow.
---

A tooltip explains the element it is wrapped around. The element stays the caller's own:
it is handed to Ark with `asChild`, so what appears in the page is the button that was
written, carrying the tooltip's props, rather than a wrapper around it.

```tsx
<Tooltip text="Saves without leaving the page">
  <Button>Save</Button>
</Tooltip>
```

```vue
<Tooltip text="Saves without leaving the page">
  <Button>Save</Button>
</Tooltip>
```

That trigger has to be focusable. A `button` or a link already is; a `span` is not, and a
tooltip on one is reachable by pointer only.

### What the bubble holds

`text` takes a string, which is what most tooltips are. Anything more comes through
`content` in React and the `content` slot in Vue, and either beats `text` when both are
given.

```tsx
<Tooltip
  content={
    <span>
      Press <kbd>⌘S</kbd> to save
    </span>
  }
>
  <Button>Save</Button>
</Tooltip>
```

```vue
<Tooltip>
  <Button>Save</Button>
  <template #content>Press <kbd>⌘S</kbd> to save</template>
</Tooltip>
```

Keep it short either way. A tooltip that needs a paragraph is a Popover.

### Where it sits

`placement` names one of the twelve sides and corners, and `offset` is the gap in pixels
between the bubble and its trigger. Ark flips the bubble to the opposite side when there
is no room on the one asked for, so the placement is a preference rather than an
instruction.

```tsx
<Tooltip text="Below, and pointing up" placement="bottom" arrow>
  <Button>Save</Button>
</Tooltip>
```

```vue
<Tooltip text="Below, and pointing up" placement="bottom" arrow>
  <Button>Save</Button>
</Tooltip>
```

`arrow` draws a small triangle that points back at the trigger. It is off by default,
because a bubble sitting eight pixels from what it explains rarely needs one.

### The motion is the Dialog's

The bubble fades and scales with the same keyframes the Dialog's panel uses, so
everything that appears over the page moves the same way. The only thing a bubble adds is
where it scales from: Ark writes a transform origin on the positioner for the placement it
settled on, and the recipe reads it, so a tooltip above its trigger grows downward and one
below it grows up. Nothing in the recipe branches on placement to do that.

`transition` turns the motion off for a caller who would rather animate the bubble
themselves.

### Delays, and staying out of the way

`openDelay` is how long a pointer rests before the bubble appears, and `closeDelay` how
long it lingers after the pointer leaves. Ark's defaults are 400ms and 150ms, which is
what keeps a row of buttons from flashing bubbles as the pointer crosses it.

`interactive` keeps the bubble open while the pointer is over the bubble itself, which is
what a tooltip holding a link needs. `disabled` stops the tooltip appearing at all
without removing it from the tree, so a component can turn its own explanation off
without changing shape.
