---
name: Popover
key: popover
module: popover
summary: A titled panel anchored to whatever opened it, across three sizes and twelve placements, with an arrow and a modal mode.
---

A popover is a panel attached to the thing that opened it. It is the Dialog's anatomy on
the Tooltip's geometry: the panel holds a title, a description and a body addressed by
name, and where it sits and how it moves is the popper's.

```tsx
<Popover title="Notifications" body="Everything that happened while you were away.">
  <Button>Notifications</Button>
</Popover>
```

```vue
<Popover title="Notifications">
  <Button>Notifications</Button>
  <template #body>Everything that happened while you were away.</template>
</Popover>
```

The children are the trigger, not the content. That is the rule for every component
carrying the caller's own content: the trigger is the one part a caller has to own,
because it is their own element that has to carry the popover's props, so it is what the
default slot is spent on.

### Which to reach for

A tooltip explains, a popover holds. If the reader has to click something inside it, or
select text out of it, or read more than a line, it is a popover. If the panel is the
whole task rather than a detail of the page behind it, it is a dialog.

### The panel's parts

`title` and `description` sit at the top, and the title labels the panel for a screen
reader. `body` is everything under them. React takes `body` as a prop and Vue as a slot,
which is the same split the Dialog makes.

`close` puts a button in the top corner. The title keeps out of its way on its own: the
button is positioned over the panel rather than sharing a row with the title, and the
recipe reserves the space when the button is there. A popover with no title would
otherwise show an empty bar.

### Where it sits

`placement` names one of the twelve sides and corners, defaulting to `bottom`, and
`offset` is the gap in pixels. Ark moves the panel when the side it was asked for would
put it off screen, so a placement is a preference rather than an instruction.

`arrow` draws a triangle pointing back at the trigger. The panel fades and scales from
the edge nearest that trigger, using the Dialog's own keyframes and the transform origin
Ark writes for the placement it settled on, so nothing in the recipe branches on
placement.

### Getting out

`dismissible` is one prop over Ark's two switches, Escape and a click outside, because a
caller thinking about a panel that should not be dismissed is thinking about both at
once. Turning it off leaves the close button as the only way out, so pass `close` with it.

```tsx
<Popover title="Confirm" body="This one needs an answer." dismissible={false} close>
  <Button>Delete</Button>
</Popover>
```

```vue
<Popover title="Confirm" :dismissible="false" close>
  <Button>Delete</Button>
  <template #body>This one needs an answer.</template>
</Popover>
```

`modal` traps focus in the panel, blocks scrolling and hides the rest of the page from a
screen reader. It is off by default, because a popover that a reader can click past is
usually the point.
