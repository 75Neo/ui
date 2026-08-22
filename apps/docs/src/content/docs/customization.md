---
title: Customization
description: Four levels of override, from one element to a whole app — all merged rather than raced in the cascade.
section: Guide
order: 3
---

| Mechanism     | Reaches                      | What it can change                                        |
| ------------- | ---------------------------- | --------------------------------------------------------- |
| `class`       | one element                  | the component's root element                              |
| `ui`          | one component instance       | every slot, by name — set on the root, reaches every part |
| `ThemeConfig` | every component of that type | slots, variants, compound variants, default variants      |
| CSS           | anything                     | Ark's own `data-scope` / `data-part`, from your own sheet |

Within a single render they apply in that order, each winning over the one above it:
theme, then `ui`, then `class`.

Every level goes through
[`tailwind-merge`](https://github.com/dcastil/tailwind-merge), which is the part worth
internalising: an override **replaces** what it conflicts with instead of racing it in the
cascade. No `!important`, no `[&]:` specificity tricks, and no need to know which classes
the theme picked.

## class

```tsx
<Button className="rounded-full px-8">Save</Button>
```

The size variant contributed `rounded-md px-4`. Both are gone from the output — not
overridden at runtime by specificity, but absent from the class string entirely.

In Vue and Svelte the prop is spelled `class`. Vue components set `inheritAttrs: false`
and merge the attribute themselves, precisely so that this holds: Vue's own attribute
merging would keep both `px-4` and your `px-8` and leave source order to decide.

## ui

A component made of several elements exposes each of them as a named slot. `ui` reaches
all of them at once, so restyling triggers, icons and bodies is one prop rather than one
prop per part.

```tsx
<Accordion
  items={items}
  ui={{
    root: "rounded-none border-x-0",
    trigger: "font-semibold uppercase tracking-wide",
    trailingIcon: "text-intent-fg",
    body: "text-fg",
  }}
/>
```

An item may carry its own `ui`, which is merged over the accordion's for that row alone.

The keys are typed against the component's real slot names — the **Theme** section of each
component page lists them.

Single-element components take `ui` too, with one slot called `base`. It does the same
thing as `class` there; it exists so every component in the library has the same surface.

## ThemeConfig

The same overrides, applied to every instance in the app. Anything a `ui` prop can say, a
`ThemeConfig` can say for every component of that type at once — including which variant
is the default.

```tsx
import { NeoUIProvider, type ThemeConfig } from "@75neo/react";

// Define it outside the render. Resolved themes are memoised on this object's identity,
// so a fresh object each render rebuilds every theme it touches.
const theme: ThemeConfig = {
  button: {
    slots: { base: "rounded-full" },
    defaultVariants: { colorPalette: "neutral" },
  },
  accordion: {
    slots: { trigger: "font-semibold" },
    defaultVariants: { variant: "plain" },
  },
};

<NeoUIProvider theme={theme}>
  <App />
</NeoUIProvider>;
```

Vue installs the same config as a plugin:

```ts
// main.ts
import { createNeoUI } from "@75neo/vue";

app.use(createNeoUI({ theme }));
```

Vue also exports a `<NeoUIProvider>` for theming one subtree differently. Svelte has the
provider only:

```svelte
<script lang="ts">
  import { NeoUIProvider } from "@75neo/svelte";
</script>

<NeoUIProvider {theme}>
  {@render children()}
</NeoUIProvider>
```

A provider is optional. Components work without one; it exists only to change their
defaults.

### Overriding a variant, or adding one

`slots` is the blanket form. To change one variant, or to introduce a value the built-in
theme has never heard of, use `variants`:

```ts
const theme: ThemeConfig = {
  button: {
    variants: {
      variant: {
        // Redefine one the library ships…
        ghost: { base: "text-fg-muted hover:bg-surface-subtle" },
        // …or add a shape it has never heard of.
        dashed: { base: "border-dashed border-intent-line text-intent-label" },
      },
    },
  },
};
```

`slots` and `defaultVariants` are typed against the component's real names.
`variants` and `compoundVariants` are typed loosely on purpose — pinning them to the
built-in unions would make the second case above impossible.

### Ordering

For a given component the pieces resolve in this order, each beating the last:

1. the built-in `slots`
2. the built-in `variants`, then `compoundVariants`
3. your override's `slots`
4. your override's `variants` and `compoundVariants`
5. the `ui` prop
6. the `class` prop

Step 3 is worth a note. `tailwind-variants` would normally place an override's `slots`
_before_ the built-in variants, which would make `{ slots: { base: "rounded-full" } }` lose
to the `size` variant's `rounded-md` — the opposite of what "override" ought to mean. The
registry carries it as an unconditional compound variant instead, so it lands last and
behaves the way the `ui` prop already did.

## Plain CSS

Every multi-part component is built on Ark UI, which labels each element with
`data-scope` and `data-part`. Those attributes are a stable styling surface in their own
right, and they are Ark's own — so what you learn here transfers to Ark's documentation
rather than to this library's.

```css
[data-scope="accordion"][data-part="item-trigger"] {
  font-variant-numeric: tabular-nums;
}
```

Useful when the change is not really about one component — print styles, a `:has()` rule,
anything the class-based levels above cannot express.
