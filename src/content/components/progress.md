---
title: Progress
description: A determinate progress bar with an optional label and value readout.
category: Data display
registryItem: progress
---

## Installation

```sh
npx shadcn@latest add @75neo/progress
```

```sh
npx shadcn-vue@latest add @75neo/progress
```

## Usage

```tsx
<Progress value={62}>
  <ProgressLabel>Writing components</ProgressLabel>
  <ProgressValueText />
  <ProgressTrack>
    <ProgressRange />
  </ProgressTrack>
</Progress>
```

```vue
<template>
  <Progress :value="62">
    <ProgressLabel>Writing components</ProgressLabel>
    <ProgressValueText />
    <ProgressTrack>
      <ProgressRange />
    </ProgressTrack>
  </Progress>
</template>
```

## Determinate only

Pass a number and the bar fills to it, scaled between `min` and `max`. Pass `null` and Ark reports
the indeterminate state on the track, but the recipe draws nothing for it, because an animated
barber pole is motion for its own sake. Show a skeleton or a plain "working" line instead when you
do not know how far along you are.

## The value readout

`ProgressValueText` prints the value through `Intl.NumberFormat`, so
`formatOptions={{ style: "percent" }}` and a `locale` give you a localised percentage without any
string building of your own.

## Sizes

`size` accepts `sm`, `md` and `lg`, which set the track to one, two and three pixels of height
respectively.
