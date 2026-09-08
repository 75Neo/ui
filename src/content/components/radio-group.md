---
title: Radio Group
description: A set of options where exactly one can be selected at a time.
category: Forms
registryItem: radio-group
---

## Usage

```tsx
<RadioGroup name="adapter" defaultValue="vue">
  <RadioGroupLabel>Which adapter should the CLI install?</RadioGroupLabel>
  <RadioGroupItem value="react">
    <RadioGroupItemControl />
    <RadioGroupItemText>React</RadioGroupItemText>
    <RadioGroupItemHiddenInput />
  </RadioGroupItem>
</RadioGroup>
```

```vue
<template>
  <RadioGroup name="adapter" default-value="vue">
    <RadioGroupLabel>Which adapter should the CLI install?</RadioGroupLabel>
    <RadioGroupItem value="react">
      <RadioGroupItemControl />
      <RadioGroupItemText>React</RadioGroupItemText>
      <RadioGroupItemHiddenInput />
    </RadioGroupItem>
  </RadioGroup>
</template>
```

## Against the checkbox

A radio group is one answer out of several and cannot be cleared by clicking the selected option.
If the user might want to pick nothing, add an explicit "none" option rather than hoping they can
untick.

## Keyboard

Arrow keys move between options and select as they go, which is the native radio behaviour. Only
the selected option is in the tab order, so tabbing past the group is one keystroke rather than
one per option.

## Sizes

`size` accepts `sm`, `md` and `lg`, and moves the circle and the label text together.
