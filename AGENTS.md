# AGENTS.md

This guide is for AI agents and human contributors working in this repo.

## Setup

Install dependencies and build all packages. Requires Node >=24 and pnpm ^11.20.0. With mise, run mise install to get the correct versions. After install, run the build to compile styles, then React, Vue, and apps.

## Commands

| Command                         | What it does                                 |
| ------------------------------- | -------------------------------------------- |
| pnpm build                      | Build all packages and apps                  |
| pnpm typecheck                  | Typecheck all workspaces, depends on build   |
| pnpm lint                       | Lint with oxlint at the repository root      |
| pnpm lint:fix                   | Lint with auto-fix                           |
| pnpm lint:packages              | Validate package exports with publint        |
| pnpm format                     | Format with oxfmt                            |
| pnpm format:check               | Check formatting without writing             |
| pnpm dev:react                  | Storybook for React on http://localhost:6006 |
| pnpm dev:vue                    | Storybook for Vue on http://localhost:6007   |
| pnpm dev:docs                   | Astro docs site                              |
| pnpm --filter @75neo/react test | Run React tests with jsdom                   |
| pnpm --filter @75neo/vue test   | Run Vue tests with happy-dom                 |
| pnpm --filter @75neo/styles dev | Watch styles build                           |
| pnpm --filter @75neo/<pkg> dev  | Watch a single package                       |

## Architecture

This is a monorepo with three main packages and two playground apps.

- packages/styles is the single source of truth for design. It holds all Tailwind Variants themes, design tokens, and global CSS. React and Vue never define styles directly, they only consume the theme.
- packages/react wraps the themes for React. It uses the useComponentUI hook and the ThemeProvider context. Simple components render native elements, complex accessible components wrap Ark UI React primitives.
- packages/vue mirrors React for Vue. It uses the useComponentUI composable and the Theme provide/inject context.
- apps/playground-react and apps/playground-vue are Storybook apps for manual testing of every component.

Key idea to keep in mind: a theme defines slots. Each slot name becomes a data-slot attribute in the DOM and a key in the ui override object. Theming merges in this order: base classes from the theme, then Theme provider overrides, then the per-instance ui prop, using tailwind-merge for string overrides and function overrides for full control.

Before adding a component, look at one existing component as a reference. For a simple component without Ark UI, look at Button. For a complex component that wraps Ark UI, look at Accordion.

## Adding a New Component

Use a kebab-case name for the theme key and a PascalCase name for the component. The same theme key must be used in styles, React, and Vue, because it is the lookup key for theming.

### Checklist

- Theme file in packages/styles
- Re-export of the theme from the styles entry point
- React component in packages/react with ui prop and data-slot attributes
- Export of the React component and its types from the React entry point
- Vue component in packages/vue with the composable and data-slot attributes
- Export of the Vue component from the Vue entry point
- Stories in both playgrounds, React and Vue
- Build, typecheck, lint, and format checks passing

### Step 1 — Add the theme in packages/styles

Create a new file in the themes folder for your component. Define its slots, variants, compound variants, and default variants with tailwind-variants. Slots should be lowercase and semantic, one per visual part that needs styling or overriding. Use design tokens from the colors and radius system rather than hardcoded colors. If the component needs animations, add them to the shared animations CSS and reference them with data-state selectors. Export both the theme object and its variant props type. Then re-export the new theme from the styles entry point so it is available to the other packages.

### Step 2 — Add the React component in packages/react

Create a component file in the React package. Props should extend the native HTML attributes for the root element plus the variant props type from styles. Add an optional ui prop that allows overriding each slot, and expose any component-specific props such as icons, loading, or items. Inside the component, create the slot functions from the theme with the current variant values and pass them together with the ui prop to useComponentUI using the kebab-case theme key. Render each slot with a matching data-slot attribute and the class string returned by the resolved slot. Only the root slot should forward the caller's className. Export the component and its prop types, and add an export to the React entry point.

If the component wraps Ark UI, import the Ark UI primitive, forward refs, and normalize value handling to match Ark's expected shape. For collection components that accept items with per-item overrides, merge per-item ui on top of the resolved base classes.

### Step 3 — Add the Vue component in packages/vue

Create a single-file component in the Vue package. Define props with variant types from styles, an optional ui prop keyed by slot, and any additional props. Make the theme result and the ui prop reactive with computed, then pass both to useComponentUI with the same kebab-case theme key used in React. In the template, render each part with its data-slot attribute and bind its class to the resolved slot. Define typed slots for content projection. Export the component from the Vue entry point.

For Ark UI components, mirror the React behavior: normalize values for Ark, and emit update and change events for v-model support. Handle per-item ui the same way as in React.

### Step 4 — Add playground stories

Add a story file for the component in each playground app. Cover the default appearance and each variant, size, color, and state such as disabled or loading. Include a combined matrix story if the component has many variant combinations, and a themed story wrapped in Theme to show ui overrides. Keep stories minimal and focused on visual verification.

### Step 5 — Verify

Build all packages, then run typecheck, lint, formatting check, and package lint. If you touched shared hooks or composables, also run the React and Vue test suites. Fix any issues with the lint and format fix commands before opening a pull request.

Common pitfalls to avoid: theme key mismatch between styles and the string passed to useComponentUI causes silent theming failures, missing data-slot attributes breaks styling and testing hooks, using hardcoded colors instead of design tokens, and forgetting to re-export the theme or component from the package entry points.

## After Making Changes

Before pushing or opening a pull request, run build, typecheck, lint, format check, and package lint. If you changed hooks or composables, also run the React and Vue tests.

Use the fix commands for lint and format if needed.
