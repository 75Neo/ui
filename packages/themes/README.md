# @75neo/themes

Tailwind CSS v4 design tokens and `tailwind-variants` component recipes for 75NeoUI.

```css
@import "tailwindcss";
@import "@75neo/themes";
```

That single import ships the tokens, the `dark` variant, and the base layer. Dark
mode is a `.dark` class on a root element; nothing else needs wiring.

## Surfaces, text and borders

| Utility                                                                                   | Token                      |
| ----------------------------------------------------------------------------------------- | -------------------------- |
| `bg-default` `bg-muted` `bg-elevated` `bg-accented` `bg-inverted`                         | `--ui-bg*`                 |
| `text-default` `text-dimmed` `text-muted` `text-toned` `text-highlighted` `text-inverted` | `--ui-text*`               |
| `border-default` `border-muted` `border-accented` `border-inverted`                       | `--ui-border*`             |
| `divide-default` `divide-muted` `divide-accented`                                         | `--ui-border*`             |
| `ring-default` `outline-default`                                                          | `--ui-ring`                |
| `rounded-xs` … `rounded-xl`                                                               | derived from `--ui-radius` |

## Colors

Seven semantic colors — `primary` `secondary` `neutral` `success` `info`
`warning` `error` — each exposing six roles:

| Utility                   | Role                                               |
| ------------------------- | -------------------------------------------------- |
| `bg-primary`              | solid fill                                         |
| `bg-primary-elevated`     | solid fill, hover/active                           |
| `text-primary-foreground` | text and icons on the solid fill                   |
| `bg-primary-muted`        | soft/tinted fill                                   |
| `bg-primary-accented`     | soft fill, hover/active                            |
| `text-primary-emphasis`   | the color as text or border on the page background |

Because every role carries its own light and dark value, component recipes need
no `dark:` classes — the tokens flip, not the classes. Every fill/foreground
pairing clears WCAG AA (4.5:1) in both themes.

Ramps are available as an escape hatch: `bg-primary-50` … `bg-error-950`.
`neutral` has no ramp, so Tailwind's built-in `neutral-*` palette is untouched.

## Overriding

Values are plain custom properties. Redefine any of them after the import:

```css
:root {
  --ui-radius: 0.75rem;
  --ui-primary: var(--color-teal-600);
  --ui-primary-emphasis: var(--color-teal-700);
}
```
