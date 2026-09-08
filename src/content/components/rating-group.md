---
title: Rating Group
description: A row of stars that reads and writes a number, with optional halves.
category: Forms
registryItem: rating-group
---

## Usage

```tsx
<RatingGroup defaultValue={4} count={5}>
  <RatingGroupLabel>How did the install go?</RatingGroupLabel>
  <RatingGroupControl>
    {[0, 1, 2, 3, 4].map((index) => (
      <RatingGroupItem key={index} index={index}>
        <Star fill="currentColor" />
      </RatingGroupItem>
    ))}
  </RatingGroupControl>
  <RatingGroupHiddenInput />
</RatingGroup>
```

```vue
<template>
  <RatingGroup :default-value="4" :count="5">
    <RatingGroupLabel>How did the install go?</RatingGroupLabel>
    <RatingGroupControl>
      <RatingGroupItem v-for="index in [0, 1, 2, 3, 4]" :key="index" :index="index">
        <Star fill="currentColor" />
      </RatingGroupItem>
    </RatingGroupControl>
    <RatingGroupHiddenInput />
  </RatingGroup>
</template>
```

## Halves

`allowHalf` lets a value land between two stars. The item reports `data-half` when it is the one
cut in two, so a half filled glyph is a styling decision rather than a second set of components.

## Read only ratings

`readOnly` turns the group into a display of a score that was already given. It stays in the
accessibility tree and still announces the value, unlike a row of icons with no semantics, which is
the usual way this gets built.

## Keyboard

Arrow keys move the rating and select as they go, home and end jump to the ends. Only the selected
star is in the tab order, so the group is one stop.
