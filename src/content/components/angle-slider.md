---
title: Angle Slider
description: A dial that picks a value in degrees around a circle.
category: Forms
registryItem: angle-slider
---

## Usage

```vue
<template>
  <AngleSlider :default-value="135" :step="15">
    <AngleSliderLabel>Gradient angle</AngleSliderLabel>
    <AngleSliderControl>
      <AngleSliderThumb />
    </AngleSliderControl>
    <AngleSliderValueText />
    <AngleSliderHiddenInput />
  </AngleSlider>
</template>
```

## What it is for

A value that is genuinely circular: a gradient direction, a rotation, a compass bearing. Anything
that has a minimum and a maximum rather than a wrap around belongs in a
[slider](/docs/components/slider), where the range is visible.

## Steps

`step` snaps the dial, which matters more here than on a straight slider because a pointer arc is
imprecise. Fifteen degrees is a good default for a direction; use forty five when only the corners
and edges make sense.

## Keyboard

Arrow keys move by one step, home and end jump to zero and back. The thumb is the focusable
element, so the label points at the root rather than at it.

## Markers

`AngleSliderMarkerGroup` places ticks around the circle at the values you give it. A few marks at
the cardinal angles read better than a full dial of them.
