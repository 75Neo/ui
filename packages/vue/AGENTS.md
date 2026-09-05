# The Vue adapter

What differs from React. The root [`AGENTS.md`](../../AGENTS.md) carries the cascade and
the steps for adding a component, and [`packages/AGENTS.md`](../AGENTS.md) the recipe
conventions both adapters share.

## Vue casts an absent boolean to `false`

This is the trap to know. A type-based `defineProps` declares a Boolean prop, and Vue
gives an absent one the value `false` rather than leaving it undefined. Three shapes fall
into it, each one silent, and each one fine in React.

**A boolean `defineModel` needs `{ default: undefined }`.** `defineModel` declares a
Boolean prop, so a `v-model` over a boolean reaches Ark as an explicit `false` rather than
as nothing. That pins the component to a controlled `false` and kills the matching
`default*` prop: Checkbox rendered every `defaultChecked` box unticked. The type argument
has to include `undefined` too, or the option does not typecheck. Ark's own roots carry
the same `void 0` defaults for the same reason.

**A boolean prop defaulting to `true` needs `withDefaults`.** Leaving it out reaches the
component as `false`, so `props.flag ?? true` never fires: ColorPicker's `showInput`
rendered no hex field. Name the default in `withDefaults`. Booleans that default to off
need nothing, since off is what the cast produces.

**A prop whose default Ark derives from another one is named in `withDefaults` with the
value `undefined`.** Vue skips the cast whenever a default is declared at all, whatever it
is. Forwarding the prop as `undefined` is not enough on its own: a machine spreads its
caller's props over its own defaults, so an explicit `undefined` overwrites the default
with nothing and turns the behaviour off. NumberInput's `allowOverflow` reached Ark that
way and no button ever disabled at the end of its range. Resolve such a prop in the
adapter and pass a real value, in both frameworks, so neither depends on how a machine
treats an absent key.

## `defineProps` cannot consume a derived type

`@vue/compiler-sfc` resolves types from source alone and cannot evaluate a recipe's
inferred type, so neither `VariantProps<typeof recipe>` nor a mapped type over
`recipe.variants` reaches it as finite keys. Both fail the Vue build.

So component props are written out by hand, and a guard keeps them honest: the
`ButtonVariantsAreExposed` pattern turns "the recipe gained a variant, the props did not"
into a typecheck failure that names the variant. Copy it.

## One file recurses, and is exported from nothing

A `<script setup>` component is the only thing in Vue that can render itself, which is
what a submenu of arbitrary depth needs. `src/components/MenuRows.vue` exists for that,
is exported from nothing, and is the one file in either adapter that is not a component a
caller can reach.

React has no such constraint, so its half is a local function inside `Menu.tsx`. Keep the
asymmetry rather than adding a React file to match.
