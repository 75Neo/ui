---
title: Container
description: Centres its children and holds them to the width in the container token.
category: Layout
registryItem: container
---

## Usage

```tsx
import Container from "@/components/ui/container/Container";

<Container>
  <h1>Release notes</h1>
</Container>;
```

```vue
<script setup lang="ts">
import Container from "@/components/ui/container/Container.vue";
</script>

<template>
  <Container>
    <h1>Release notes</h1>
  </Container>
</template>
```

## What it does

The whole component is one recipe with no variants:

```ts
export const container = tv({
  base: "mx-auto w-full max-w-(--ui-container) px-5 sm:px-8 lg:px-12",
});
```

Full width up to the ceiling, centred past it, with gutters that step up at the small and large
breakpoints so text never touches the edge of a phone.

## Changing the width

The ceiling is the `--ui-container` token, `50rem` by default. Change it once and every container
in the application follows:

```css
:root {
  --ui-container: 64rem;
}
```

For a single wider section, override the class instead:

```tsx
<Container className="max-w-6xl">
```

## Nesting

Containers nest without compounding the gutters in a useful way, so do not put one inside another.
When a section needs to break out to full bleed, close the container and open a new one after the
full width block rather than trying to escape it with negative margins.
