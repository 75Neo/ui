---
title: Timer
description: A countdown or stopwatch split into labelled units.
category: Data display
registryItem: timer
---

## Installation

```sh
npx shadcn@latest add @75neo/timer
```

```sh
npx shadcn-vue@latest add @75neo/timer
```

## Usage

The formatted parts come from the context, so the markup decides which units to show and how to
label them.

```vue
<template>
  <Timer :target-ms="90 * 60 * 1000" countdown auto-start>
    <TimerArea>
      <TimerContext v-slot="timer">
        <TimerItem type="minutes">{{ timer.formattedTime.minutes }}</TimerItem>
        <TimerSeparator>:</TimerSeparator>
        <TimerItem type="seconds">{{ timer.formattedTime.seconds }}</TimerItem>
      </TimerContext>
    </TimerArea>

    <TimerControl>
      <TimerActionTrigger action="start">Start</TimerActionTrigger>
      <TimerActionTrigger action="pause">Pause</TimerActionTrigger>
      <TimerActionTrigger action="reset">Reset</TimerActionTrigger>
    </TimerControl>
  </Timer>
</template>
```

## Counting down or up

`countdown` with a `targetMs` runs towards zero and fires `complete` when it lands. Without it the
timer counts up from `startMs`, which is the stopwatch case.

`interval` is how often it ticks. Leave it at a second unless you are showing hundredths, because a
faster tick is work the browser does for nothing.

## Digits that do not jump

The units are monospaced and tabular in the recipe. Proportional digits change width as they
change value, which makes a running clock wobble.

## Deadlines

A countdown to a real deadline should be computed from a timestamp, not from a duration set on
mount. A tab that sleeps loses time, and the difference shows the moment someone comes back to it.
