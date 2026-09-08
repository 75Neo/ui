---
title: Scroll Area
description: A scrolling box with a thin overlay scrollbar that fades in.
category: Layout
registryItem: scroll-area
---

## Usage

```vue
<template>
  <ScrollArea class="h-44">
    <ScrollAreaViewport>
      <ScrollAreaContent>
        <p v-for="item in items" :key="item">{{ item }}</p>
      </ScrollAreaContent>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar orientation="vertical">
      <ScrollAreaThumb />
    </ScrollAreaScrollbar>
  </ScrollArea>
</template>
```

The root needs a height, from a class or from its parent. Everything inside it is sized from that.

## Why not overflow auto

Native scrollbars differ by platform and take layout width on some of them, which shifts content as
it grows. This keeps the native scrolling, including momentum and wheel behaviour, and draws its own
bar on top, so the content width never changes.

The trade is that the bar is hidden until you interact. Do not use this for a region whose
scrollability is not otherwise obvious.

## State on the root

The root reports `data-overflow-x`, `data-overflow-y`, and which edge the content is resting
against through `data-at-top` and its siblings. Those are what a fading mask at the edges hangs
off, if you want one.

## Both directions

Add a second scrollbar with `orientation="horizontal"` and a `ScrollAreaCorner` between them. The
corner keeps the two bars from overlapping where they meet.
