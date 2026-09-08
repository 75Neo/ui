---
title: Tabs
description: A row of triggers that each swap in one panel, with a sliding indicator.
category: Navigation
registryItem: tabs
---

## Usage

```tsx
<Tabs defaultValue="react">
  <TabsList>
    <TabsTrigger value="react">React</TabsTrigger>
    <TabsTrigger value="vue">Vue</TabsTrigger>
    <TabsIndicator />
  </TabsList>
  <TabsContent value="react">The adapter is a function component.</TabsContent>
  <TabsContent value="vue">The adapter is a single file component.</TabsContent>
</Tabs>
```

```vue
<template>
  <Tabs default-value="react">
    <TabsList>
      <TabsTrigger value="react">React</TabsTrigger>
      <TabsTrigger value="vue">Vue</TabsTrigger>
      <TabsIndicator />
    </TabsList>
    <TabsContent value="react">The adapter is a function component.</TabsContent>
    <TabsContent value="vue">The adapter is a single file component.</TabsContent>
  </Tabs>
</template>
```

`TabsIndicator` belongs inside `TabsList`, because its position is measured against the list. Leave
it out and the tabs still work, they just lose the moving underline.

## Activation

`activationMode` is `automatic` by default, so arrowing along the row changes the panel as you go.
Set it to `manual` when a panel is expensive to render, and the arrow keys then move focus while
the space bar commits.

## Orientation

`orientation="vertical"` turns the list into a column beside the panels and moves the indicator to
the trailing edge. The recipe handles the layout change from the data attribute, so nothing else
in your markup has to change.

## Panels

Every panel needs a `value` that matches a trigger. Panels stay mounted by default; add
`lazyMount` to a panel that should not render until it is first shown.
