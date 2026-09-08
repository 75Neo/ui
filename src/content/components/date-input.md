---
title: Date Input
description: A typed date field split into segments that step with the arrow keys.
category: Forms
registryItem: date-input
---

## Usage

```vue
<template>
  <DateInput>
    <DateInputLabel>Release date</DateInputLabel>
    <DateInputControl>
      <DateInputSegmentGroup>
        <DateInputContext v-slot="dateInput">
          <DateInputSegment
            v-for="(segment, index) in dateInput.getSegments()"
            :key="index"
            :segment="segment"
          >
            {{ segment.text }}
          </DateInputSegment>
        </DateInputContext>
      </DateInputSegmentGroup>
    </DateInputControl>
    <DateInputHiddenInput />
  </DateInput>
</template>
```

## Segments come from the locale

The order of day, month and year, and the separators between them, are produced from the `locale`.
That is the reason to use this rather than three inputs: an American and a German user get their
own order without a branch in your code.

## Typing

Each segment accepts digits and steps with the arrow keys, and typing rolls into the next segment
when it fills. There is no parsing of free text, so there is no ambiguity about what `03/04` means.

## Against the date picker

A date input is faster for a date the person already knows, such as a birthday. A
[date picker](/docs/components/date-picker) is better for one they are choosing by looking, such as
a booking. Combining them is common: the picker's own control uses this field.

## Granularity

`granularity` adds hour, minute and second segments. `hourCycle` chooses between the twelve and
twenty four hour clock, and `hideTimeZone` drops the zone segment when it is implied.
