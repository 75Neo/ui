# Writing a recipe

Reference for component work in `packages/`. The root [`AGENTS.md`](../AGENTS.md) carries
the cascade, slot-name identity and the steps for adding a component.

## Recipes describe themselves

A `tv()` result exposes `variants`, `slots`, `variantKeys` and `defaultVariants` at
runtime, and everything built on a recipe reads them rather than restating them:

- `resolveTheme` reads `variantKeys`, so a new variant resolves with no change to the
  resolver or to any component;
- `variantValues(recipe, "color")` returns the declared values as a literal-typed array,
  which is how the playground previews build their matrix.

## The layout family

`App`, `Container`, `Main`, `Header`, `Footer`, `Error` and `Sidebar` are the page's own
furniture and follow Nuxt UI's set. Three rules hold across them.

**The measure and the height are each one token.** `--ui-container` reaches recipes as
`max-w-page`, and the Header and the Footer restate the Container's measure and gutters
rather than rendering one: composing it would put `data-slot="base"` on the row instead of
`data-slot="container"`. `--ui-header-height` reaches recipes as `h-header`, and the Main
and the Error subtract it from the viewport, so a taller bar moves them with it.

**`App` is not `Theme`, and both exist.** `Theme` restyles a subtree and nests. `App` is
the one at the top and adds the locale and the `dir` attribute every `rtl:` utility in the
library reads. It resolves its own classes against the theme it publishes rather than the
one above it, alone among components.

**The Sidebar and the Header keep one DOM tree across both viewports.** The Sidebar's
narrow panel is the wide column moved, and the Header's menu is Ark UI's Dialog styled
entirely from the `header` key. Composing this library's Dialog would put half of their
appearance behind a key a caller theming a header would never look in.

## Ark spells disabled two ways

Which one is per component, so read the part's props rather than inferring from the tag.
The Accordion trigger and the Carousel arrows carry the real `disabled` attribute, so
style them with `disabled:`. The Collapsible trigger is a native `button` too and still
carries only `data-disabled`, because Ark guards its click handler itself; anything Ark
renders as a `div` carries `data-disabled` as well.

The wrong choice renders a disabled control that looks enabled, with no error. Check it in
`pnpm dev:play`.

## Interpolated classes need a safelist entry

`byColor` and `eachColor` build classes like `` `bg-${color}/10` ``, which Tailwind's
scanner never meets as a literal. `src/tokens/utilities.css` in `@75neo/themes` lists
every one with `@source inline(...)`.

A strength used in a recipe but missing there produces no CSS and no error, so the
component renders unstyled. A variant prefix behaves the same way:
`data-active:text-${color}` needs `data-active:` in that line's brace list before it
generates anything. `pnpm dev:play` is the check, rather than `pnpm build`.

Each `@source inline(...)` stays on one line. `oxfmt` rejects the wrapped form with
"`@source` paths must be quoted" and reports it against every Vue file rather than against
the CSS, so the error never names its own cause. The lines are long; leave them long.

## Merge helpers copy, never alias

`layerTheme` copies nested objects rather than assigning references, so a `ThemeConfig`
stays safe to reuse and to serialize. Tested both ways.
