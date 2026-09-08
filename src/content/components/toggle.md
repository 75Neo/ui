---
title: Toggle
description: A button that stays pressed until it is pressed again.
category: Actions
registryItem: toggle
---

## Usage

```tsx
<Toggle aria-label="Watch this repository">
  <ToggleIndicator>
    <Star />
  </ToggleIndicator>
  Watch
</Toggle>
```

```vue
<template>
  <Toggle aria-label="Watch this repository">
    <ToggleIndicator>
      <Star />
    </ToggleIndicator>
    Watch
  </Toggle>
</template>
```

## Against the switch and the checkbox

A toggle is a button that remembers. It reports `aria-pressed` rather than `aria-checked`, which is
what a screen reader needs for a bold button in a toolbar or a "watch" button on a repository. A
setting in a form is a switch or a checkbox instead.

An icon only toggle needs an `aria-label`. The icon is not a name.

## Sizes

`size` accepts `sm`, `md` and `lg`, which set the height, the padding and the indicator together.
