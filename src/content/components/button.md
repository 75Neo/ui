---
title: Button
description: Six variants, six semantic colours and five sizes over a native button element.
category: Actions
registryItem: button
---

## Installation

```sh
npx shadcn@latest add @75neo/button
```

```sh
npx shadcn-vue@latest add @75neo/button
```

## Usage

```tsx
import Button from "@/components/ui/button/Button";

<Button variant="soft" color="error" size="lg">
  Delete project
</Button>;
```

```vue
<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
</script>

<template>
  <Button variant="soft" color="error" size="lg">Delete project</Button>
</template>
```

There is no wrapper element. The component renders a `button`, so `type`, `form`, `onClick` and
every other native attribute pass straight through.

## Variants

`variant` picks how the colour is applied, and `color` picks which colour. They are independent, so
all thirty six combinations exist.

| Variant   | Treatment                                      |
| --------- | ---------------------------------------------- |
| `solid`   | Filled background, inverted text. The default  |
| `outline` | Transparent, coloured text and ring            |
| `soft`    | Tinted background at 10 percent, coloured text |
| `subtle`  | Tinted background and a ring                   |
| `ghost`   | No background until hover                      |
| `link`    | Text only, underlined on hover                 |

```tsx
<Button variant="outline" color="warning">
  Retry
</Button>
```

Use one variant per level of emphasis on a screen. A page with three solid buttons has no primary
action.

## Colours

`color` accepts `primary`, `secondary`, `success`, `info`, `warning` and `error`, and each resolves
to a `--ui-*` token rather than a fixed Tailwind colour. Retheme them in your own stylesheet as
described in [Customization](/docs/customization).

## Sizes

`size` runs `xs`, `sm`, `md`, `lg`, `xl` and moves padding, text size and the icon slot together.
The default is `md`.

## Icons

React takes icons as props, because that is how React composes:

```tsx
import { ArrowRight } from "lucide-react";

<Button trailing={<ArrowRight className="size-4" />}>Continue</Button>;
```

Vue takes them as slots:

```vue
<script setup lang="ts">
import { ArrowRight } from "@lucide/vue";
</script>

<template>
  <Button>
    Continue
    <template #trailing>
      <ArrowRight />
    </template>
  </Button>
</template>
```

Both wrap the icon in a shrink resistant span. The recipe sizes that span per button size, from
`size-4` at `xs` up to `size-6` at `xl`, so an icon that fills its box lines up without extra
classes.

## Disabled

`disabled` sets the native attribute and applies the disabled styling in the same pass, which drops
pointer events and takes opacity to 75 percent.

```tsx
<Button disabled>Saving</Button>
```

A disabled button is still in the accessibility tree but is not focusable. If the reason it is
disabled is not obvious from the surrounding text, say so next to it rather than in a tooltip the
keyboard cannot reach.

## Focus

Every variant draws a two pixel focus ring in its own colour, offset by two pixels, on
`focus-visible` only. Pointer clicks do not show it, keyboard focus does.
