# AGENTS.md

This guide is for AI agents and human contributors working in this repo.

## Setup

Install dependencies and build all packages. Requires Node >=24 and pnpm ^11.20.0. With mise, run mise install to get the correct versions. After install, run the build to compile styles, then React, Vue, and docs.

## Commands

| Command                         | What it does                               |
| ------------------------------- | ------------------------------------------ |
| pnpm build                      | Build all packages and apps                |
| pnpm typecheck                  | Typecheck all workspaces, depends on build |
| pnpm lint                       | Lint with oxlint at the repository root    |
| pnpm lint:fix                   | Lint with auto-fix                         |
| pnpm lint:packages              | Validate package exports with publint      |
| pnpm format                     | Format with oxfmt                          |
| pnpm format:check               | Check formatting without writing           |
| pnpm dev:docs                   | Astro docs site                            |
| pnpm --filter @75neo/react test | Run React tests with jsdom                 |
| pnpm --filter @75neo/vue test   | Run Vue tests with happy-dom               |
| pnpm --filter @75neo/styles dev | Watch styles build                         |
| pnpm --filter @75neo/core dev   | Watch the shared contract build            |
| pnpm --filter @75neo/<pkg> dev  | Watch a single package                     |

## Architecture

This is a monorepo with four packages and a docs app. The dependency direction is `styles` → `core` → `react`/`vue`.

- packages/styles is the single source of truth for design. It holds all Tailwind Variants themes, design tokens, and global CSS. It depends on nothing else in the repo. React and Vue never define styles directly, they only consume the theme.
- packages/core is the framework-agnostic contract shared by both frameworks. It holds the `SlotClass`/`ComponentUI`/`ThemeUI` types, `applySlotClass` and `getInitials`, and one contract module per component: the theme lookup key, the slot-name union, the `ui` type, the item data type, and any normalizers. It exists so the React and Vue APIs cannot drift apart.
- packages/react wraps the themes for React. It uses the useComponentUI hook and the ThemeProvider context. Every component is a single file that hides Ark UI behind a simple prop API.
- packages/vue mirrors React for Vue. It uses the useComponentUI composable and the Theme provide/inject context.
- apps/docs is the Astro documentation site.

Key idea to keep in mind: a theme defines slots. Each slot name becomes a data-slot attribute in the DOM and a key in the ui override object. Theming merges in this order: base classes from the theme, then Theme provider overrides, then the per-instance ui prop, using tailwind-merge for string overrides and function overrides for full control.

Before adding a component, look at one existing component as a reference. For a simple component without Ark UI, look at Button. For a component that wraps Ark UI, look at Accordion.

## Design Rules

These five rules are what keep the two framework packages consistent. Follow them for every component.

1. **Ark UI's anatomy stays hidden.** Each component ships one simple API. Never export `<Name>Root`, `<Name>Trigger` or any other Ark part, and never introduce a per-component React context or Vue provide/inject to wire parts together.
2. **Slot-name identity.** For a given component the tailwind-variants slot name, the `data-slot` attribute, the `ui` object key, and the content prop/slot name are all the same word. One vocabulary, four uses.
3. **A Vue slot name is a React prop name.** Vue expresses per-part content as named and scoped slots; React expresses the same content as a prop of the same name, typed `Slot<Bag>` and rendered through `renderSlot`. `<template #leading>` in Vue is `leading={…}` in React — always.
4. **`class` / `className` reaches only the root slot**, via `resolved.root({ class })` / `resolved.root({ className })`. Other slots are styled through `ui` or the theme.
5. **Theme keys are kebab-case and come from `@75neo/core`.** Import `accordionKey`, `angleSliderKey` and friends rather than typing the string, so a typo can't silently disable theming.

## Adding a New Component

Use a kebab-case name for the theme key and a PascalCase name for the component. The same theme key must be used in styles, core, React, and Vue, because it is the lookup key for theming.

### Checklist

- Theme file in packages/styles, re-exported from the styles entry point
- Contract module in `packages/core/src/contracts/<name>.ts`, re-exported from the core entry point
- Single React component file at `packages/react/src/components/<Name>.tsx` with a `ui` prop and `data-slot` attributes
- Single Vue component file at `packages/vue/src/components/<Name>.vue` with the same props and slot names
- Exports from both framework entry points
- Build, typecheck, lint, format, and package-lint checks passing

> **Component structure** — One file per component per package: `packages/react/src/components/Accordion.tsx` and `packages/vue/src/components/Accordion.vue`. No component folders, no `index.ts` per component, no per-component context file. Everything a component needs lives in that one file plus its shared contract in `@75neo/core`.

### Step 1 — Add the theme in packages/styles

Create a new file in the themes folder for your component. Define its slots, variants, compound variants, and default variants with tailwind-variants. Slots should be lowercase camelCase and semantic, one per visual part that needs styling or overriding, and named for the content they hold rather than the markup (`leading`, not `leadingIcon`) so the slot name can double as the prop and slot name in the frameworks. Use design tokens from the colors and radius system rather than hardcoded colors. If the component needs animations, add them to the shared animations CSS and reference them with data-state selectors. Export both the theme object and its variant props type, then re-export the theme from the styles entry point.

### Step 2 — Add the contract in packages/core

Create `packages/core/src/contracts/<name>.ts` and re-export it from `packages/core/src/index.ts`. It should export:

- `<name>Key` — the kebab-case theme lookup key, as a constant.
- `<Name>Slot` — the slot-name union, written out by hand and wrapped in `AssertSlots<…, keyof ReturnType<typeof <theme>>>`. Writing it out keeps it readable on hover; `AssertSlots` fails the typecheck if it ever drifts from the theme. Note that tailwind-variants adds a synthetic `base` key to every slotted theme, which the guard already accounts for.
- `<Name>UI` — `Partial<Record<<Name>Slot, SlotClass>>`.
- `<Name>ItemData<Node = string>` for collection components. `Node` is the framework's renderable-content type: React instantiates it with `ReactNode`, Vue with `string`. This asymmetry is deliberate — Vue passes rich per-item content through the scoped slot instead of through the data.
- Any normalizer or default that both frameworks would otherwise duplicate (`toValueArray`, `normalizeCarouselItems`, `ANGLE_SLIDER_DEFAULT_MARKERS`, `resolveAvatarFallback`). If you find yourself writing the same helper in both `Accordion.tsx` and `Accordion.vue`, it belongs here.

### Step 3 — Add the React component in packages/react

Create `packages/react/src/components/<Name>.tsx`. Props extend the native HTML attributes for the root element plus the variant props type from styles, an optional `ui` prop typed with `<Name>UI` from core, and one `Slot` prop per content slot. `Omit` any slot name that collides with a native HTML attribute (`content`, `label`, `icon`, `item`) from the Ark props before intersecting, or the two types will silently intersect into something unusable.

Build the slot functions with `useMemo`, pass them to `useComponentUI(<name>Key, tvSlots, ui)`, then render one Ark tree with a `data-slot` attribute on every part. Render content slots through `renderSlot(slot, bag, fallback)` — it mirrors `<slot name="x" v-bind="bag">fallback</slot>`, using the fallback only when nothing was supplied. Only the root forwards the caller's `className`, via `resolved.root({ className })`; merge per-item `ui` on top of the resolved base with `applySlotClass`.

### Step 4 — Add the Vue component in packages/vue

Create `packages/vue/src/components/<Name>.vue` as the mirror image. Define the same props with the same names, make the theme result and the `ui` prop reactive with `computed`, and pass both to `useComponentUI` with the same `<name>Key`. Declare every content slot through `defineSlots<…>()` with its scope bag typed, so `{ item, index }` is checked at the call site; keep `const slots = defineSlots<…>()` when you need to test whether a slot was supplied. In the template, render each part with its `data-slot` attribute and the resolved slot class, forwarding `class` only on the root via `resolved.root({ class: props.class as string })`.

Emit `update:modelValue` and the matching change events for v-model support — emits are Vue idiom and do not need a React counterpart, unlike slots and props.

### Step 5 — Verify

Build all packages, then run typecheck, lint, formatting check, and package lint. If you touched shared hooks or composables, also run the React and Vue test suites. Fix any issues with the lint and format fix commands before opening a pull request.

Common pitfalls to avoid: theme key mismatch between styles and the string passed to useComponentUI causes silent theming failures — import the key from core instead of typing it; a slot name that collides with a native HTML attribute produces a confusing intersection type in React unless you `Omit` it; missing data-slot attributes break styling and testing hooks; hardcoded colors instead of design tokens; and forgetting to re-export the theme, contract, or component from a package entry point.

## After Making Changes

Before pushing or opening a pull request, run build, typecheck, lint, format check, and package lint. If you changed hooks or composables, also run the React and Vue tests.

Use the fix commands for lint and format if needed.
