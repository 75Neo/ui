---
title: Marquee
description: A row of content that scrolls past and loops, pausing on hover.
category: Data display
registryItem: marquee
---

## Usage

```vue
<template>
  <Marquee :speed="30" pause-on-interaction>
    <MarqueeViewport>
      <MarqueeContent>
        <MarqueeItem v-for="item in items" :key="item">{{ item }}</MarqueeItem>
      </MarqueeContent>
    </MarqueeViewport>
    <MarqueeEdge side="left" />
    <MarqueeEdge side="right" />
  </Marquee>
</template>
```

## Filling the width

`autoFill` repeats the content until it covers the viewport, which is what stops a short list from
leaving a gap on a wide screen. Without it a list narrower than the container scrolls with dead
space behind it.

`speed` is pixels per second rather than a duration, so the pace stays the same whatever the
content is. `reverse` turns it around and `side` switches it to a vertical column.

## Pausing

`pauseOnInteraction` stops the scroll on hover and on keyboard focus, which is what makes the
content readable and any links inside it clickable. Leave it on unless the marquee is decorative.

Nothing here honours a reduced motion preference for you, because the component cannot know whether
the movement is decoration or content. Gate the whole thing on the media query when it is
decoration.

## The edges

`MarqueeEdge` is a gradient mask that fades the content into the background at one end. It reads
its colour from the recipe, so it follows a retheme without being told.
