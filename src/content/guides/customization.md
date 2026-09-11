---
title: Customization
description: Retheme the library through the token layer, or edit the recipe a component installs.
order: 3
---

## Two layers

The **token layer** is the set of `--ui-*` custom properties `75neoui init` writes into your
stylesheet. Change them and every component follows. Reach for this first.

The **recipe layer** is the tailwind-variants file each component imports. Change it when you want
a different shape rather than a different palette.

## The tokens

### Colors

Seven colors, each a single token, so a recipe fills, tints, hovers and outlines with opacity
steps over that token instead of a hand built ramp.

| Color            | Utility it drives | Light       | Dark        | Notes                                        |
| ---------------- | ----------------- | ----------- | ----------- | -------------------------------------------- |
| `--ui-primary`   | `bg-primary`      | `stone-900` | `stone-50`  | The brand is near black, not a hue           |
| `--ui-secondary` | `bg-secondary`    | `stone-200` | `stone-800` | A light surface with dark text, role flipped |
| `--ui-success`   | `bg-success`      | `green-500` | `green-500` |                                              |
| `--ui-info`      | `bg-info`         | `blue-500`  | `blue-500`  |                                              |
| `--ui-warning`   | `bg-warning`      | `amber-500` | `amber-500` |                                              |
| `--ui-error`     | `bg-error`        | `red-500`   | `red-500`   |                                              |
| `--ui-neutral`   | `bg-neutral`      | `stone-500` | `stone-400` | Picks neutral surfaces, not a hue            |

States derive from the token. Solid hovers with `hover:bg-primary/75`, soft surfaces tint with
`bg-primary/10`, outlines ring with `ring-primary/50`, and the focus ring takes the same color
with `outline-primary/25`. Only components with a `color` prop use these; everything else draws
on the neutrals below.

`secondary` is the odd one out on purpose. Its fill is light and its foreground is dark, so its
recipes read dark text (`text-default`) where the hues read inverted text. `neutral` skips hues
entirely and draws on the neutral system (`bg-inverted`, `bg-elevated`, `ring-accented`).

### Neutrals

| Token                   | Utility it drives                     | Light       | Dark        |
| ----------------------- | ------------------------------------- | ----------- | ----------- |
| `--ui-text`             | `text-default`                        | `stone-900` | `stone-50`  |
| `--ui-text-muted`       | `text-muted`                          | `stone-600` | `stone-400` |
| `--ui-text-toned`       | `text-toned`                          | `stone-700` | `stone-300` |
| `--ui-text-dimmed`      | `text-dimmed`                         | `stone-400` | `stone-500` |
| `--ui-text-highlighted` | `text-highlighted`                    | `stone-950` | `white`     |
| `--ui-text-inverted`    | `text-inverted`                       | `stone-50`  | `stone-900` |
| `--ui-bg`               | `bg-default`                          | `white`     | `stone-950` |
| `--ui-bg-elevated`      | `bg-elevated`                         | `white`     | `stone-900` |
| `--ui-bg-muted`         | `bg-muted`                            | `stone-100` | `stone-800` |
| `--ui-bg-accented`      | `bg-accented`                         | `stone-200` | `stone-700` |
| `--ui-bg-inverted`      | `bg-inverted`                         | `stone-900` | `stone-50`  |
| `--ui-border`           | `border-default` and `ring-default`   | `stone-200` | `stone-800` |
| `--ui-border-muted`     | `border-muted` and `ring-muted`       | `stone-100` | `stone-700` |
| `--ui-border-accented`  | `border-accented` and `ring-accented` | `stone-300` | `stone-700` |
| `--ui-border-inverted`  | `border-inverted` and `ring-inverted` | `stone-900` | `white`     |

Dialogs, menus, popovers and toasts sit on `bg-elevated`. In light mode it matches the page and
separates by ring and shadow; in dark mode it lifts one step off the page.

### Focus

There is no focus token. The focus ring takes the color of the component carrying focus:
`outline-primary/25` on a primary button, `outline-inverted/25` on neutral surfaces. Set it per
recipe with the same token the recipe already uses.

### Elevation

| Token            | Utility     |
| ---------------- | ----------- |
| `--ui-shadow-xs` | `shadow-xs` |
| `--ui-shadow-sm` | `shadow-sm` |
| `--ui-shadow-md` | `shadow-md` |
| `--ui-shadow-lg` | `shadow-lg` |

Raised interactive surfaces use `shadow-xs`, cards `shadow-sm`, floating surfaces `shadow-lg`.

### Shape and layout

| Token            | Default   | What it drives                                                                  |
| ---------------- | --------- | ------------------------------------------------------------------------------- |
| `--ui-radius`    | `0.25rem` | The whole `rounded-*` scale, from `xs` at half the value to `4xl` at four times |
| `--ui-container` | `50rem`   | The maximum width of the container component                                    |

## Retheme

Override the tokens after the block `init` wrote. The palettes are separate, so set the ones you
want in each.

```css
@import "tailwindcss";
/* 75NeoUI theme */

:root {
  --ui-primary: var(--color-violet-600);
  --ui-radius: 0.5rem;
  --ui-container: 64rem;
}

.dark {
  --ui-primary: var(--color-violet-500);
}
```

One token per color is the whole retheme. States follow automatically, because they are opacity
steps over the token rather than separate variables. Any colour works, not only Tailwind's:

```css
:root {
  --ui-primary: oklch(0.55 0.2 265);
}
```

## Override one instance

Every component merges a class prop through [cn](https://www.npmjs.com/package/cn), so your classes
win over the recipe's without `!important`.

```tsx
<Button className="w-full rounded-full">Sign in</Button>
```

```vue
<Button class="w-full rounded-full">Sign in</Button>
```

Use this for layout concerns like width, margin and grid placement. A repeated override belongs in
the recipe instead.

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
    variant: {
      solid: "",
      soft: "",
      // ...
    },
    color: {
      primary: "",
      secondary: "",
      // ...
    },
  },
  compoundVariants: [
    {
      color: "primary",
      variant: "solid",
      class:
        "bg-primary text-inverted hover:bg-primary/75 outline-primary/25 focus-visible:outline-3",
    },
    // ...
  ],
});
```

The `color` axis carries one entry per color and the real classes live in `compoundVariants`,
one entry per color and variant pair. States are opacity steps (`/75` on hover, `/10` and `/15`
for tints, `/25` and `/50` for rings), so adding a variant means writing Tailwind classes, not
new tokens. A compound component only needs the colour on the slot that shows it, for example a
checkbox sets `data-[state=checked]:bg-primary` on its control and nothing elsewhere.

To add a variant, add a key under `variants`, then add the matching entry to the adapter's prop
type.

## Dark mode

The theme declares `light` and `dark` as custom variants scoped to a class:

```css
@custom-variant light (&:where(.light, .light *));
@custom-variant dark (&:where(.dark, .dark *));
```

Anything under an element carrying `dark` uses the dark palette, so a dark panel can sit inside a
light page. The recipes rarely use the `dark:` variant directly, because the tokens already carry
both palettes.
