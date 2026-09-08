---
title: Slider
description: One or more thumbs picking a value along a track.
category: Forms
registryItem: slider
---

## Usage

```tsx
<Slider defaultValue={[40]}>
  <SliderLabel>Corner radius</SliderLabel>
  <SliderValueText />
  <SliderControl>
    <SliderTrack>
      <SliderRange />
    </SliderTrack>
    <SliderThumb index={0}>
      <SliderHiddenInput />
    </SliderThumb>
  </SliderControl>
</Slider>
```

```vue
<template>
  <Slider :default-value="[40]">
    <SliderLabel>Corner radius</SliderLabel>
    <SliderValueText />
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb :index="0">
        <SliderHiddenInput />
      </SliderThumb>
    </SliderControl>
  </Slider>
</template>
```

## The value is always a list

One thumb or five, `value` is an array. Render a thumb per entry with its own `index`, and put a
hidden input inside each one so a form submission carries every value.

`minStepsBetweenThumbs` stops two thumbs from crossing, which is what you want for a range.

## Steps

`step` is the granularity and the arrow key increment. `largeStep` is the page key one. Set `step`
to the smallest change that means anything: a slider that reports 43.7182 percent is a slider with
no step.

## Orientation and origin

`orientation="vertical"` turns the control into a column and the recipe follows from the data
attribute. `origin="center"` fills the range outward from the middle rather than from the start,
which is right for a balance or a brightness offset that can go negative.

## Markers

`SliderMarkerGroup` and `SliderMarker` label positions along the track. Use a few round numbers.
A marker under every step is a ruler, not a label.
