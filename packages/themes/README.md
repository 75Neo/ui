# @75neo/themes

Tailwind CSS v4 design tokens and `tailwind-variants` recipes for 75NeoUI. This is the
styling layer behind `@75neo/react` and `@75neo/vue`: every component's classes live here,
and the adapters carry none.

```css
@import "tailwindcss";
@import "@75neo/themes";
```

That one import ships the tokens, the `light` and `dark` variants and the base layer. Dark
mode is a `.dark` class on a root element, and nothing else needs wiring.

## One token per color

Seven semantic colors — `primary` `secondary` `success` `info` `warning` `error` `neutral`
— and each of the first six is a single custom property. There is no `-muted`, no
`-emphasis`, no `-foreground`. A recipe spends the one token at different strengths with
Tailwind's opacity modifier:

```
solid    bg-primary text-inverted hover:bg-primary/75
soft     bg-primary/10 text-primary hover:bg-primary/15
subtle   bg-primary/10 text-primary ring ring-primary/25
outline  text-primary ring ring-primary/50 hover:bg-primary/10
ghost    text-primary hover:bg-primary/10
link     text-primary hover:text-primary/75
```

Six strengths cover the whole library, and they mean the same thing wherever they appear:

| Strength | Role                                                  |
| -------- | ----------------------------------------------------- |
| `/10`    | a soft, tinted fill                                   |
| `/15`    | that fill, hovered or pressed                         |
| `/25`    | a hairline ring, and the focus halo                   |
| `/50`    | a visible ring that still reads as a border           |
| `/75`    | a solid fill or solid text, hovered or pressed        |
| full     | a solid fill, text on the page, or a ring under focus |

Each light value is the shade where the color first clears WCAG AA (4.5:1) as text on
`--ui-bg`. That single threshold is what lets one value serve both roles: dark enough to
read as type, and dark enough to carry `text-inverted` when it is a solid fill. Dark mode
picks the 400 shade for the mirrored reason.

`neutral` is the exception. It has no hue to spend, so it borrows the surface tokens
instead — `bg-inverted`, `bg-elevated`, `ring-accented`. Every recipe with a `color`
variant therefore generates six entries and writes the seventh by hand.

Ramps stay available as an escape hatch: `bg-primary-50` … `bg-error-950`. `neutral-*`
resolves to the library's own gray rather than Tailwind's, which is the one palette name
this package takes over.

## Surfaces, text and borders

| Utility                                                                                   | Token                      |
| ----------------------------------------------------------------------------------------- | -------------------------- |
| `bg-default` `bg-muted` `bg-elevated` `bg-accented` `bg-inverted`                         | `--ui-bg*`                 |
| `text-default` `text-dimmed` `text-muted` `text-toned` `text-highlighted` `text-inverted` | `--ui-text*`               |
| `border-default` `border-muted` `border-accented` `border-inverted`                       | `--ui-border*`             |
| `ring-*` `divide-*` `outline-*` `stroke-*` `fill-*`                                       | the same border tokens     |
| `rounded-xs` … `rounded-3xl`                                                              | derived from `--ui-radius` |
| `max-w-page`                                                                              | `--ui-container`           |

Every role carries its own light and dark value, so recipes need no `dark:` classes: the
tokens flip, not the classes.

## Recipes

One module per component in `src/components/`, and the only place styling lives. Each
exports the `tv()` recipe, its slot and variant types, the `ui` prop type, and the registry
augmentation that makes the component themeable.

The color half of a recipe is generated rather than written out. `src/colors.ts` holds the
two helpers that do it:

```ts
import { byColor, eachColor } from "@75neo/themes";

// One variant entry per hued color.
color: {
  ...byColor((color) => ({ range: `stroke-${color}` })),
  neutral: { range: "stroke-inverted" },
}

// One compound-variant row per hued color.
compoundVariants: [
  ...eachColor((color) => ({
    color,
    variant: "solid" as const,
    class: `bg-${color} text-inverted hover:bg-${color}/75`,
  })),
  { color: "neutral", variant: "solid", class: "bg-inverted text-inverted" },
];
```

Button's six variants across seven colors is a forty-two cell table, and it costs six
calls plus six hand-written `neutral` rows.

The catch is that those classes are built by interpolation, so Tailwind's scanner never
meets them as literals. `src/tokens/utilities.css` safelists exactly the set above with
`@source inline(...)`. **A strength used in a recipe but missing there renders as no style
at all**, which is the check that keeps the vocabulary closed.

Import a recipe directly to read its runtime metadata:

```ts
import { button, variantValues } from "@75neo/themes";

variantValues(button, "color"); // ["primary", "secondary", "success", ...]
Object.keys(button.slots); // ["base", "label", "leadingIcon", "trailingIcon"]
```

## Overriding

Every value is a plain custom property. Redefine any of them after the import:

```css
:root {
  --ui-radius: 0.5rem;
  --ui-primary: var(--color-teal-700);
}

.dark {
  --ui-primary: var(--color-teal-400);
}
```

Two lines rebrand the library, and no role has to be retuned to match — that is the point
of collapsing the roles into one token.

`src/tokens/` holds every property, split by what it answers: `palette.css` is the raw
ramps and the only file that names a Tailwind palette, `semantic.css` is what those ramps
mean, `utilities.css` turns them into utilities. For overrides scoped to a subtree or to
one call site, use the `Theme` component or a component's `ui` prop, described in the
[root README](../../README.md#theming).
