---
title: Tooltip
description: A short label that appears on hover or keyboard focus.
category: Overlays
registryItem: tooltip
---

## Installation

```sh
npx shadcn@latest add @75neo/tooltip
```

```sh
npx shadcn-vue@latest add @75neo/tooltip
```

## Usage

```tsx
<Tooltip openDelay={200}>
  <TooltipTrigger asChild>
    <Button variant="outline">Reinstall</Button>
  </TooltipTrigger>
  <TooltipPositioner>
    <TooltipContent>
      <TooltipArrow>
        <TooltipArrowTip />
      </TooltipArrow>
      Overwrites the file on the next install
    </TooltipContent>
  </TooltipPositioner>
</Tooltip>
```

```vue
<template>
  <Tooltip :open-delay="200">
    <TooltipTrigger as-child>
      <Button variant="outline">Reinstall</Button>
    </TooltipTrigger>
    <TooltipPositioner>
      <TooltipContent>
        <TooltipArrow>
          <TooltipArrowTip />
        </TooltipArrow>
        Overwrites the file on the next install
      </TooltipContent>
    </TooltipPositioner>
  </Tooltip>
</template>
```

## What belongs in one

A sentence at most, and nothing the user has to reach. A tooltip disappears when the pointer
leaves, so a link inside one is unreachable for most people and invisible on touch. Anything
longer or interactive is a [popover](/docs/components/popover).

Never put the only copy of important information in a tooltip. Touch devices have no hover, and
the tooltip only opens there on long press if at all.

## Timing

`openDelay` is the pause before it appears and `closeDelay` the pause before it goes. A short open
delay stops tooltips flashing as the pointer crosses a toolbar. Ark shares the timer across
tooltips, so moving between neighbouring triggers opens the next one immediately.

## Interactive content

`interactive` keeps the tooltip open while the pointer is over it, which is only worth turning on
when the content includes selectable text. It does not make a tooltip a safe place for controls.
