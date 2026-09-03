---
name: Dialog
key: dialog
module: dialog
order: 14
summary: A panel over the page in four sizes, with the overlay, the motion and every way out under the caller's control.
---

A Dialog is a panel that takes the page over until it is answered. It is the first
component here whose **default slot is the trigger** rather than the content: the one
element a caller has to own is the button that opens the thing, because it has to be a
real themed `Button` carrying the dialog's own props. Everything inside the panel is
addressed by name, because the recipe positions all of it.

```tsx
<Dialog
  title="Delete this project?"
  description="This cannot be undone."
  body={<p>Deleting it removes every theme and adapter built from it.</p>}
  footer={<Button color="error">Delete</Button>}
>
  <Button variant="outline" color="neutral">
    Open a dialog
  </Button>
</Dialog>
```

```vue
<Dialog title="Delete this project?" description="This cannot be undone.">
  <Button variant="outline" color="neutral">Open a dialog</Button>

  <template #body>
    <p>Deleting it removes every theme and adapter built from it.</p>
  </template>
  <template #footer>
    <Button color="error">Delete</Button>
  </template>
</Dialog>
```

That is the rule to expect from every component after this one. Content the recipe
**positions** is named. The default slot is spent on the caller's own element when there
is one to hand over.

### The parts

`title` and `description` are strings, and they build the header between them. `body` and
`footer` take markup. Passing `header` replaces the whole header, close button included,
for the rare panel that wants its own.

Leaving a part out leaves its element out too: a dialog with no `footer` has no footer
row and no border above one.

### Sizes

Four, from `sm` to `xl`, and they scale the panel's width along with its padding and its
type. `fullscreen` ignores the width entirely and fills the viewport.

The panel never scrolls itself. It caps its own height and hides its overflow, and the
body takes what is left and scrolls, so a long form moves under a header and a footer
that stay where they are.

### Getting out

`dismissible` is the single switch over both of Ark's: Escape and a click outside. Turn
it off and the close button and whatever is in the footer become the only ways out, which
is what a dialog guarding unsaved work wants.

```tsx
<Dialog role="alertdialog" dismissible={false} title="Your session is about to expire">
  <Button>Keep working</Button>
</Dialog>
```

```vue
<Dialog role="alertdialog" :dismissible="false" title="Your session is about to expire">
  <Button>Keep working</Button>
</Dialog>
```

`close` hides the close button on its own, and `closeIcon` replaces it. `role` set to
`alertdialog` tells a screen reader the dialog interrupts rather than merely appears.

### Open and closed

Open is not a recipe variant. Ark writes `data-state` on the panel and the overlay, and
the recipe styles itself off that, so one resolved class string covers both states.

React takes `open` with `onOpenChange`, or `defaultOpen` to leave the state alone. Vue
takes `v-model:open`, with `defaultOpen` as the uncontrolled counterpart. Give neither a
trigger and the dialog is driven entirely from outside.

```tsx
const [open, setOpen] = useState(false);

<Dialog open={open} onOpenChange={(details) => setOpen(details.open)} title="Controlled" />;
```

```vue
<script setup lang="ts">
const open = ref(false);
</script>

<template>
  <Dialog v-model:open="open" title="Controlled" />
</template>
```

### The motion

The panel scales and fades in over an overlay that fades with it, using keyframes shared
with every component that appears over the page. `transition` turns both off, for an
application that already answers `prefers-reduced-motion` itself. `overlay` drops the
backdrop without touching the panel.

Enter and exit name different keyframes on purpose. Ark decides how long to hold the
panel mounted by reading the animation name off the closed state, and a name matching the
open one makes it unmount at once, skipping the exit with nothing to show for it.

### The root slot

`base` is the panel, not a root element, because Ark's dialog root renders nothing at all.
A `class` at the call site lands there, which is what "style this dialog" means.

One consequence worth knowing before writing a test: `data-slot="base"` is not unique on
the page, since every component's root slot carries it and a `Button` inside the panel
has one too. Select the panel with Ark's own `[data-scope="dialog"][data-part="content"]`.

### Staying mounted

`unmountOnExit` takes the panel out of the DOM once it has finished closing, and
`lazyMount` keeps it out until it is opened the first time. Both are off by default,
because a panel that stays mounted is the one that keeps its scroll position and its form
state. `portal` set to `false` leaves the panel where it was written, for the rare case
that wants it inside its own stacking context.
