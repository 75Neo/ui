# The Vue adapter

What differs from React. The root [`AGENTS.md`](../../AGENTS.md) carries the one layer
and the steps for adding a component, and [`packages/AGENTS.md`](../AGENTS.md) the data
conventions both adapters share.

## Vue casts an absent boolean to `false`

This is the trap to know. A type-based `defineProps` declares a Boolean prop, and Vue
gives an absent one the value `false` rather than leaving it undefined. Three shapes fall
into it, each one silent, and each one fine in React.

**A boolean `defineModel` needs `{ default: undefined }`.** `defineModel` declares a
Boolean prop, so a `v-model` over a boolean reaches Ark as an explicit `false` rather than
as nothing. That pins the component to a controlled `false` and kills the matching
`default*` prop. The type argument has to include `undefined` too, or the option does not
typecheck. Ark's own roots carry the same `void 0` defaults for the same reason.

**A boolean prop defaulting to `true` needs `withDefaults`.** Leaving it out reaches the
component as `false`, so `props.flag ?? true` never fires. Name the default in
`withDefaults`. Booleans that default to off need nothing, since off is what the cast
produces.

**A boolean whose default is computed from something else needs `withDefaults` with the
value `undefined`.** Vue skips the cast whenever a default is declared at all, whatever it
is: Button's `square` defaults to whether the button has a label, so it is declared
`undefined` and the `??` fallback survives. Without the declaration the cast pins it to
`false` and an icon-only button loses its square padding.

## `defineProps` cannot consume a derived type

`@vue/compiler-sfc` resolves types from source alone and cannot evaluate an inferred or
mapped type, so neither `VariantProps<typeof cva>` nor a mapped type over the data
reaches it as finite keys. Both fail the Vue build.

So component props are written out by hand — unions, booleans and all — and the shared
contract in `@75neo/themes` is a plain interface the compiler can see through. The props
interface is the source of truth now, not a guard against one: there is no recipe left
to drift from.

## Declare `class`, then merge it

A part file declares `class` as a prop and merges it last: `cn(partCva(…), props.class)`.
That declaration is the whole mechanism — an undeclared `class` falls through onto the
element after `cn` runs and never reaches the merge. The Ark part is the root node, so
fallthrough carries every other attribute for free.

The one exception is a part that wraps its Ark element, as the accordion trigger wraps
its heading: the file opts out with `inheritAttrs: false` and re-binds `$attrs` onto
the Ark part by hand.

## One rows file is exported from nothing

A `<script setup>` component is the only thing in Vue that can render itself, which is
what a submenu of arbitrary depth needs. The rows file inside the component's directory
exists for that, is exported from nothing, and is the one file in either adapter that is
not a part a caller can reach.

React has no such constraint, so its half is a local function. Keep the
asymmetry rather than adding a React file to match.
