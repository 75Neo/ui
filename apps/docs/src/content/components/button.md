---
name: Button
key: button
module: button
order: 1
summary: Six variants across seven colors and five sizes, with block, square, loading and icon slots.
---

`variant` and `color` are independent, so the two together describe a table of forty-two
cells rather than a list of named buttons. Pick the weight from `variant` and the meaning
from `color`.

```tsx
<Button variant="solid" color="primary">Save</Button>
<Button variant="outline" color="neutral">Cancel</Button>
<Button variant="ghost" color="error">Delete</Button>
```

```vue
<Button variant="solid" color="primary">Save</Button>
<Button variant="outline" color="neutral">Cancel</Button>
<Button variant="ghost" color="error">Delete</Button>
```

Size is padding rather than a fixed height, so a button grows with whatever type scale it
inherits instead of clipping.

### Icons

Pass a rendered icon to `leadingIcon` or `trailingIcon`. In Vue the `leading` and
`trailing` slots take arbitrary markup and win over the props of the same name.

```tsx
import { ArrowRight } from "lucide-react";

<Button trailingIcon={<ArrowRight />}>Continue</Button>;
```

```vue
<script setup lang="ts">
import { ArrowRight } from "@lucide/vue";
</script>

<template>
  <Button :trailing-icon="ArrowRight">Continue</Button>
</template>
```

An empty icon slot still costs width, so a slot renders only when something fills it or
`leading` / `trailing` reserved it on purpose. Reserve one when a column of buttons
should keep its labels aligned.

A button with an icon and no label sets `square` for itself, so an icon button needs
nothing said about its padding.

### Loading

`loading` disables the button and spins whichever icon slot is showing. A button already
showing a trailing icon and nothing leading spins that one in place, rather than growing
a second icon box on the other side.

```tsx
<Button loading>Saving</Button>
<Button loading loadingIcon={<Spinner />}>Saving</Button>
```

```vue
<Button loading>Saving</Button>
<Button loading :loading-icon="Spinner">Saving</Button>
```
