# Writing a data module

Reference for component work in `packages/`. The root [`AGENTS.md`](../AGENTS.md) carries
the one layer, part-name identity and the steps for adding a component.

## Data modules describe themselves

A data module exports literal types, defaults, a schema object shaped
`{ values, defaultValue }` per axis, and a `parts` descriptor shaped
`{ export, file, contract }` per part — and everything built on the component reads
them rather than restating them:

- a preview maps `buttonSchema.variant.values` into its matrix, so a new value shows
  up with no change to the preview;
- the docs reader resolves every descriptor entry through ts-morph, so a renamed
  export fails the docs build rather than quietly dropping a table.

## One `cva` per part, wrapped in `cn`

The `cva` calls live in the adapter files, never in `themes`. Three rules hold at
every call site:

- **Wrap it.** `cva` concatenates and never merges, so `cn(partCva(…), className)`
  is required rather than habitual.
- **Default every boolean a compound row keys on.** `cva` strips `undefined` before
  matching, so an omitted boolean never equals `false` and the row silently misses.
  The defaults object carries `false` for each one; passing `undefined` through is
  the design, not luck.
- **Annotate extracted compound data.** Rows lifted out of the call lose `cva`'s
  contextual typing and widen to `string`, so each compound list gets its own
  explicit interface (and `createCn` gets an explicit `: CnFunction`, or the `dts`
  build fails portability).

## The variant context beside the root

A multi-part component reads the root's axes through a context of its own — React
context, Vue provide/inject — while Ark's state stays Ark's. Four rules:

- The value is the root's multi-part axes, whatever they are (`{ size, color }` on
  Select, `{ variant, size }` on Accordion, which has no color). Single-part
  components take their own props and create no context.
- A missing provider means the defaults, never an error, so parts render standalone.
- The root mirrors each axis as a `data-*` attribute for CSS and controls to hook.
- In Vue the provided object stays live (getters over the props); parts read it
  inside `computed`.

## Motion is minimal

Color and opacity transitions stay. Enter, exit and slide motion never ships: the
collapsible height keyframes are gone and Accordion and Collapsible snap. A chevron
rotating to mark open state is indication, not motion, and stays.

## The layout family

`LocaleProvider`, `Container`, `Main`, `Header`, `Footer`, `Error` and `Sidebar` are the
page's own furniture and follow Nuxt UI's set. Three rules hold across them.

**The measure and the height are each one token.** `--ui-container` reaches parts as
`max-w-page`, and the Header and the Footer restate the Container's measure and gutters
rather than rendering one: composing it would put `data-slot="container"` on the row
instead of on a part the caller composed. `--ui-header-height` reaches parts as
`h-header`, and the Main and the Error subtract it from the viewport, so a taller bar
moves them with it.

**`LocaleProvider` owns the locale and the `dir` attribute** every `rtl:` utility in the
library reads. Ark derives its own locale internally; the `dir` attribute is what
Tailwind sees, so the provider writes it, derived from `locale` unless passed.

**The Sidebar and the Header keep one DOM tree across both viewports.** The Sidebar's
narrow panel is the wide column moved, and the Header's menu is Ark UI's Dialog styled
alongside the bar. Styling the menu from anywhere but the header's own files would put
half of its appearance where a caller theming a header would never look.

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

A strength used in a part but missing there produces no CSS and no error, so the
component renders unstyled. A variant prefix behaves the same way:
`data-active:text-${color}` needs `data-active:` in that line's brace list before it
generates anything. `pnpm dev:play` is the check, rather than `pnpm build`.

Each `@source inline(...)` stays on one line. `oxfmt` rejects the wrapped form with
"`@source` paths must be quoted" and reports it against every Vue file rather than against
the CSS, so the error never names its own cause. The lines are long; leave them long.
