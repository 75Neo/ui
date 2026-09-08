---
title: Carousel
description: A scroll snapped strip of slides with paging controls and indicators.
category: Data display
registryItem: carousel
---

## Usage

```vue
<template>
  <Carousel :slide-count="slides.length" spacing="12px" loop>
    <CarouselItemGroup>
      <CarouselItem v-for="(slide, index) in slides" :key="slide" :index="index">
        {{ slide }}
      </CarouselItem>
    </CarouselItemGroup>

    <CarouselControl>
      <CarouselPrevTrigger aria-label="Previous slide">
        <ChevronLeft />
      </CarouselPrevTrigger>
      <CarouselIndicatorGroup>
        <CarouselIndicator v-for="(slide, index) in slides" :key="slide" :index="index" />
      </CarouselIndicatorGroup>
      <CarouselNextTrigger aria-label="Next slide">
        <ChevronRight />
      </CarouselNextTrigger>
    </CarouselControl>
  </Carousel>
</template>
```

`slideCount` has to match the number of items. It is what the paging and the indicators are derived
from, and Ark cannot count children it does not own.

## Paging

`slidesPerPage` is how many are visible at once and `slidesPerMove` how many a click advances. Set
the second to `auto` to move by a whole page. `spacing` and `padding` are CSS lengths that go into
the scroll container, so the gap survives the snapping.

## Scrolling, not transforms

This is native scroll snap underneath. Dragging, the wheel, and the trackpad all work without any
code from us, and the machine reads the scroll position back to update the page. That is why
`allowMouseDrag` is opt in: a pointer drag is not native, everything else is.

## Autoplay

`autoplay` takes a delay and pauses on hover and on focus within. Pair it with
`CarouselAutoplayTrigger` so it can be stopped, because an animation the person cannot stop is a
failure of the reduced motion preference rather than a feature.

## Accessibility

Each trigger needs a label. The indicators are buttons, so give them one that names the slide
rather than its number.
