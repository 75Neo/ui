---
title: Popover
description: A panel anchored to a trigger, for content that needs focus.
category: Overlays
registryItem: popover
---

## Usage

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">What is a recipe?</Button>
  </PopoverTrigger>

  <PopoverPositioner>
    <PopoverContent>
      <PopoverArrow>
        <PopoverArrowTip />
      </PopoverArrow>
      <PopoverTitle>The recipe</PopoverTitle>
      <PopoverDescription>One tailwind-variants call.</PopoverDescription>
    </PopoverContent>
  </PopoverPositioner>
</Popover>
```

```vue
<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">What is a recipe?</Button>
    </PopoverTrigger>

    <PopoverPositioner>
      <PopoverContent>
        <PopoverArrow>
          <PopoverArrowTip />
        </PopoverArrow>
        <PopoverTitle>The recipe</PopoverTitle>
        <PopoverDescription>One tailwind-variants call.</PopoverDescription>
      </PopoverContent>
    </PopoverPositioner>
  </Popover>
</template>
```

## Against the tooltip

A popover can be clicked into. It takes focus, holds interactive content and closes on escape. A
[tooltip](/docs/components/tooltip) is a label that appears on hover and can never be reached with
a pointer. If the panel has a link or a button in it, it is a popover.

## Portalled or not

`portalled` defaults to on, which lifts the panel out of the DOM so no ancestor can clip it. Turn
it off when the popover has to stay inside a container that scrolls with it, and accept that an
`overflow: hidden` ancestor will then cut it.

## The arrow

`PopoverArrow` reads `--arrow-size` and `--arrow-background` from the recipe. Set them there rather
than per instance, so the arrow and the panel stay the same colour when you retheme.

## Anchoring elsewhere

`PopoverAnchor` detaches the position from the trigger. Put it around the element the panel should
point at when the button that opens it sits somewhere else, such as a toolbar acting on a selection.
