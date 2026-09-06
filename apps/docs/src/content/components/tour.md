---
name: Tour
key: tour
module: tour
summary: A guided walk over the page, one anchored card at a time.
---

Describe the walk as steps in `useTour` — dialog steps center, tooltip steps
anchor to a target — and render one `Tour` for the tour object. The current
step's title, description, progress text and actions render the way Toast's do,
from the step itself.

```tsx
import { Tour, useTour } from "@75neo/react/tour";

const steps = [
  {
    id: "welcome",
    type: "dialog",
    title: "Welcome!",
    description: "A quick walk over the page.",
    actions: [{ label: "Start", action: "next" }],
  },
];

const tour = useTour({ steps });

<button type="button" onClick={() => tour.start()}>
  Start tour
</button>;
<Tour tour={tour} />;
```

```vue
<script setup lang="ts">
import { Tour, useTour } from "@75neo/vue/tour";

const steps = [
  {
    id: "welcome",
    type: "dialog",
    title: "Welcome!",
    description: "A quick walk over the page.",
    actions: [{ label: "Start", action: "next" }],
  },
];

const tour = useTour({ steps });
</script>

<template>
  <button type="button" @click="tour.start()">Start tour</button>
  <Tour :tour="tour" />
</template>
```

The hook is re-exported from the adapter, so a caller adds no new dependency.
The open state is the tour object's — `start` opens it, `dismiss` closes it —
so there is no `open` prop. `arrow` drops the triangle, `close` the cross, and
the last action button fills solid to mark the way forward.
