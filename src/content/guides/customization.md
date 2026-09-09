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

### Intents

Six semantic intents, each carrying a ramp rather than a single colour, so a recipe can fill, tint,
hover and outline in one intent without opacity maths.

| Suffix     | Role                                                      | Utility                |
| ---------- | --------------------------------------------------------- | ---------------------- |
| none       | The solid fill                                            | `bg-primary`           |
| `-hover`   | The solid fill on hover, a real step rather than a fade   | `bg-primary-hover`     |
| `-fg`      | Text on the solid fill                                    | `text-primary-fg`      |
| `-soft`    | The tinted surface for soft and subtle treatments         | `bg-primary-soft`      |
| `-soft-fg` | Text on the tint, and the colour for outline, ghost, link | `text-primary-soft-fg` |
| `-border`  | The ring for outline and subtle                           | `ring-primary-border`  |

| Intent      | Light fill  | Dark fill   | Notes                                        |
| ----------- | ----------- | ----------- | -------------------------------------------- |
| `primary`   | `stone-900` | `stone-50`  | The brand is near black, not a hue           |
| `secondary` | `stone-200` | `stone-800` | A light surface with dark text, role flipped |
| `success`   | `green-500` | `green-500` |                                              |
| `info`      | `blue-500`  | `blue-500`  |                                              |
| `warning`   | `amber-500` | `amber-500` | Dark foreground, because amber needs one     |
| `error`     | `red-500`   | `red-500`   |                                              |

`secondary` is the odd one out on purpose. Its fill is light and its foreground is dark, which is
what makes it read as the quiet twin of the primary rather than as another hue.

### Neutrals

| Token                  | Utility it drives                     | Light       | Dark        |
| ---------------------- | ------------------------------------- | ----------- | ----------- |
| `--ui-text`            | `text-default`                        | `stone-900` | `stone-50`  |
| `--ui-text-muted`      | `text-muted`                          | `stone-600` | `stone-400` |
| `--ui-text-dimmed`     | `text-dimmed`                         | `stone-400` | `stone-500` |
| `--ui-text-inverted`   | `text-inverted`                       | `stone-50`  | `stone-900` |
| `--ui-bg`              | `bg-default`                          | `white`     | `stone-950` |
| `--ui-bg-elevated`     | `bg-elevated`                         | `white`     | `stone-900` |
| `--ui-bg-muted`        | `bg-muted`                            | `stone-100` | `stone-800` |
| `--ui-bg-accented`     | `bg-accented`                         | `stone-200` | `stone-700` |
| `--ui-bg-inverted`     | `bg-inverted`                         | `stone-900` | `stone-50`  |
| `--ui-border`          | `border-default` and `ring-default`   | `stone-200` | `stone-800` |
| `--ui-border-accented` | `border-accented` and `ring-accented` | `stone-300` | `stone-700` |

Dialogs, menus, popovers and toasts sit on `bg-elevated`. In light mode it matches the page and
separates by ring and shadow; in dark mode it lifts one step off the page.

### Focus

`--ui-focus` is `blue-500` in both modes and drives `outline-focus`. It is not the primary colour,
because a near black ring is invisible against dark text and a per intent ring reads muddy.

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
  --ui-primary-hover: var(--color-violet-700);
  --ui-primary-fg: var(--color-white);
  --ui-primary-soft: var(--color-violet-50);
  --ui-primary-soft-fg: var(--color-violet-700);
  --ui-primary-border: var(--color-violet-200);

  --ui-radius: 0.5rem;
  --ui-container: 64rem;
}

.dark {
  --ui-primary: var(--color-violet-500);
  --ui-primary-hover: var(--color-violet-400);
  --ui-primary-soft: var(--color-violet-950);
  --ui-primary-soft-fg: var(--color-violet-300);
  --ui-primary-border: var(--color-violet-900);
}
```

Set every step of an intent you retheme, not just the fill, or the tinted and hovered states will
still point at the old colour. Any colour works, not only Tailwind's:

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
      solid: "bg-(--intent) text-(--intent-fg) shadow-xs hover:bg-(--intent-hover)",
    },
    color: intent,
    size: {
      md: { base: "gap-1.5 px-3 py-2 text-sm" },
    },
  },
});
```

The `color` axis comes from a shared file installed alongside any coloured component. Each entry
binds one intent's tokens onto local custom properties, so a variant says `bg-(--intent)` once
instead of once per colour. Custom properties inherit, so a compound component only needs the
colour on its root.

```ts
export const intent = {
  primary: "[--intent:var(--ui-primary)] [--intent-hover:var(--ui-primary-hover)] ...",
};
```

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
