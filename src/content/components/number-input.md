---
title: Number Input
description: A numeric field with steppers, clamping and locale aware formatting.
category: Forms
registryItem: number-input
---

## Installation

```sh
npx shadcn@latest add @75neo/number-input
```

```sh
npx shadcn-vue@latest add @75neo/number-input
```

## Usage

```tsx
<NumberInput defaultValue="3" min={0} max={12}>
  <NumberInputLabel>Seats</NumberInputLabel>
  <NumberInputControl>
    <NumberInputDecrementTrigger>
      <Minus />
    </NumberInputDecrementTrigger>
    <NumberInputInput />
    <NumberInputIncrementTrigger>
      <Plus />
    </NumberInputIncrementTrigger>
  </NumberInputControl>
</NumberInput>
```

```vue
<template>
  <NumberInput default-value="3" :min="0" :max="12">
    <NumberInputLabel>Seats</NumberInputLabel>
    <NumberInputControl>
      <NumberInputDecrementTrigger>
        <Minus />
      </NumberInputDecrementTrigger>
      <NumberInputInput />
      <NumberInputIncrementTrigger>
        <Plus />
      </NumberInputIncrementTrigger>
    </NumberInputControl>
  </NumberInput>
</template>
```

## The value is a string

`value` and `defaultValue` are strings, not numbers, because the field has to hold what the person
typed while they are typing it. A half entered `1.` is not a number yet. Parse at the edge, when
you submit, rather than fighting the input.

## Formatting

`formatOptions` and `locale` go through `Intl.NumberFormat`, so a currency or a percentage is
configuration rather than string work. The input reformats on blur and shows the raw value while
focused, which is what makes it editable.

## Steps and clamping

`step` is the arrow key increment and `largeStep` the page key one. `clampValueOnBlur` pulls an out
of range entry back inside `min` and `max` when the field loses focus, and `allowOverflow` lets it
stay out of range so you can show your own error instead.

`allowMouseWheel` is off by default. Leave it off: a wheel over a form should scroll the page.
