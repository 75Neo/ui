---
title: Segment Group
description: A compact row of exclusive options with a sliding indicator.
category: Forms
registryItem: segment-group
---

## Installation

```sh
npx shadcn@latest add @75neo/segment-group
```

```sh
npx shadcn-vue@latest add @75neo/segment-group
```

## Usage

```tsx
<SegmentGroup defaultValue="Preview">
  <SegmentGroupIndicator />
  {["Preview", "Code", "Diff"].map((option) => (
    <SegmentGroupItem key={option} value={option}>
      <SegmentGroupItemText>{option}</SegmentGroupItemText>
      <SegmentGroupItemControl />
      <SegmentGroupItemHiddenInput />
    </SegmentGroupItem>
  ))}
</SegmentGroup>
```

```vue
<template>
  <SegmentGroup default-value="Preview">
    <SegmentGroupIndicator />
    <SegmentGroupItem v-for="option in options" :key="option" :value="option">
      <SegmentGroupItemText>{{ option }}</SegmentGroupItemText>
      <SegmentGroupItemControl />
      <SegmentGroupItemHiddenInput />
    </SegmentGroupItem>
  </SegmentGroup>
</template>
```

The indicator is positioned from the selected item's box, so it belongs inside the root next to the
items rather than in a wrapper of its own.

## Against tabs and radios

This is a radio group underneath, so it submits a value and announces itself as a set of choices.
Use it for a setting with two or three short options that all fit on screen.

If choosing swaps a panel of content rather than setting a value, that is
[tabs](/docs/components/tabs). If the options are sentences rather than words, that is a
[radio group](/docs/components/radio-group).

## Sizing

The group is as wide as its items. Give the root a class to stretch it, and the indicator follows,
because it measures the item rather than assuming a width.
