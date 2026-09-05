---
title: Getting started
description: One package, one stylesheet import, and a component on the page. Then the three ways to restyle it, from broadest to narrowest.
---

## Import the theme

The library styles itself with Tailwind CSS, so both imports go in the stylesheet your
app already loads.

```css
@import "tailwindcss";
@import "@75neo/themes";
```

That one import ships the tokens, the `light` and `dark` variants, and the base layer.
Dark mode is a `.dark` class on a root element and nothing else needs wiring, so a
theme toggle only has to move that class.

## Render something

```tsx
import { Button } from "@75neo/react";

export function App() {
  return (
    <Button variant="solid" color="primary">
      Get started
    </Button>
  );
}
```

```vue
<script setup lang="ts">
import { Button } from "@75neo/vue";
</script>

<template>
  <Button variant="solid" color="primary">Get started</Button>
</template>
```

Both adapters render the same markup, carry the same `data-slot` attributes, and take
the same props. Anything below is true of both unless it says otherwise.

## The cascade

Four layers can set a component's classes, and they fold weakest first. Tailwind-merge
settles conflicts, so a later layer replaces a utility it conflicts with and every
non-conflicting utility from every layer survives.

1. **The recipe.** What the component looks like out of the box.
2. **`Theme` layers.** Every `Theme` above the component, already folded into one config.
3. **The `ui` prop.** This call site, per slot.
4. **`class` or `className`.** This call site, reaching the `base` slot only.

That is the whole model. The three ways to restyle below are entry points into it.

### Redefine the tokens

The broadest change, and the one a rebrand usually wants. Every value is a plain custom
property, so redefining it after the import moves everything built on it.

```css
:root {
  --ui-radius: 0.5rem;
  --ui-primary: var(--color-teal-700);
}

.dark {
  --ui-primary: var(--color-teal-400);
}
```

Each semantic color is a single token. Recipes spend it at different strengths with
Tailwind's opacity modifier — `bg-primary/10` for a soft fill, `hover:bg-primary/75` for
a solid hover — rather than reaching for a second token. That is what keeps a rebrand
down to one line per color, with no role left to retune by hand.

### Wrap a subtree in `Theme`

Restyles every component below it. Nesting composes: an inner `Theme` is folded onto the
one it sits inside, so a component reads one flat config rather than walking a chain.

```tsx
import { Theme, Button } from "@75neo/react";

<Theme theme={{ button: { ui: { base: "rounded-full" }, props: { color: "neutral" } } }}>
  <Button>Rounded and neutral by default</Button>
</Theme>;
```

```vue
<script setup lang="ts">
import { Theme, Button } from "@75neo/vue";
</script>

<template>
  <Theme :theme="{ button: { ui: { base: 'rounded-full' }, props: { color: 'neutral' } } }">
    <Button>Rounded and neutral by default</Button>
  </Theme>
</template>
```

`ui` adds classes per slot. `props` sets new defaults for the component's variant props,
which a call site can still override.

Keep the config object stable. A fresh literal on every render re-folds the theme chain
for everything underneath it.

### Pass `ui` to one component

The narrowest change, and the one that reads best where a call site is genuinely a
one-off.

```tsx
<Button ui={{ base: "rounded-full", label: "tracking-wide" }}>One-off</Button>
```

```vue
<Button :ui="{ base: 'rounded-full', label: 'tracking-wide' }">One-off</Button>
```

The keys are the component's slots, which is the same word as its `data-slot` attribute
and the same word the recipe uses. One vocabulary per component, and the reference lists
it.

## Type safety

The theme registry is a global interface that each component module augments, so a
`ThemeConfig` only accepts keys for components that exist, and only accepts props those
components actually take.

```tsx
import type { ThemeConfig } from "@75neo/react";

const theme: ThemeConfig = {
  button: { props: { color: "neutral" } },
  // buton: {} — a typo here is a type error, not a silent no-op
};
```

```vue
<script setup lang="ts">
import type { ThemeConfig } from "@75neo/vue";

const theme: ThemeConfig = {
  button: { props: { color: "neutral" } },
  // buton: {} — a typo here is a type error, not a silent no-op
};
</script>
```

A theme is plain data with no functions and no class instances, so it stays serializable
and safe to reuse across trees.
