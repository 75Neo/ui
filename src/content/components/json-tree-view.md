---
title: JSON Tree View
description: A collapsible view of a JSON value, coloured by type.
category: Data display
registryItem: json-tree-view
---

## Installation

```sh
npx shadcn@latest add @75neo/json-tree-view
```

```sh
npx shadcn-vue@latest add @75neo/json-tree-view
```

## Usage

```vue
<template>
  <JsonTreeView :data="item" :default-expanded-depth="2">
    <JsonTreeViewTree />
  </JsonTreeView>
</template>
```

There is nothing to walk. Hand it an object and it builds the tree, including the keys, the
brackets and the previews on collapsed branches.

## Colouring

Values are marked with the type they hold, and the recipe maps those onto the semantic tokens:
strings green, numbers blue, booleans amber, null and undefined dimmed. That means a retheme moves
the syntax colours with everything else rather than leaving a hardcoded palette behind.

## Depth

`defaultExpandedDepth` decides how much is open on arrival. Two is usually right: enough to see the
shape without a wall of text. Everything below it is one click away.

## Against a code block

Use this when the value is data the person will explore, such as an API response or a config file
being debugged. A short literal that is only being read is clearer as a
[code block](/docs/components/table), because it keeps its formatting and can be copied whole.
