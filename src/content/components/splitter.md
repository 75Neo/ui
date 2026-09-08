---
title: Splitter
description: Resizable panes with a draggable, keyboard reachable handle.
category: Layout
registryItem: splitter
---

## Installation

```sh
npx shadcn@latest add @75neo/splitter
```

```sh
npx shadcn-vue@latest add @75neo/splitter
```

## Usage

Panels are declared twice: once in the `panels` prop, which is what the machine sizes, and once in
the markup, which is what renders. The ids have to match.

```vue
<template>
  <Splitter :panels="[{ id: 'source' }, { id: 'preview' }]" :default-size="[40, 60]">
    <SplitterPanel id="source">The source</SplitterPanel>
    <SplitterResizeTrigger id="source:preview">
      <SplitterResizeTriggerIndicator />
    </SplitterResizeTrigger>
    <SplitterPanel id="preview">The preview</SplitterPanel>
  </Splitter>
</template>
```

The resize trigger's id names the pair it sits between, joined by a colon, so `source:preview`
resizes those two.

## Sizes

`defaultSize` is a list of percentages, one per panel, adding up to a hundred. Each entry in
`panels` can also carry `minSize`, `maxSize` and `collapsible`, which is how a sidebar that snaps
shut at a threshold is built.

## Keyboard

The handle is focusable and the arrow keys resize by `keyboardResizeBy` percent at a time. That is
the part hand rolled splitters always miss, and it is the reason to use this one.

## Nesting

A panel can hold another splitter with the opposite orientation. Give the inner one its own ids;
they are scoped to their own root.
