# @75neo/ui

The installer and animation stylesheet for [75NeoUI](https://75neo-ui.pages.dev), a component
library for React and Vue.

## Install

```sh
npx @75neo/ui@latest init
npx @75neo/ui@latest add button
```

`init` detects whether the project is React or Vue, writes a `75neoui.json`, and adds the theme
tokens and this package's animation stylesheet to your Tailwind entry file. `add` writes component
source into your project and installs the npm packages it declares.

## Commands

| Command         | What it does                                          |
| --------------- | ----------------------------------------------------- |
| `init`          | Set the project up and write `75neoui.json`           |
| `add <items..>` | Add components, resolving their registry dependencies |
| `add --all`     | Add every component                                   |
| `list`          | List the components in the registry                   |

Every command takes `--cwd` and `--registry`. `init` also takes `--framework`, `--css` and
`--overwrite`; `add` takes `--all` and `--overwrite`. Pass `--no-install` to skip npm installs.

## Programmatic API

The package is written in TypeScript and ships type declarations. Every command is also available
as a function, so a script can drive the installer directly.

```ts
import { readConfig, resolveItems, writeFiles } from "@75neo/ui";

const config = await readConfig(process.cwd());
const items = await resolveItems(config.registry, config.framework, ["button"]);
const { written, skipped } = await writeFiles(items, config, {
  cwd: process.cwd(),
  overwrite: false,
});
```

Registry responses and `75neoui.json` are validated at the boundary rather than cast, so a
malformed document fails with a message naming the field instead of surfacing later as a crash.

## Stylesheet

```css
@import "tailwindcss";
@import "@75neo/ui/animations.css";
```

The stylesheet carries the keyframes and `--animate-*` entries that overlay components use. Design
tokens are not here on purpose: `init` writes those into your own stylesheet so you can override
them.
