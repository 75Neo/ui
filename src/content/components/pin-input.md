---
title: Pin Input
description: A row of single character boxes for a one time code.
category: Forms
registryItem: pin-input
---

## Usage

```tsx
<PinInput otp placeholder="0">
  <PinInputLabel>Verification code</PinInputLabel>
  <PinInputControl>
    {[0, 1, 2, 3].map((index) => (
      <PinInputInput key={index} index={index} />
    ))}
  </PinInputControl>
  <PinInputHiddenInput />
</PinInput>
```

```vue
<template>
  <PinInput otp placeholder="0">
    <PinInputLabel>Verification code</PinInputLabel>
    <PinInputControl>
      <PinInputInput v-for="index in [0, 1, 2, 3]" :key="index" :index="index" />
    </PinInputControl>
    <PinInputHiddenInput />
  </PinInput>
</template>
```

Every box needs its own `index`. The machine moves focus between them, handles backspace across the
boundary, and spreads a pasted code across all of them at once.

## One time codes

`otp` sets the autocomplete hint that lets a phone offer the code from the incoming message. If the
code is numeric, set `type="numeric"` too so the numeric keypad opens.

## Masking

`mask` replaces the characters with dots. Worth it for a standing PIN, not for a code that arrives
by text and expires in a minute, where seeing what you typed is the point.

## The hidden input

`PinInputHiddenInput` carries the joined value into a form submission. Leave it in unless you are
reading the value yourself.
