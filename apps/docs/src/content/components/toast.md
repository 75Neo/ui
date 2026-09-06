---
name: Toast
key: toast
module: toast
summary: A stack of notices held by a store, each with its own copy.
---

Create the store once with `createToaster` — placement, gap and duration are
store options — and render one `Toaster` for it. Each toast carries its own
title, description and action, and the type it was created with styles it: info
and loading stay a card, success, warning and error fill with their color.

```tsx
import { Toaster, createToaster } from "@75neo/react/toast";

const toaster = createToaster({ placement: "bottom-end" });

toaster.create({
  title: "Scheduled for tomorrow",
  description: "Your meeting is at 10am.",
  type: "info",
});

<Toaster toaster={toaster} />;
```

```vue
<script setup lang="ts">
import { Toaster, createToaster } from "@75neo/vue/toast";

const toaster = createToaster({ placement: "bottom-end" });

function schedule() {
  toaster.create({
    title: "Scheduled for tomorrow",
    description: "Your meeting is at 10am.",
    type: "info",
  });
}
</script>

<template>
  <button type="button" @click="schedule">Schedule meeting</button>
  <Toaster :toaster="toaster" />
</template>
```

The store is re-exported from the adapter, so a caller adds no new dependency.
`close` drops the cross from every toast, `portal` moves the stack to the end
of `body`, and the action button renders only when the toast carries one.
