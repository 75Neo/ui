---
title: Customization
description: Retheme the library through the token layer, or edit the recipe a component installs.
order: 3
---

## Two layers

There are two places to change how a component looks, and picking the right one keeps upgrades
cheap.

The **token layer** is a set of `--ui-*` custom properties in the theme stylesheet. Change them and
every component follows, because Tailwind's own tokens are derived from them. This is the layer to
reach for first.

The **recipe layer** is the tailwind-variants file each component imports. Change it when you want
a different shape rather than a different palette, for example a taller button or an extra variant.

## The tokens

Semantic colours, each mapped to a Tailwind colour by default:

| Token            | Light        | Dark         |
| ---------------- | ------------ | ------------ |
| `--ui-primary`   | `blue-600`   | `blue-400`   |
| `--ui-secondary` | `teal-700`   | `teal-400`   |
| `--ui-success`   | `green-700`  | `green-400`  |
| `--ui-info`      | `sky-700`    | `sky-400`    |
| `--ui-warning`   | `yellow-500` | `yellow-400` |
| `--ui-error`     | `red-600`    | `red-400`    |

Text, surface and border:

| Token                | Utility it drives                   |
| -------------------- | ----------------------------------- |
| `--ui-text`          | `text-default`                      |
| `--ui-text-muted`    | `text-muted`                        |
| `--ui-text-dimmed`   | `text-dimmed`                       |
| `--ui-text-inverted` | `text-inverted`                     |
| `--ui-bg`            | `bg-default`                        |
| `--ui-bg-muted`      | `bg-muted`                          |
| `--ui-bg-accented`   | `bg-accented`                       |
| `--ui-bg-inverted`   | `bg-inverted`                       |
| `--ui-border`        | `border-default` and `ring-default` |

Shape and layout:

| Token            | Default   | What it drives                                                                  |
| ---------------- | --------- | ------------------------------------------------------------------------------- |
| `--ui-radius`    | `0.15rem` | The whole `rounded-*` scale, from `xs` at half the value to `4xl` at four times |
| `--ui-container` | `50rem`   | The maximum width of the container component                                    |

## Retheme

Override the tokens in your own stylesheet, after the theme import. Both palettes are separate, so
set the ones you want in each.

```css
@import "tailwindcss";
@import "./75neo-theme.css";

:root {
  --ui-primary: var(--color-violet-600);
  --ui-radius: 0.5rem;
  --ui-container: 64rem;
}

.dark {
  --ui-primary: var(--color-violet-400);
}
```

Because the radius scale is computed from a single value, one line moves every corner in the
library. Set `--ui-radius` to `0` for square corners and to `0.5rem` for soft ones.

Any colour works, not only Tailwind's:

```css
:root {
  --ui-primary: oklch(0.55 0.2 265);
}
```

## Override one instance

Every component takes a class prop and merges it through [cn](https://www.npmjs.com/package/cn),
so your classes win over the recipe's without `!important`.

```tsx
<Button className="w-full rounded-full">Sign in</Button>
```

```vue
<Button class="w-full rounded-full">Sign in</Button>
```

Use this for layout concerns like width, margin and grid placement. If you find yourself repeating
the same override, it belongs in the recipe instead.

## Edit the recipe

The recipe is a plain [tailwind-variants](https://www.tailwind-variants.org) call. Multi part
components use `slots`, one entry per element the component renders.

```ts
export const button = tv({
  slots: {
    base: "inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-colors",
    leading: "shrink-0",
    trailing: "shrink-0",
  },
  variants: {
    size: {
      md: { base: "gap-1.5 px-2.5 py-1.5 text-sm" },
    },
  },
});
```

To add a variant, add a key under `variants`, then add the matching entry to the adapter's prop
type. The API reference on each component page shows the props that exist today, so you can see
exactly what a new key has to line up with.

## Dark mode

The theme file declares `light` and `dark` as custom variants scoped to a class:

```css
@custom-variant light (&:where(.light, .light *));
@custom-variant dark (&:where(.dark, .dark *));
```

Anything under an element carrying `dark` uses the dark palette, which means you can run a dark
panel inside a light page by putting the class on that panel alone. The recipes rarely use the
`dark:` variant directly, because the tokens already carry both palettes.
