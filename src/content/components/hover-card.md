---
title: Hover Card
description: A rich preview that opens on hover after a short delay.
category: Overlays
registryItem: hover-card
---

## Installation

```sh
npx shadcn@latest add @75neo/hover-card
```

```sh
npx shadcn-vue@latest add @75neo/hover-card
```

## Usage

```tsx
<HoverCard openDelay={300}>
  <HoverCardTrigger>Ark UI</HoverCardTrigger>
  <HoverCardPositioner>
    <HoverCardContent>
      <HoverCardArrow>
        <HoverCardArrowTip />
      </HoverCardArrow>
      The state machines behind every component here that has behaviour.
    </HoverCardContent>
  </HoverCardPositioner>
</HoverCard>
```

```vue
<template>
  <HoverCard :open-delay="300">
    <HoverCardTrigger>Ark UI</HoverCardTrigger>
    <HoverCardPositioner>
      <HoverCardContent>
        <HoverCardArrow>
          <HoverCardArrowTip />
        </HoverCardArrow>
        The state machines behind every component here that has behaviour.
      </HoverCardContent>
    </HoverCardPositioner>
  </HoverCard>
</template>
```

## What it is for

A preview of something the user could go and see anyway: the person behind a name, the page behind
a link. It opens on hover and on keyboard focus, and it stays open while the pointer travels into
it, so the content inside can be read and selected.

Because it is hover driven it never appears on touch. Everything in it has to be available another
way, which is why the trigger should be a link to the thing being previewed.

## Against the tooltip

A [tooltip](/docs/components/tooltip) names a control in a few words. A hover card shows a slice of
content. If it has a heading, an image or more than one line, it is a hover card.

## Timing

`openDelay` defaults to a pause long enough that passing over a link does not open anything, and
`closeDelay` gives the pointer time to travel from the trigger into the card.
