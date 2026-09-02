# @75neo/themes

Tailwind CSS v4 design tokens and `tailwind-variants` recipes for 75NeoUI. This is the
styling layer behind `@75neo/react` and `@75neo/vue`: every component's classes live here,
and the adapters carry none.

```css
@import "tailwindcss";
@import "@75neo/themes";
```

That one import ships the tokens, the `dark` variant and the base layer. Dark mode is a
`.dark` class on a root element, and nothing else needs wiring.

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

Seven semantic colors — `primary` `secondary` `neutral` `success` `info` `warning` `error`
— each exposing six roles:

| Utility                   | Role                                               |
| ------------------------- | -------------------------------------------------- |
| `bg-primary`              | solid fill                                         |
| `bg-primary-elevated`     | solid fill, hover and active                       |
| `text-primary-foreground` | text and icons on the solid fill                   |
| `bg-primary-muted`        | soft, tinted fill                                  |
| `bg-primary-accented`     | soft fill, hover and active                        |
| `text-primary-emphasis`   | the color as text or border on the page background |

Every role carries its own light and dark value, so recipes need no `dark:` classes: the
tokens flip, not the classes. Every fill and foreground pairing clears WCAG AA (4.5:1) in
both themes.

Ramps are the escape hatch: `bg-primary-50` … `bg-error-950`. `neutral` has no ramp, which
leaves Tailwind's built-in `neutral-*` palette untouched.

## Recipes

One module per component in `src/components/`, and the only place styling lives. Each
exports the `tv()` recipe, its slot and variant types, the `ui` prop type, and the registry
augmentation that makes the component themeable.

Import a recipe directly to read its runtime metadata:

```ts
import { button, variantValues } from "@75neo/themes";

variantValues(button, "color"); // ["primary", "secondary", "neutral", ...]
Object.keys(button.slots); // ["base", "leading", "trailing", "label"]
```

## Overriding

Every value is a plain custom property. Redefine any of them after the import:

```css
:root {
  --ui-radius: 0.75rem;
  --ui-primary: var(--color-teal-600);
  --ui-primary-emphasis: var(--color-teal-700);
}
```

`src/tokens/colors.css` holds every property. For overrides scoped to a subtree or to one
call site, use the `Theme` component or a component's `ui` prop, described in the
[root README](../../README.md#theming).
