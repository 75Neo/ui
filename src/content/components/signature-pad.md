---
title: Signature Pad
description: A drawing surface that records a signature as SVG paths.
category: Forms
registryItem: signature-pad
---

## Usage

```vue
<script setup lang="ts">
const value = ref("");

const store = async (details) => {
  value.value = await details.getDataUrl("image/png");
};
</script>

<template>
  <SignaturePad @draw-end="store">
    <SignaturePadLabel>Sign here</SignaturePadLabel>
    <SignaturePadControl>
      <SignaturePadSegment />
      <SignaturePadGuide />
    </SignaturePadControl>
    <SignaturePadClearTrigger>Clear</SignaturePadClearTrigger>
    <SignaturePadHiddenInput :value="value" />
  </SignaturePad>
</template>
```

The hidden input takes the value rather than reading it back out of the pad, so you decide what
shape the form submits. Fill it on `drawEnd`, which hands you the data URL.

## Paths, not pixels

The value is a list of SVG path strings, so it scales, stays small, and can be rendered back
anywhere without a canvas. `getDataUrl` on the context turns it into an image when you need one for
a PDF or an email.

## The stroke

The line weight, colour and smoothing come from the `drawing` prop on the root rather than from
CSS, because the machine draws the path itself. That is why the recipe leaves the path element
alone.

## Touch

The control sets `touch-action` so a finger draws rather than scrolling the page. Give it enough
height that a signature fits without running off the edge, and keep the guide line, because people
aim at it.

## What it is not

This captures a mark. It is not a legal signature on its own, and nothing here binds it to a
document or a person. That is the surrounding system's job.
