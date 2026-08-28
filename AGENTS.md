# AGENTS.md

This guide is for AI agents and human contributors working in this repo.

## Setup

```sh
pnpm install
pnpm build        # turbo run build — builds styles → react/vue → apps
```

Requires Node `>=24` and pnpm `^11.20.0`. With mise: `mise install`.

## Commands

| Command                           | What it does                                                       |
| --------------------------------- | ------------------------------------------------------------------ |
| `pnpm build`                      | Build all packages and apps (`turbo run build`)                    |
| `pnpm typecheck`                  | Typecheck all workspaces (`turbo run typecheck`, depends on build) |
| `pnpm lint`                       | Lint with oxlint (root)                                            |
| `pnpm lint:fix`                   | Lint with auto-fix                                                 |
| `pnpm lint:packages`              | Validate package exports with publint (`turbo run lint:package`)   |
| `pnpm format`                     | Format with oxfmt                                                  |
| `pnpm format:check`               | Check formatting without writing                                   |
| `pnpm dev:react`                  | Storybook for React on http://localhost:6006                       |
| `pnpm dev:vue`                    | Storybook for Vue on http://localhost:6007                         |
| `pnpm dev:docs`                   | Astro docs site                                                    |
| `pnpm --filter @75neo/react test` | Run React tests (jsdom)                                            |
| `pnpm --filter @75neo/vue test`   | Run Vue tests (happy-dom)                                          |
| `pnpm --filter @75neo/styles dev` | Watch styles build                                                 |
| `pnpm --filter @75neo/<pkg> dev`  | Watch a single package                                             |

## After Making Changes

Run these before pushing or opening a PR:

```sh
pnpm build
pnpm typecheck
pnpm lint
pnpm format:check
pnpm lint:packages
# if you touched composables/hooks:
pnpm --filter @75neo/react test
pnpm --filter @75neo/vue test
```

Fix issues with:

```sh
pnpm lint:fix
pnpm format
```
