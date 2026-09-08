---
title: Drawer
description: A panel that slides in from an edge and can be swiped away.
category: Overlays
registryItem: drawer
---

## Usage

```tsx
<Drawer swipeDirection="end">
  <DrawerTrigger asChild>
    <Button variant="outline">Open the registry panel</Button>
  </DrawerTrigger>

  <Portal>
    <DrawerBackdrop />
    <DrawerPositioner>
      <DrawerContent>
        <DrawerTitle>Registry</DrawerTitle>
        <DrawerDescription>Every item the CLI can install.</DrawerDescription>
      </DrawerContent>
    </DrawerPositioner>
  </Portal>
</Drawer>
```

```vue
<template>
  <Drawer swipe-direction="end">
    <DrawerTrigger as-child>
      <Button variant="outline">Open the registry panel</Button>
    </DrawerTrigger>

    <Teleport to="body">
      <DrawerBackdrop />
      <DrawerPositioner>
        <DrawerContent>
          <DrawerTitle>Registry</DrawerTitle>
          <DrawerDescription>Every item the CLI can install.</DrawerDescription>
        </DrawerContent>
      </DrawerPositioner>
    </Teleport>
  </Drawer>
</template>
```

## Which edge

`swipeDirection` takes `start`, `end`, `up` or `down`. The first two are writing direction aware,
so `end` is the right edge in English and the left edge in Arabic. The machine writes the resolved
physical direction onto the parts, and the recipe reads that to place and size the panel, so one
prop moves the whole thing.

## Swiping and snap points

A drawer can be dragged shut with a pointer. `closeThreshold` decides how far counts as a dismissal
and `snapPoints` gives it resting positions on the way, which is how a bottom sheet with a half
open state is built.

The grabber is the handle that advertises this. It is optional, and worth including on a bottom
drawer where dragging is the expected gesture.

## Against the dialog

A drawer is a dialog anchored to an edge. Reach for it when the content is a list or a form long
enough to scroll, or when the gesture matters on touch. For a short confirmation, a
[dialog](/docs/components/dialog) in the middle of the screen is calmer.
