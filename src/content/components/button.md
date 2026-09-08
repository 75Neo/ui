---
title: Button
description: Six variants, six semantic colours and five sizes over a native button element.
category: Actions
registryItem: button
---

## Usage

```tsx
import Button from "@/components/ui/button/Button";
```

```vue
<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
</script>
```

There is no wrapper element. The component renders a `button`, so `type`, `form`, `onClick` and
every other native attribute pass straight through.

## Choosing a variant

`variant` picks how the colour is applied and `color` picks which colour, so the two are
independent and all thirty six combinations exist.

| Variant   | Treatment                             |
| --------- | ------------------------------------- |
| `solid`   | Filled background, contrasting text   |
| `outline` | Transparent, coloured text and ring   |
| `soft`    | Tinted background, coloured text      |
| `subtle`  | Tinted background and a matching ring |
| `ghost`   | No background until hover             |
| `link`    | Text only, underlined on hover        |

Use one variant per level of emphasis on a screen. A page with three solid buttons has no primary
action.

## Colours

Each colour resolves to a set of `--ui-*` tokens rather than a fixed Tailwind hue, so retheming
the library retints every button at once. `primary` is the near black brand colour and `secondary`
is a light neutral surface, which is why the two read as a pair rather than as two hues. See
[Customization](/docs/customization) for the token names.

Hover moves to a real colour step rather than fading the fill, so a solid button stays opaque
against whatever sits behind it.

## Icons

React takes icons as props and Vue takes them as slots, in both cases wrapped in a shrink
resistant span. The recipe sizes that span per button size, from `size-3.5` at `xs` up to `size-6`
at `xl`, so an icon that fills its box lines up without extra classes.

## Disabled and loading

`disabled` sets the native attribute and applies the disabled styling in the same pass, dropping
pointer events and taking opacity to 60 percent. `loading` does the same and swaps the leading
slot for a spinner, and it sets `aria-busy` so assistive technology announces the wait.

A disabled button is still in the accessibility tree but is not focusable. If the reason it is
disabled is not obvious from the surrounding text, say so next to it rather than in a tooltip the
keyboard cannot reach.

## Focus

Every variant draws the same two pixel focus ring, in the dedicated focus colour rather than the
button's own, offset by two pixels and only on `focus-visible`. Pointer clicks do not show it,
keyboard focus does. One focus colour across the library is deliberate: a per colour ring reads
muddy on warning and success, and a near black ring is invisible against dark text.
